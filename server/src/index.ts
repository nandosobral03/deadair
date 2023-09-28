import adminRoutes from "./routes/admin.routes";
import channelRoutes from "./routes/channel.routes";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import express from "express";
import { jwtMiddleware } from "./middleware/jwt.middleware";
import scheduleRoutes from "./routes/schedule.routes";
import sharedRoutes from "./routes/shared.routes";
import userRoutes from "./routes/user.routes";
import utilRoutes from "./routes/util.routes";
import videoRoutes from "./routes/video.routes";

const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/api/videos", videoRoutes, errorMiddleware)
app.use("/api/channels", channelRoutes, errorMiddleware)
app.use("/api/schedule", scheduleRoutes, errorMiddleware)
app.use("/api/admin", adminRoutes, errorMiddleware)
app.use("/api/utils", utilRoutes, errorMiddleware)
app.use("/api/shared", sharedRoutes, errorMiddleware)
app.use("/api", userRoutes, errorMiddleware)
app.listen(port, () => {
    console.log(`Dead Air is live at  :${port}`);
});

