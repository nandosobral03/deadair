import { Router } from "express";
import { uploadImage } from "../services/utils.service";
import bodyParser from "body-parser";
import { jwtMiddleware } from "../middleware/jwt.middleware";
const router = Router();

router.post("/image", jwtMiddleware,
    bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }), uploadImage);


export default router;