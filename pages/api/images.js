import { mongooseConnect } from "@/lib/mongoose";
import { Highlight } from "@/models/Highlight";
import { Schedule } from "@/models/Schedule";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        try {
            // Fetch images from both Highlight and Schedule collections
            const highlights = await Highlight.find({}, 'images').exec();
            const schedules = await Schedule.find({}, 'images').exec();

            // Extract images from the results
            const highlightImages = highlights.flatMap(highlight => highlight.images);
            const scheduleImages = schedules.flatMap(schedule => schedule.images);

            // Combine images into a single array
            const allImages = [...highlightImages, ...scheduleImages];

            res.status(200).json(allImages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch images' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
