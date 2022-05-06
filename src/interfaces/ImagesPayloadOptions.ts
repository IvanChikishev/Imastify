import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

export interface ImagesPayloadOptions {
  salt?: string;
  headers?: { [key: string]: string | number | boolean };
  agent?: HttpAgent | HttpsAgent;
}
