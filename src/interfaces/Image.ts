export class Image {
  constructor(public readonly source: Buffer, public readonly type: string) {}

  transform(type: "base64" | "hex"): string {
    return this.source.toString(type);
  }
}
