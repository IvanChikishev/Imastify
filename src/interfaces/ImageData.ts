import { Image } from "./Image";

export interface ImageData {
  url: string;
  hash?: string;
  contentType: string;
  image?: Image;
  downloaded: boolean;
  type: string;
  size: number;
}
