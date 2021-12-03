import mongoose from "mongoose";

const validId = async (req, res, next) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params["_id"]);
  return !validId ? res.status(400).send("Invalid id") : next();
};

export default validId;
