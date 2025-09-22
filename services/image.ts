import { TryOnResponse, TryOnError } from '../libs/types';

export async function getImage(formData: FormData): Promise<string> {
  try {
    const response = await fetch('/api/tryon', {
      method: 'POST',
      body: formData,
    });

    const result: TryOnResponse = await response.json();

    console.log('Frontend received result:', result);

    if (!response.ok) {
      const error: TryOnError = {
        message: result.error || `API Error: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    if (result.image) {
      return result.image;
    } else {
      console.log('API response description:', result.description);
      console.log('API response:', result);
      throw new Error('API did not return a generated image URL.');
    }
  } catch (error) {
    console.error('Error fetching image:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('An unexpected error occurred while processing the image.');
  }
}
