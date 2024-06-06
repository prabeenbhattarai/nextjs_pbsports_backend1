import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    })
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Something went wrong! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array('file'));

apiRoute.post((req, res) => {
    const uploadedFiles = req.files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({ links: uploadedFiles });
});

apiRoute.delete((req, res) => {
    const { url } = req.body;
    const filePath = path.join(process.cwd(), 'public', url);

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete image' });
            return;
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
