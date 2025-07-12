// pages/api/items/others.js
import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId in query." });
  }

  try {
    // Fetch all items where userId !== current userId and isAvailable = true
    const items = await Item.find({
      userId: { $ne: userId },
      isAvailable: true,
    }).sort({ createdAt: -1 }); // Optional: show latest first

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
