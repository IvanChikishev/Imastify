import { ImageData } from "./ImageData";

export interface RequestOptions {
  headers?: { [key: string]: string | number | boolean };
  fracture?: (response: ImageData) => Promise<boolean> | boolean;
}
