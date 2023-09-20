import { Router } from "express";
import c from "../controllers/user.controller";
const router = Router();

router.post("/login", c.loginUserCall);
router.post("/register", c.createUserCall);
router.post("/oauth/google", c.registerGoogleUserCall);


export default router;