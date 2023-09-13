import { Router } from "express";
import c from "../controllers/video.controller";

const router = Router();

router.get("/", c.getVideosCall);
router.get("/:id", c.getVideoCall);
router.post("/", c.addVideoCall);
router.put("/:id/category/:categoryId", c.addVideoToCategoryCall);
export default router;