import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

export default function AddItem() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    size: "",
    condition: "",
    imageFile: null,
  });

  const [userId, setUserId] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [message, setMessage] = useState(""); // No longer needed with Toastify

  // 🔐 Fetch userId from session via check-auth
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/check-auth");
      if (res.ok) {
        const data = await res.json();
        setUserId(data.user._id); // Store userId
      } else {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.size || !form.condition || !form.imageFile) {
      toast.error("Please fill in all fields."); // Use toast for validation error
      return;
    }

    // Show initial loading toast
    const loadingToastId = toast.loading("Please wait, uploading item...");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("size", form.size);
      formData.append("condition", form.condition);
      formData.append("userId", userId);
      formData.append("image", form.imageFile); // 👈 this name must match the backend

      const res = await fetch("/api/add-item", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // Update the loading toast to success
        toast.update(loadingToastId, {
          render: "Item added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setForm({ title: "", category: "", size: "", condition: "", imageFile: null });
        setPreview(null);
        router.push("/dashboard");
      } else {
        // Update the loading toast to error
        toast.update(loadingToastId, {
          render: `Failed to add item: ${data.message || "An error occurred"}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Add Item Error:", error);
      // Update the loading toast to error for unexpected errors
      toast.update(loadingToastId, {
        render: "An unexpected error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* ToastContainer should be rendered once in your app, often in _app.js or a top-level component */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Or "dark" or "colored"
      />

      <div className="max-w-xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Add New Item</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Vintage Denim Jacket"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select a category</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Size</label>
            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="e.g. M, L, XL, UK 9"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Gently Used">Gently Used</option>
              <option value="Used">Used</option>
              <option value="Heavily Used">Heavily Used</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit Item
          </button>
        </form>
      </div>
    </div>
  );
}