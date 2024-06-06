import fs from 'fs';
import path from 'path';

export default async (req, res) => {
    if (req.method === 'GET') {
        const directoryPath = path.join(process.cwd(), 'public/uploads');
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Unable to scan directory' });
            }
            const fileLinks = files.map(file => `/uploads/${file}`);
            res.status(200).json(fileLinks);
        });
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
};
