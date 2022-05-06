# Library for downloading images via http/https

### Supported formats
* image/avif
* image/svg+xml
* image/png
* image/jpeg
* image/jpg
* image/webp
* image/bmp
* image/gif


##Examples

* Base
```javascript
import { ImagesPayload } from 'imastify';
import fs from "fs";

const payload = new ImagesPayload({
    // example headers
    headers: {
        Cookie: "name=cookie",
    },
    
    // http or https agent
    agent,
});

const {
    // Image Data
    image,
    // Image size in bytes
    size,
    // MIME ContentType
    contentType,
    // File extension - png, jpg and etc.
    type,
    // Image Url
    url,
    // Download status
    downloaded,
    //  Image hash
    hash,
} = await payload.request(
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
);

// save to file
fs.writeFileSync("google-logo.png", image.source);

// transform to base64
console.log(image.transform('base64'));
```

* with handler

```javascript
import { ImagesPayload } from "./dist";
import fs from "fs";

const payload = new ImagesPayload({
    // example headers
    headers: {
        Cookie: "name=cookie",
    },
    
    // http or https agent
    agent
});

const { downloaded } = await payload.request(
  "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  {
    fracture: async ({ hash }) => {
      const state = await db.select(`SELECT * FROM t_images WHERE hash = ?`, [
        hash,
      ]);

      /**
       * After the hash is generated, you have the option to continue
       * downloading the image or abort it, false - abort the download
       */

      return state === 0; // false
    },
  }
);

console.log(`Image download status > `, downloaded); // Image download status > false
```