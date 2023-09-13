import { Router } from "express";
import { uploadImage } from "../services/utils.service";
import bodyParser from "body-parser";
const router = Router();

router.post("/image",
    bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }), uploadImage);


export default router;