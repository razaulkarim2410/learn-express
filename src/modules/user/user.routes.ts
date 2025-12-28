import express, { Request, Response } from "express"
import { pool } from "../../config/db";
import { userController } from "./user.controlier";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", userController.createUser)


router.get("/", logger, auth("admin"), userController.getUser);
router.get("/:id", auth("admin", "user"),  userController.getSingleuser)

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);
export const userRoutes = router;