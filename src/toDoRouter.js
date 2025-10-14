import express from "express";
import multer from "multer";
import fs from "node:fs/promises";

import * as toDoService from "./toDoService.js";
import { create } from "node:domain";

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

router.get("/home", (req,res) => {
  res.render("index",{tasks : toDoService.getTasks()});
})

router.post("/task/add", upload.single("image"),(req,res) => {
    let image = req.file ? req.file.filename : undefined;

    let task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        imageFilename: image,
        completed: false,
        createdAt: new Date()
    }
    toDoService.addTask(task);
    res.redirect("/home");
});

router.post("/tasks/:id/delete", (req,res) => {
    let id = req.params.id;
    toDoService.deleteTask(id);
    res.redirect("/home");
});

router.post("/getUser", (req, res) => {
    let user_login = req.json();

    let result = checkUserPass(user_login.username, user_login.password);

});

router.get("/register", (req, res) => {
    res.render("registerForm");

});






export default router;