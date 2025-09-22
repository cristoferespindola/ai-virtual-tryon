'use client';

import { useImageUpload } from '../hooks/useImageUpload';
import Image from 'next/image';
import { FormProvider } from 'react-hook-form';
import ImageForm from './ImageForm';

export default function TryOnPageComponent() {
  const { form, onSubmit, reset, resultImageUrl, isLoading, error } =
    useImageUpload();

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-50 transition-colors duration-200'>
      <h1 className='text-4xl font-bold my-6 text-center text-gray-800'>
        AI - Try-On Frontend
      </h1>

      <main className='flex flex-grow flex-col items-center px-4 w-full'>
        <div className='w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-md transition-colors duration-200'>
          <p className='text-center text-gray-600 mb-6'>
            Upload your photo and a clothing item to see how it looks on you!
            <br />
            <small className='text-sm text-gray-500'>
              💡 Tip: For best results, use clear, front-facing photos with good
              lighting
            </small>
          </p>

          <FormProvider {...form}>
            <ImageForm
              onSubmit={onSubmit}
              onReset={reset}
              isLoading={isLoading}
              error={error}
            />

            {isLoading && (
              <div className='mt-8 text-center'>
                <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-6'></div>
                <p className='text-primary-6 mt-2 text-sm'>
                  ✨ Creating your virtual try-on experience...
                </p>
              </div>
            )}

            {resultImageUrl && !isLoading && (
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
                  🎉 Your Virtual Try-On Result
                </h2>
                <div className='flex justify-center'>
                  <Image
                    src={resultImageUrl}
                    alt='Virtual try-on result'
                    width={600}
                    height={600}
                    className='max-w-full h-auto rounded-lg shadow-md border border-gray-300 bg-gray-100'
                    style={{ maxHeight: '600px' }}
                  />
                </div>
              </div>
            )}
          </FormProvider>
        </div>
      </main>
    </div>
  );
}
