import { Router } from "express";
import c from "../controllers/channel.controller";
import { jwtMiddleware, jwtMiddlewareOptional } from "../middleware/jwt.middleware";

const router = Router();

router.get("/", jwtMiddlewareOptional, c.getChannelsCall);
router.post("/", jwtMiddleware, c.addChannelCall);
router.delete("/:id", jwtMiddleware, c.deleteChannelCall);
router.put("/:id", jwtMiddleware, c.updateChannelCall);
router.get("/:id", jwtMiddlewareOptional, c.getChannelCall);


router.get("/station/:channelNumber", jwtMiddlewareOptional, c.getChannelByChannelNumberCall);


export default router;