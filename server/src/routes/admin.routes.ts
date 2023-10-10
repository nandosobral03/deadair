import { Router } from "express";
import c from "../controllers/admin.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = Router();

router.use(jwtMiddleware);
router.post("/channel/", c.createPublicChannelCall);
router.delete("/channel/:channelId", c.deletePublicChannelCall);
router.put("/channel/:channelId", c.updatePublicChannelCall);
router.put("/channel/:channelId/schedule", c.putPublicChannelScheduleCall);
router.put("/video/:videoId/channel/:channelId", c.addVideoToChannelCall);
router.delete("/video/:videoId/channel/:channelId", c.removeVideoFromChannelCall);
router.post("/playlist/:id/channel/:channelId", jwtMiddleware, c.addPlaylistToChannelCall);

export default router;