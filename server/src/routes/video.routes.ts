import { Router } from "express";
import c from "../controllers/video.controller";
import { jwtMiddleware, jwtMiddlewareOptional } from "../middleware/jwt.middleware";

const router = Router();

router.get("/", jwtMiddlewareOptional, c.getVideosCall);
router.get("/:id", jwtMiddlewareOptional, c.getVideoCall);
router.post("/", jwtMiddleware, c.addVideoCall);
router.put("/:id/channel/:channelId", jwtMiddleware, c.addVideoToChannelCall);
router.delete("/:id/channel/:channelId", jwtMiddleware, c.removeVideoFromChannelCall);
export default router;