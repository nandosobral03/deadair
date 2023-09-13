import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import videoRoutes from "./routes/video.routes";
import channelRoutes from "./routes/channel.routes";
import scheduleRoutes from "./routes/schedule.routes";
import adminRoutes from "./routes/admin.routes";
import utilRoutes from "./routes/util.routes";
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
app.listen(port, () => {
    console.log(`Dead Air is live at  :${port}`);
});

