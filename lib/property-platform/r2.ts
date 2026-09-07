import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export function getR2Client() {
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 is not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function getR2Bucket() {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("R2_BUCKET_NAME is not configured");
  return bucket;
}

export function getR2PublicUrl(key: string) {
  const base = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("R2_PUBLIC_BASE_URL is not configured");
  return `${base}/${key.split("/").map(encodeURIComponent).join("/")}`;
}
