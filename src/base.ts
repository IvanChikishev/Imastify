import { IncomingMessage } from "http";

export class ImageRequestError extends Error {
  private timestamp: number;
  private url: string | undefined;
  private response: IncomingMessage | undefined;

  constructor(
    message: string,
    url?: string,
    response?: IncomingMessage,
    cause?: Error
  ) {
    super(message);

    this.name = "Imastify";

    this.timestamp = Date.now();
    this.stack = cause?.stack;
    this.url = url;
    this.response = response;
  }
}
