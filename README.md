# 💊 PharmaCart – Online Pharmacy E-commerce Platform

PharmaCart is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that enables users to buy and manage medicines online. The platform supports both customers and admins with separate dashboards for browsing, purchasing, and managing products.

---

## 🌟 Features

### 🛒 Customer Features
- Browse medicines with images, descriptions, and prices
- Search and filter medicines by name
- Add products to cart
- Manage cart (add/remove items)
- Secure registration and login
- Checkout with dynamic total calculation

### 🔐 Admin Features
- Secure admin login
- Dashboard overview (total products, orders, earnings)
- Add, update, and delete products (with image upload via Cloudinary)
- Search and manage inventory in a table format
- View order summaries

---

## 🧰 Tech Stack

| Frontend        | Backend         | Database        | Cloud Storage  | Auth        |
|----------------|----------------|----------------|----------------|-------------|
| React.js       | Node.js        | MongoDB Atlas   | Cloudinary     | JWT         |
| Tailwind CSS   | Express.js     | Mongoose        |                | bcrypt.js   |

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/AdeelAhmedQureshi/PharmaCart
cd pharmacart

### Backend Setup
cd backend
npm install
# Create a .env file with the following
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
npm run server


### Frontend Setup
cd ../frontend
npm install
npm run dev


