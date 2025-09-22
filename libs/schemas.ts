import { z } from 'zod';

export const tryOnSchema = z.object({
  userImage: z
    .any()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine(
      (file) => file && file.size <= 10 * 1024 * 1024,
      'File size must be less than 10MB',
    )
    .refine(
      (file) =>
        file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG and WebP images are allowed',
    ),
  clothingImage: z
    .any()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine(
      (file) => file && file.size <= 10 * 1024 * 1024,
      'File size must be less than 10MB',
    )
    .refine(
      (file) =>
        file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG and WebP images are allowed',
    ),
});

export type TryOnFormData = z.infer<typeof tryOnSchema>;
