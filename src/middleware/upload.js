const multer = require("multer");
const fs = require("fs");
const path = require("path");

// define upload directory
const uploadDir = path.join(__dirname, "../../uploads");

// create uploads folder if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// initialize multer
const upload = multer({ storage });

module.exports = upload;
