import { Router } from "express";
import c from "../controllers/admin.controller";

const router = Router();

router.post("/channel/", c.createPublicChannelCall);
router.delete("/channel/:channelId", c.deletePublicChannelCall);
router.put("/channel:id", c.updatePublicChannelCall);
router.put("/channel/:channelId/schedule", c.putPublicChannelScheduleCall);


export default router;