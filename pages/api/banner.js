import { S3Client, ListObjectsCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

const bucketName = 'pbsports';
const pub = 'pub-286a1a3ce1784237a33c76a3f5cf95d3';

const pbsports = new S3Client({
  endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (req.method === 'GET') {
    const directory = 'banners';
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: directory });
    const response = await pbsports.send(command);
    const fileLinks = response.Contents.map(file => `https://${pub}.r2.dev/${file.Key}`);
    return res.status(200).json(fileLinks);
  }

  if (req.method === 'DELETE') {
    const { url } = req.body;
    const command = new DeleteObjectCommand({ Bucket: bucketName, Key: url.split('/').pop() });
    await pbsports.send(command);
    return res.status(200).json({ message: 'File deleted successfully' });
  }

  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
