# AI Virtual Try-On Application

This is a modern web application built with Next.js that allows users to
virtually try on clothing items using AI. Users upload a photo of themselves and
a photo of a clothing item, and the application leverages the Google Gemini API
to generate an image simulating the user wearing the clothing.

## ✨ Recent Updates

- 🎨 **Custom Color System**: Implemented a custom Tailwind CSS plugin that
  generates color scales (1-10) following Tailwind's logic
- 🔧 **React Hook Form Integration**: Added form validation with Zod schemas
- 🎯 **Modular Architecture**: Refactored into reusable components and custom
  hooks
- 📱 **Responsive Design**: Improved mobile and desktop experience
- 🚀 **Performance Optimizations**: Better error handling and loading states

## Features

- 👤 **User Image Upload:** Upload a photo of yourself with instant preview.
- 👕 **Clothing Image Upload:** Upload a photo of a clothing item with preview.
- 🖼️ **Image Previews:** See previews of the uploaded images before processing.
- ✨ **AI-Powered Try-On:** Uses Google Gemini 2.0 Flash experimental model for
  high-quality image generation.
- ✅ **Result Display:** Shows the generated virtual try-on image.
- ⏳ **Loading State:** Beautiful loading spinner with progress indication.
- 🔄 **Reset Functionality:** Easily clear all inputs and results.
- 🎨 **Modern UI:** Clean, responsive interface with custom color system.
- 📱 **Mobile-First:** Optimized for all device sizes.
- 🔒 **Form Validation:** Built-in validation with error handling.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15+ with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4+) with custom
  color plugin
- **Form Management:** [React Hook Form](https://react-hook-form.com/) with
  [Zod](https://zod.dev/) validation
- **AI Model:** [Google Gemini API](https://ai.google.dev/gemini-api) (via
  `@google/genai` SDK)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **Package Manager:** npm

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A **Google Gemini API Key**: You can obtain one from
  [Google AI Studio](https://aistudio.google.com/app/apikey).

## Getting Started

Follow these steps to set up and run the application locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/cristoferespindola/ai-try-on-frontend.git
    cd ai-try-on-frontend
    ```

    Alternatively, if you have the code locally, navigate to the project's root
    directory.

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    - Create a new file named `.env.local` in the root of your project
      directory.
    - Add your Google Gemini API Key to this file:
      ```plaintext
      # .env.local
      GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
      ```
    - Replace `YOUR_GOOGLE_GEMINI_API_KEY` with the actual key you obtained from
      Google AI Studio.

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

5.  **Open the Application:** Open your web browser and navigate to
    `http://localhost:3000` (or the port shown in your terminal).

## Usage

1.  The application interface will load.
2.  Click the "Upload Your Photo" input section (or the button within it) and
    select an image file of a person. A preview will appear.
3.  Click the "Upload Clothing Item" input section and select an image file of a
    clothing item. A preview will appear.
4.  Click the "Try It On!" button.
5.  A loading indicator will appear while the AI generates the image. This may
    take several seconds.
6.  If successful, the resulting "try-on" image will be displayed below the
    form.
7.  If an error occurs (e.g., API issue, invalid input), an error message will
    be displayed. Check the browser console and backend terminal logs for more
    details.
8.  Click the "Reset" button at any time to clear the uploaded images, previews,
    results, and any error messages.

## API Endpoint (`/api/tryon`)

- **Method:** `POST`
- **Request Body:** Expects `FormData` containing:
  - `userImage`: The File object for the user's photo.
  - `clothingImage`: The File object for the clothing item's photo.
- **Response Body (Success):**
  ```json
  {
    "image": "data:image/png;base64,...", // Base64 encoded data URL of the generated image
    "description": "Text description from the AI (if any)"
  }
  ```
- **Response Body (Error):**
  ```json
  {
    "error": "Error message string",
    "details": "Optional error details string"
  }
  ```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/tryon/         # API route for virtual try-on
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── FileInput.tsx      # Reusable file input component
│   ├── ImageForm.tsx      # Form component
│   ├── SocialLinks.tsx    # Social media links
│   └── TryOnPage.tsx      # Main page component
├── hooks/                 # Custom React hooks
│   └── useImageUpload.ts  # Image upload logic
├── libs/                  # Shared libraries
│   ├── schemas.ts         # Zod validation schemas
│   └── types.ts           # TypeScript type definitions
├── plugins/               # Tailwind CSS plugins
│   ├── colorGenerator.mjs # Custom color system plugin
│   ├── colors.mjs         # Base color definitions
│   └── README.md          # Color system documentation
├── services/              # API services
│   └── image.ts           # Image processing service
├── ui/                    # UI components
│   ├── Button.tsx         # Button component
│   ├── ImageBox.tsx       # Image display component
│   ├── InputFile.tsx      # File input component
│   └── types.ts           # UI component types
└── tailwind.config.mjs    # Tailwind configuration
```

## Custom Color System

This project includes a custom Tailwind CSS plugin that generates color scales
(1-10) following Tailwind's logic:

- **Base Color (6)**: The primary color defined in `plugins/colors.mjs`
- **Light Colors (1-5)**: Mix of base color with white
- **Dark Colors (7-10)**: Reduced lightness of base color

Available colors: `primary`, `secondary`, `accent`, `success`, `warning`,
`error`

Each color generates classes like: `bg-primary-6`, `text-primary-6`,
`border-primary-6`, etc.

For detailed documentation, see `plugins/README.md`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

Copyright (c) 2025 Cristofer Espindola

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
