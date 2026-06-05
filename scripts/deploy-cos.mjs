import fs from "node:fs";
import path from "node:path";
import COS from "cos-nodejs-sdk-v5";

const Bucket = "walnut-fortune-1440450915";
const Region = "ap-hongkong";
const SecretId = process.env.TENCENTCLOUD_SECRET_ID;
const SecretKey = process.env.TENCENTCLOUD_SECRET_KEY;
const shouldConfigureWebsite = process.argv.includes("--configure-website");

const files = [
  { key: "index.html", contentType: "text/html; charset=utf-8" },
  { key: "style.css", contentType: "text/css; charset=utf-8" },
  { key: "script.js", contentType: "application/javascript; charset=utf-8" }
];

if (!SecretId || !SecretKey) {
  console.error("Missing TENCENTCLOUD_SECRET_ID or TENCENTCLOUD_SECRET_KEY.");
  process.exit(1);
}

const cos = new COS({
  SecretId,
  SecretKey
});

function putBucketWebsite() {
  return new Promise((resolve, reject) => {
    cos.putBucketWebsite(
      {
        Bucket,
        Region,
        WebsiteConfiguration: {
          IndexDocument: {
            Suffix: "index.html"
          },
          ErrorDocument: {
            Key: "index.html"
          }
        }
      },
      (error, data) => {
        if (error) reject(error);
        else resolve(data);
      }
    );
  });
}

function putObject({ key, contentType }) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket,
        Region,
        Key: key,
        Body: fs.createReadStream(path.resolve(key)),
        ContentType: contentType,
        ACL: "public-read"
      },
      (error, data) => {
        if (error) reject(error);
        else resolve(data);
      }
    );
  });
}

console.log(`Deploying ${files.length} files to ${Bucket} (${Region})...`);

if (shouldConfigureWebsite) {
  await putBucketWebsite();
  console.log("Static website configuration updated.");
} else {
  console.log("Skipped static website configuration. Pass --configure-website to update it.");
}

for (const file of files) {
  await putObject(file);
  console.log(`Uploaded ${file.key} (${file.contentType})`);
}

console.log("");
console.log("COS website URL:");
console.log(`https://${Bucket}.cos-website.${Region}.myqcloud.com`);
