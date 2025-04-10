import { Router } from "express";
import { registerUser, loginUser, bulkUserSearch } from "../controllers/users.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import accountRouter from "../controllers/account.js";

let router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/bulk", bulkUserSearch);
router.use("/account",accountRouter);

export default router;
