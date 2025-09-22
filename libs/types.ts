export interface TryOnResponse {
  image?: string;
  description?: string;
  error?: string;
}

export interface TryOnError {
  message: string;
  status?: number;
}

export interface ImageUploadState {
  userImage: File | null;
  clothingImage: File | null;
  userImagePreview: string | null;
  clothingImagePreview: string | null;
  resultImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}
