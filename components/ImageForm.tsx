'use client';

import { useFormContext } from 'react-hook-form';
import Button from '@/ui/Button';
import FileInput from './FileInput';
import { TryOnFormData } from '../libs/schemas';

interface ImageFormProps {
  onSubmit: (data: TryOnFormData) => void;
  onReset: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function ImageForm({
  onSubmit,
  onReset,
  isLoading,
  error,
}: ImageFormProps) {
  const { handleSubmit, register, formState, watch } =
    useFormContext<TryOnFormData>();

  const userImage = watch('userImage');
  const clothingImage = watch('clothingImage');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FileInput
          label='1. Upload Your Photo'
          variant='primary'
          id='userImage'
          name='userImage'
          required
          register={register('userImage')}
          errors={formState.errors}
        />

        <FileInput
          label='2. Upload Clothing Item'
          variant='success'
          id='clothingImage'
          name='clothingImage'
          required
          register={register('clothingImage')}
          errors={formState.errors}
        />
      </div>

      {error && (
        <p className='text-red-600 text-sm text-center mt-4'>{error}</p>
      )}

      <div className='flex justify-center pt-4 space-x-4'>
        <Button
          variant='accent'
          type='submit'
          disabled={isLoading || !userImage || !clothingImage}
        >
          {isLoading ? 'Generating...' : 'Try It On!'}
        </Button>

        <Button variant='secondary' type='button' onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
