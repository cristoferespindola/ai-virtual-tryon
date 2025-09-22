'use client';

import { useImageUpload } from '../hooks/useImageUpload';
import Image from 'next/image';
import { FormProvider } from 'react-hook-form';
import ImageForm from './ImageForm';
import { Heading, Paragraph, Small } from '@/ui/Typography';
import Loader from '@/ui/Loader';

export default function TryOnPageComponent() {
  const { form, onSubmit, reset, resultImageUrl, isLoading, error } =
    useImageUpload();

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-50 transition-colors duration-200'>
      <Heading level={1} align='center' className='pt-6'>
        AI Virtual Try-On
      </Heading>

      <main className='flex flex-grow flex-col items-center px-4 w-full'>
        <div className='w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-md transition-colors duration-200'>
          <Paragraph align='center'>
            Upload your photo and a clothing item to see how it looks on you!
            <br />
            <Small align='center' className='mt-2'>
              💡 Tip: For best results, use clear, front-facing photos with good
              lighting
            </Small>
          </Paragraph>

          <FormProvider {...form}>
            <ImageForm
              onSubmit={onSubmit}
              onReset={reset}
              isLoading={isLoading}
              error={error}
            />

            {isLoading && (
              <div className='mt-8 text-center'>
                <Loader isLoading={isLoading} />
                <Paragraph className='text-primary-6 mt-2 text-sm'>
                  ✨ Creating your virtual try-on experience...
                </Paragraph>
              </div>
            )}

            {resultImageUrl && !isLoading && (
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <Heading level={2} align='center'>
                  🎉 Your Virtual Try-On Result
                </Heading>
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
