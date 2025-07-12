// src/pages/api/test-db.js
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      res.status(200).json({ message: "✅ MongoDB Connected (Pages Router)!" });
    } catch (error) {
      console.error("DB Connection Error:", error);
      res.status(500).json({ error: "❌ DB Connection Failed!" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
