import { Router } from "express";
import c from "../controllers/channel.controller";

const router = Router();

// router.get("/:id", c.getChannelScheduleCall);
router.get("/", c.getChannelsCall);
router.post("/", c.addChannelCall);
router.delete("/:id", c.deleteChannelCall);
router.put("/:id", c.updateChannelCall);
router.get("/:id", c.getChannelCall);

export default router;