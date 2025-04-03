import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";
import dotEnv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

//resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
dotEnv.config();
const db = process.env.mongoose_uri;

mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb is connected successfully");
  })
  .catch((err) => {
    console.log("there is an error:", err);
  });

app.use("/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/build")));
//render frontend for any path
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.listen(port, (err) => {
  if (!err) {
    console.log(`server is created and running at http://localhost:${port}`);
  } else {
    console.log("there is an error", err);
  }
});
