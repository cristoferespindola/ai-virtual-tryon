import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Initialize the Google Gen AI client with your API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY environment variable.');
  // Optionally throw an error or handle appropriately
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Define the model ID for Gemini 2.0 Flash experimental
const MODEL_ID = 'gemini-2.0-flash-exp-image-generation';

export async function POST(req: NextRequest) {
  let formData;
  try {
    // Parse FormData request instead of JSON
    formData = await req.formData();
  } catch (formError) {
    console.error('Error parsing FormData request body:', formError);
    return NextResponse.json(
      {
        error: 'Invalid request body: Failed to parse FormData.',
        details:
          formError instanceof Error ? formError.message : String(formError),
      },
      { status: 400 }, // Bad Request
    );
  }

  try {
    // Extract image files from FormData
    const userImageFile = formData.get('userImage') as File | null;
    const clothingImageFile = formData.get('clothingImage') as File | null;

    if (!userImageFile || !clothingImageFile) {
      return NextResponse.json(
        { error: 'Both userImage and clothingImage files are required' },
        { status: 400 },
      );
    }

    // Construct prompt for virtual try-on with preservation instructions
    const detailedPrompt = `Perform a virtual try-on.
    FIRST IMAGE: This is the base image of the person.
    SECOND IMAGE: This is the clothing item to be tried on.

    Instructions for the AI:
    1. IMPERATIVELY use the FIRST image as the foundational canvas.
    2. The person's face, hair, exact body shape, skin tone, and unique features from the FIRST image MUST REMAIN UNCHANGED.
    3. The pose of the person in the FIRST image MUST NOT be altered in any way.
    4. The background of the FIRST image MUST BE PRESERVED EXACTLY as it is.
    5. The lighting conditions and shadows from the FIRST image MUST BE MAINTAINED precisely.
    6. Take the clothing item from the SECOND image and seamlessly integrate it onto the person in the FIRST image.
    7. The new clothing item should replace any existing clothing on the person, or be added if the person is bare, while ensuring the person's body proportions are not distorted.
    8. The ONLY modification to the FIRST image should be the addition/replacement of the clothing item. NO other aspect of the person or environment should be generated or changed.
    9. The final image should look like a photograph of the person from the FIRST image, now wearing the clothing from the SECOND image, as if it was a real photo session.
    `;

    // Convert files to Base64 for API
    const userImageBuffer = await userImageFile.arrayBuffer();
    const userImageBase64 = arrayBufferToBase64(userImageBuffer);
    const userImageMimeType = userImageFile.type || 'image/jpeg';

    const clothingImageBuffer = await clothingImageFile.arrayBuffer();
    const clothingImageBase64 = arrayBufferToBase64(clothingImageBuffer);
    const clothingImageMimeType = clothingImageFile.type || 'image/png';

    console.log(
      `User Image: ${userImageMimeType}, size: ${userImageBase64.length}`,
    );
    console.log(
      `Clothing Image: ${clothingImageMimeType}, size: ${clothingImageBase64.length}`,
    );

    let response;

    try {
      // Prepare content for Gemini API
      const contents = [
        {
          role: 'user',
          parts: [
            { text: detailedPrompt },
            {
              inlineData: {
                mimeType: userImageMimeType,
                data: userImageBase64,
              },
            },
            {
              inlineData: {
                mimeType: clothingImageMimeType,
                data: clothingImageBase64,
              },
            },
          ],
        },
      ];

      // Generate content with conservative settings for better preservation
      response = await ai.models.generateContent({
        model: MODEL_ID,
        contents,
        config: {
          temperature: 0.3,
          topP: 0.9,
          topK: 20,
          responseModalities: ['Text', 'Image'],
        },
      });

      console.log(
        'Full Gemini API Response:',
        JSON.stringify(response, null, 2),
      );
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      if (error instanceof Error) {
        throw new Error(`Failed during API call: ${error.message}`);
      }
      throw new Error('An unknown error occurred during the API call');
    }

    let textResponse = null;
    let imageData = null;
    let imageMimeType = 'image/png';

    // Extract image and text from API response
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0]?.content?.parts;
      if (parts) {
        console.log('Number of parts in response:', parts.length);

        for (const part of parts) {
          if ('inlineData' in part && part.inlineData) {
            imageData = part.inlineData.data;
            imageMimeType = part.inlineData.mimeType || 'image/png';
            if (imageData) {
              console.log(
                'Image data received, length:',
                imageData.length,
                'MIME type:',
                imageMimeType,
              );
            }
          } else if ('text' in part && part.text) {
            textResponse = part.text;
            console.log(
              'Text response received:',
              textResponse.substring(0, 100) +
                (textResponse.length > 100 ? '...' : ''),
            );
          }
        }
      } else {
        console.log('No parts found in the response candidate.');
      }
    } else {
      console.log('No candidates found in the API response.');
      const safetyFeedback = response?.promptFeedback?.blockReason;
      if (safetyFeedback) {
        console.error('Content generation blocked:', safetyFeedback);
        throw new Error(
          `Content generation failed due to safety settings: ${safetyFeedback}`,
        );
      }
      const responseText = JSON.stringify(response, null, 2);
      console.error('Unexpected API response structure:', responseText);
      throw new Error('Received an unexpected or empty response from the API.');
    }

    // Return the generated image and description
    return NextResponse.json({
      image: imageData ? `data:${imageMimeType};base64,${imageData}` : null,
      description: textResponse || 'AI description not available.',
    });
  } catch (error) {
    console.error('Error processing virtual try-on request:', error);
    return NextResponse.json(
      {
        error: 'Failed to process virtual try-on request',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
