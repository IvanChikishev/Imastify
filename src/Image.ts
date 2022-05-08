import Sharp from "sharp";
import sharp from "sharp";
import { ImageRequestError } from "./base";
import { ImageData } from "./interfaces/ImageData";

export class Image {
  constructor(public source: Buffer, public type: string) {}

  /**
   * @description Method to convert buffer to bass64 or hex
   */
  transform(type: "base64" | "hex"): string {
    return this.source.toString(type);
  }
}
