# 👕 ReWear – Community Clothing Exchange

## 📝 Problem Statement

ReWear is a web-based platform designed to enable users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote **sustainable fashion** and reduce **textile waste** by encouraging users to **reuse wearable garments** instead of discarding them.

---

## 🚀 Features

- 👤 User authentication system
- 📦 Add, view, and manage clothing items
- 🔍 Browse others' items with search and category filter
- 🏷️ View your profile with your listed items
- 📷 Upload images with preview (stored on Cloudinary)
- 🔄 Swap functionality (coming soon)

---

## 🧰 Tech Stack

### 💻 Frontend
- [Next.js](https://nextjs.org/)
- React.js
- Tailwind CSS (optional if used)
- Cloudinary (for image uploads)

### 🔙 Backend
- Node.js (via Next.js API routes)
- MongoDB with Mongoose
- Cloudinary SDK
- Formidable (for handling file uploads)

### 🔐 Authentication
- Cookie-based session
- Custom `/api/check-auth` route

---

## 📦 Getting Started

### 🔧 Prerequisites
- Node.js ≥ 16.x
- MongoDB URI (e.g., MongoDB Atlas)
- Cloudinary account

### 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/rewear.git
cd rewear
Install dependencies
npm install
Create .env.local file
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the development server
npm run dev