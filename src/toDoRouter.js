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

router.post("/checkUser", (req, res) => {
    let user_login = req.body;

    let result = toDoService.checkUserPass(user_login.username, user_login.password);

    res.json(result);

});

router.post("/duplicateUsername", (req, res) => {
    let username = req.body.username;

    let result = toDoService.checkUserAvailable(username);

    res.json(result);

});

router.post("/duplicateEmail", (req, res) => {
    let email = req.body.email;

    let result = toDoService.checkEmailAvailable(email);

    res.json(result);

});

router.post("/newUser", (req, res) => {
    let userAux = req.body;

    let user = {
        username: userAux.username,
        email: userAux.email,
        password: userAux.password,
        badge: [],
        profile_photo: "default.png",
        tasks: []
    }

    let result = toDoService.addUser(user);

    res.json(result);

});

router.get("/register", (req, res) => {
    res.render("registerForm");

});






export default router;