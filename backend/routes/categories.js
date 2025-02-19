import connectDB from '../lib/db';
import Category from '../models/category';

export default async function handler(req, res) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const categories = await Category.find({});
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
