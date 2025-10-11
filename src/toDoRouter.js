import express from "express";
import multer from "multer";
import fs from "node:fs/promises";

import * as toDoService from "./toDoService.js";

const UPLOADS_FOLDER = "uploads";
const DEMO_FOLDER = "demo";

const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER });

router.get("/", (req, res) => {
  res.render("index");
  });
  


export default router;