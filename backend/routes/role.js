import express from "express";
import role from "../controllers/role.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/registerRole", auth, admin, role.registerRole);
router.get("/listRole", auth, admin, role.listRole);
router.get("/findRole/:_id", auth, validId, admin, role.findRole);
router.put("/updateRole", auth, admin, role.updateRole);
router.delete("/deleteRole/:_id", auth, validId, admin, role.deleteRole);

export default router;
