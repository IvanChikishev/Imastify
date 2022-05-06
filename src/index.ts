import { Crypto } from "./crypto";
import https from "https";
import { ImagesPayloadOptions } from "./interfaces/ImagesPayloadOptions";
import { RequestOptions } from "./interfaces/RequestOptions";
import { MIME_TYPES } from "./types";
import { ImageData } from "./interfaces/ImageData";
import { Stream } from "stream";
import { Image } from "./interfaces/Image";
import { ImageRequestError } from "./base";

const DEFAULT_SALT = "0a31eeeb-03f2-4772-a523-fdf24973918e";

export class ImagesPayload {
  crypto: Crypto;

  /**
   * @param {ImagesPayloadOptions} [options]
   */
  constructor(private options: ImagesPayloadOptions = {}) {
    this.crypto = new Crypto(options?.salt ?? DEFAULT_SALT);
  }

  async request(url: string, options?: RequestOptions): Promise<ImageData> {
    const headers = {};

    if (this.options?.headers) {
      Object.assign(headers, this.options.headers);
    }

    if (options?.headers) {
      Object.assign(headers, options.headers);
    }

    return new Promise((resolve, reject) => {
      https.get(
        url,
        { headers, agent: this.options.agent },
        async (response) => {
          try {
            const statusCode = response.statusCode;

            if (!statusCode || statusCode < 200 || statusCode > 299) {
              return reject(
                new ImageRequestError(
                  `Request error, server responded with ${statusCode} code`,
                  url,
                  response
                )
              );
            }

            const contentType = response.headers["content-type"] as string;
            const contentLength = Number(response.headers["content-length"]);

            if (!contentType) {
              return reject(
                new ImageRequestError(
                  `Failed to determine query ${contentType} mime`,
                  url,
                  response
                )
              );
            }

            if (!contentLength) {
              return reject(
                new ImageRequestError(
                  `Unable to determine image size`,
                  url,
                  response
                )
              );
            }

            const { type } = MIME_TYPES[contentType];

            if (!type) {
              return reject(
                new ImageRequestError(
                  `Failed to determine file extension`,
                  url,
                  response
                )
              );
            }

            const imageData: ImageData = {
              url,
              contentType,
              type,
              downloaded: false,
              size: contentLength,
            };

            const properties = {
              freeze: false,
            };

            const stream = new Stream.Transform();

            for await (const chunk of response) {
              stream.push(chunk);

              if (!properties.freeze) {
                imageData.hash = this.crypto.generate(chunk.slice(0, 1024));

                if (options?.fracture) {
                  const success = await options.fracture(imageData);

                  if (!success) {
                    return resolve(imageData);
                  }
                }

                properties.freeze = true;
              }
            }

            imageData.downloaded = true;
            imageData.image = new Image(stream.read(), type);

            return resolve(imageData);
          } catch (cause) {
            return reject(
              new ImageRequestError(
                "Unexpected error",
                url,
                undefined,
                cause as Error
              )
            );
          }
        }
      );
    });
  }
}
