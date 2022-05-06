import crypto from "crypto";

export class Crypto {
  readonly salt;

  constructor(salt: string) {
    this.salt = salt;
  }

  generate(value: string | Buffer): string {
    return crypto
      .createHash("md5")
      .update(value)
      .update(this.salt)
      .digest("hex");
  }
}
