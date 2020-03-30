import * as multer from "multer";
import { join } from "path";

const destination = join(__dirname, "../../public/files");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    console.log("req", req["fieldPathFromReq"]);
    const [originFilename, ext] = file.originalname.split(".");
    const filename = `${originFilename}-${Date.now()}.${ext}`;
    const fileUrl = join(req.app.locals.context.host, "files", filename);

    req["fileUpload"] = {
      filename,
      fileUrl
    };
    cb(null, filename);
  }
});
export const uploadFileMiddleware: any = multer({
  storage
});
