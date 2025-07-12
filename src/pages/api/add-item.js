// pages/api/add-item.js
import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";
import cloudinary from "@/lib/cloudinary";
import * as formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Necessary for Formidable to parse multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ message: "Form parsing error", error: err.message });
    }

    try {
      // Extract fields cleanly
      const extractedFields = {};
      for (const key in fields) {
        extractedFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      }

      const requiredFields = ["userId", "title", "category", "size", "condition"];
      for (const field of requiredFields) {
        if (!extractedFields[field]) {
          return res.status(400).json({ message: `${field} is required.` });
        }
      }

      // Validate image
      // Validate image
      const mediaFile = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!mediaFile || !mediaFile.filepath) {
        return res.status(400).json({ message: "Image file is required." });
      }


      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(mediaFile.filepath, {
        resource_type: "image",
        folder: "rewear/items",
      });

      // Save to MongoDB
      const newItem = new Item({
        userId: extractedFields.userId,
        title: extractedFields.title,
        category: extractedFields.category,
        size: extractedFields.size,
        condition: extractedFields.condition,
        imageUrl: result.secure_url,
      });

      await newItem.save();

      return res.status(200).json({ message: "Item added successfully!", item: newItem });
    } catch (error) {
      console.error("Add Item Error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
}
