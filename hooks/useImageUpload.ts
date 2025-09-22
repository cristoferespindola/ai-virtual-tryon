'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getImage } from '../services/image';
import { tryOnSchema, TryOnFormData } from '../libs/schemas';

export function useImageUpload() {
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TryOnFormData>({
    resolver: zodResolver(tryOnSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: TryOnFormData) => {
    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    const formData = new FormData();
    formData.append('userImage', data.userImage);
    formData.append('clothingImage', data.clothingImage);

    try {
      const imageUrl = await getImage(formData);
      if (imageUrl) {
        setResultImageUrl(imageUrl);
      }
    } catch (err: unknown) {
      console.error('Submission Error:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred during image generation.';
      setError(errorMessage);
      setResultImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    form.reset();
    setResultImageUrl(null);
    setError(null);
  };

  return {
    // Form
    form,
    onSubmit,
    reset,

    // State
    resultImageUrl,
    isLoading,
    error,
  };
}
