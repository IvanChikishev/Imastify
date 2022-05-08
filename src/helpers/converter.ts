import sharp from "sharp";
import { ImageRequestError } from "../base";
import { MIME_TYPES } from "../constants/types";

const MIME_TYPES_ENTRIES = Object.entries(MIME_TYPES);
const SEARCH_MAP: { [key: string]: string } = {};

export class Converter {
  static mime(type: string) {
    const mime = SEARCH_MAP[type];

    if (mime) {
      return SEARCH_MAP[mime];
    }

    for (const [mime, { type: fileType }] of MIME_TYPES_ENTRIES) {
      if (type === fileType) {
        SEARCH_MAP[type] = mime;

        return mime;
      }
    }

    throw new ImageRequestError("Type not defined");
  }

  static async transform(
    source: Buffer,
    extension: string,
    type: string,
    quality: number
  ) {
    const __performanceStart = Date.now();

    if (extension === type && quality === 100) {
      return { source, mimeType: this.mime(type), performance: 0 };
    }

    const payload = sharp(source);

    switch (type) {
      case "png": {
        payload.png({
          quality,
        });

        break;
      }
      case "jpg": {
        payload.jpeg({
          quality,
        });

        break;
      }
      default:
        throw new ImageRequestError(`Conversion to ${type} is not supported`);
    }

    return {
      source: await payload.toBuffer(),
      mimeType: this.mime(type),
      performance: Date.now() - __performanceStart,
    };
  }
}
