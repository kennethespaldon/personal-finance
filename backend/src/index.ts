import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import type { Express } from "express";
import errorHandler from "./middleware/errorHandler.middleware.ts";
import { BASE_PATH } from "./utils/apiPaths.ts";
import apiRoutes from "./routes/index.ts";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(BASE_PATH, apiRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const server: http.Server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.error(`Server failed: ${error}`);
});

export default app;