import { Router } from "express";
import c from "../controllers/channel.controller";
import { jwtMiddleware, jwtMiddlewareOptional } from "../middleware/jwt.middleware";

const router = Router();


router.get("/:channelId", jwtMiddlewareOptional, c.getChannelScheduleCall);
router.put("/:channelId", jwtMiddleware, c.putChannelScheduleCall);
router.delete("/:channelId", jwtMiddleware, c.clearChannelScheduleCall);
router.get("/:channelId/now", jwtMiddlewareOptional, c.getCurrentVideoCall);
router.get("/:channelId/summary", jwtMiddlewareOptional, c.getScheduleSummaryCall);


export default router;