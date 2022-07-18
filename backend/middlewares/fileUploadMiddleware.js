const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = ((req, res, next) => {
  const getFileType = (file) => {
    const mimetype = file.mimetype.split("/");

    return mimetype[mimetype.length - 1];
  };

  const generateFileName = (req, file, cb) => {
    const extension = getFileType(file);
    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${extension}`;

    return cb(null, `${file.fieldname}-${filename}`);
  };

  const fileFilter = (req, file, cb) => {
    const extension = getFileType(file);
    const allowedTypes = /jpeg|jpg|png/;
    const passed = allowedTypes.test(extension);

    if (passed) {
      return cb(null, true);
    }

    return cb(null, false);
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.user;
      const destination = `uploads/user/${id}`;

      fs.access(destination, (error) => {
        if (error) {
          console.error(`[fs] access - ${error}`);
          return fs.mkdir(destination, (error) => {
            console.error(`[fs] mkdir - ${error}`);
            cb(error, destination);
          });
        } else {
          fs.readdir(destination, (error, files) => {
            if (error) {
              console.error(`[fs] readdir - ${error}`);
              throw error;
            }

            for (const file of files) {
              fs.unlink(path.join(destination, file), (error) => {
                if (error) {
                  console.error(`[fs] unlink - ${error}`);
                  throw error;
                }
              });
            }
          });

          return cb(null, destination);
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, fileFilter }).single("avatar");
})();
