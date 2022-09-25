import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

import db from "./database";

// Configure NodeJS App Environment Variables
dotenv.config({ path: ".env" });

// Create Api Express Server Instance
const app: Application = express();

// Api Server Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

// Listen To Api Express Server
const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);

  // Connect To  DB
  db;
});

export default app;
