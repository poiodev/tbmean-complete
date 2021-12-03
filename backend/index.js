import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import role from "./routes/role.js";
import user from "./routes/user.js";
import board from "./routes/board.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role", role);
app.use("/api/user", user);
app.use("/api/board", board);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

db.dbConnection();
