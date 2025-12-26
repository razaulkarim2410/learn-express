import express, { Request, Response } from "express"
import { pool } from "../../config/db";
import { userController } from "./user.controlier";
const router = express.Router();

router.post("/", userController.createUser)


router.get("/",  userController.getUser)
router.get("/:id",  userController.getUser)

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);
export const userRoutes = router;