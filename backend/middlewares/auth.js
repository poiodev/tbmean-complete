import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  token = token.split(" ")[1];
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  try {
    req.user = jwt.verify(token, process.env.SK_JWT);
    next();
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Authorization denied: Invalid token" });
  }
};

export default auth;
