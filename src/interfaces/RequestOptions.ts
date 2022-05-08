import { ImageData } from "./ImageData";

export enum ImageTypes {
  jpg = "jpg",
  png = "png",
  avif = "avif",
  svg = "svg",
  webp = "webp",
  bmp = "bmp",
  gif = "gif",
}

type SupportedTypes = "png" | "jpg";

export interface RequestOptions {
  headers?: { [key: string]: string | number | boolean };
  fracture?: (response: ImageData) => Promise<boolean> | boolean;
  transforms?: {
    [key in ImageTypes & string]?:
      | (SupportedTypes & string)
      | {
          type: SupportedTypes & string;
          quality?: number;
        };
  };
}
