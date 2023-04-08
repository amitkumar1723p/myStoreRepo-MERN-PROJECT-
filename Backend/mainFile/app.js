import express from "express";

import { join, resolve } from "path";
import connectDb from "../DatabaseConnection/connectdb.js";
import UserRouter from "../Routes/UserRoutes.js";
import AdminAndDbOwnerRoutes from "../Routes/admin and owner Routes.js";
import OwnerRoutes from "../Routes/ownerRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
const app = express();

if (process.env.PRODUCTION !== "true") {
  const envFilepath = join(process.cwd(), "Backend", "Config", ".env");
  dotenv.config({ path: envFilepath });
}

app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

process.on("uncaughtException", (err) => {
  process.exit(1);
});

//  Configuration .env File
if (process.env.PRODUCTION !== "true") {
  app.use(
    cors({
      origin: process.env.FRONTENT_SIDE_URL,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
}

//   Connect Data Base
connectDb();

// responser send to json()
app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/admin/owner", AdminAndDbOwnerRoutes);
app.use("/owner", OwnerRoutes);

app.use(express.static(join(process.cwd(), "frontend", "build")));

app.get("*", function (req, res) {
  res.sendFile(join(process.cwd(), "frontend", "build", "index.html"));
});
//    Server Listen Code .
const port = process.env.PORT;
let server = app.listen(port, () => {
  console.log(port);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
