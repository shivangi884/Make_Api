# Make API

Make API is a backend project developed using Node.js, Express.js and MongoDB. It provides APIs for authentication, events, categories, bookings and user management. It also uses JWT for authentication and Cloudinary for image uploads.

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt
- Cloudinary
- Multer
- Zod
- Dotenv
- CORS

## 📁 Project Structure

```text
server/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   └── categoryController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Booking.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── userRoutes.js
│   │   └── categoryRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   └── utils/
│       ├── generateToken.js
│       └── generateTicket.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Go to the server folder:

```bash
cd server
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and configure:

```env
PORT=5050
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## ▶️ Run Project

Start the server:

```bash
npm run start
```

Server runs at:

```text
http://localhost:5050
```

API status:

```text
http://localhost:5050/
```

Expected response:

```text
Eventique API is running...
```

## 🔗 API Routes

| Module | Base URL |
|---|---|
| Authentication | `/api/auth` |
| Events | `/api/events` |
| Categories | `/api/categories` |
| Bookings | `/api/bookings` |
| Users | `/api/users` |

## ☁️ Image Upload

Cloudinary is used for image storage and Multer is used to handle image uploads.

## 🎥 Project Video Demonstration

**Video Link:** [Add Your Project Video Link Here]([https://drive.google.com/file/d/1AOPGd-Pg8ihKvakA4xV24jHEfzIi-1PO/view?usp=drive_link](https://drive.google.com/file/d/1AOPGd-Pg8ihKvakA4xV24jHEfzIi-1PO/view?usp=sharing))

## 🔐 Environment Variables

Keep your MongoDB URL, JWT secret and Cloudinary credentials private. Never upload your `.env` file to GitHub.

## 👩‍💻 Developer

**Project:** Make API

**Backend:** Node.js, Express.js and MongoDB
