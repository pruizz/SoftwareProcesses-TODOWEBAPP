import express from "express";
import multer from "multer";
import fs from "node:fs/promises";

import * as toDoService from "./toDoService.js";

const UPLOADS_FOLDER = "uploads";
const DEMO_FOLDER = "demo";

const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER });

router.get("/", (req, res) => {
  res.render("login",{tasks: toDoService.getTasks()});
  });

router.get("/newTask", (req, res) => {
  res.render("newTask");
});

router.post("/getUser", (req, res) => {
    let user_login = req.json();

    let result = checkUserPass(user_login.username, user_login.password);

});

router.get("/register", (req, res) => {
    res.render("registerForm");

});

router.post("/task/add",(req,res) => {

  let task = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
  }
  toDoService.addTask(task);
  res.render("index");
})
  


export default router;