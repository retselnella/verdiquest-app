// middlewares/multerConfig.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    let dest = request.body.filePath || "uploads/";

    // Ensure directory exists or create it
    const dir = path.join(__dirname, "../", dest);
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (request, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
