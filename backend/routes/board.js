import express from "express";
import board from "../controllers/board.js";
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
const mult = multiparty();
const router = express.Router();

router.post("/saveTask", auth, board.saveTask);
router.post("/saveTaskImg", mult, formatFile, auth, board.saveTaskImg);
router.get("/listTask", auth, board.listTask);
router.put("/updateTask", auth, board.updateTask);
router.delete("/deleteTask/:_id", auth, validId, board.deleteTask);

export default router;
