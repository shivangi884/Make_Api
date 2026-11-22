const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

Cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    floder: "3PM",
    resource_type: "auto",
    format_allowed: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
