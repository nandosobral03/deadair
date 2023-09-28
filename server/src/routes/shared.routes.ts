import { jwtMiddleware, jwtMiddlewareOptional } from "../middleware/jwt.middleware";

import { Router } from "express";
import c from "../controllers/shared.controller";

const router = Router();


router.get("/:channelId", jwtMiddleware, c.getSharedUsersForChannelCall);
router.post("/:channelId", jwtMiddleware, c.joinSharedChannelCall);
router.delete("/:channelId", jwtMiddleware, c.leaveSharedChannelCall);
router.delete("/:channelId/:userId", jwtMiddleware, c.removeUserFromSharedChannelCall);



export default router;