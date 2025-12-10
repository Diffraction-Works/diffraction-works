import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Robust export with fallback to an empty array to prevent "undefined" errors in components
export const PlaceHolderImages: ImagePlaceholder[] = data?.placeholderImages || [];
