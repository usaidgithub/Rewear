import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    await dbConnect();

    const items = await Item.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching user's items:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
