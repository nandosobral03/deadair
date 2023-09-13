import { Router } from "express";
import c from "../controllers/channel.controller";

const router = Router();

router.get("/:channelId", c.getChannelScheduleCall);
router.put("/:channelId", c.putChannelScheduleCall);
router.delete("/:channelId", c.clearChannelScheduleCall);
router.get("/:channelId/now", c.getCurrentVideoCall);
router.get("/:channelId/summary", c.getScheduleSummaryCall);


export default router;