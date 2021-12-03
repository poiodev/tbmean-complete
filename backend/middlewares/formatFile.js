const upload = async (req, res, next) => {
  if (Object.keys(req.files).length === 0) {
    next();
  } else {
    if (!req.files.image.name || !req.files.image.name) {
      next();
    } else {
      if (req.files.image.type) {
        const type = req.files.image.type;
        if (
          type !== "image/png" &&
          type !== "image/jpg" &&
          type !== "image/jpeg" &&
          type !== "image/gif"
        ) {
          return res.status(400).send({
            message: "Invalid image format: only .png .jpg. jpeg .gif",
          });
        } else {
          next();
        }
      }
    }
  }
};

export default upload;
