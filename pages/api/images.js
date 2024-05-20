import { mongooseConnect } from "@/lib/mongoose";
import { Highlight } from "@/models/Highlight";
import { Schedule } from "@/models/Schedule";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        try {
            const highlights = await Highlight.find({}, 'images').exec();
            const schedules = await Schedule.find({}, 'images').exec();

            const highlightImages = highlights.flatMap(highlight => highlight.images);
            const scheduleImages = schedules.flatMap(schedule => schedule.images);

            const allImages = [...highlightImages, ...scheduleImages];

            res.status(200).json(allImages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch images' });
        }
    } else if (method === 'DELETE') {
        try {
            const { url } = req.body;

            await Highlight.updateMany(
                {},
                { $pull: { images: url } }
            );
            await Schedule.updateMany(
                {},
                { $pull: { images: url } }
            );

            res.status(200).json({ message: 'Image deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete image' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
