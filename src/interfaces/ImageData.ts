import { Image } from "../Image";

export interface ImageData {
  url: string;
  hash?: string;
  contentType: string;
  image?: Image;
  downloaded: boolean;
  type: string;
  size: number;

  // Displayed only during transformation
  original?: {
    size: number;
    type: string;
    contentType: string;
    image: Image;
  };

  // Displayed only during transformation
  performance?: number;
}
