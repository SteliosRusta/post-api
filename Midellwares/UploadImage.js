import multer from "multer";
import { extname } from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
});

const UploadImage = multer({ storage });
export default UploadImage;
