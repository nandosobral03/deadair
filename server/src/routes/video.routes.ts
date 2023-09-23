import { Router } from "express";
import c from "../controllers/video.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = Router();

router.get("/", c.getVideosCall);
router.get("/:id", c.getVideoCall);
router.post("/", jwtMiddleware, c.addVideoCall);
router.put("/:id/channel/:channelId", jwtMiddleware, c.addVideoToChannelCall);
export default router;