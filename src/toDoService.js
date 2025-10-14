import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = getUsersPath();

let users = loadDataFromDisk();


let tasks = new Map();
let nextIdTasks = 0;



export function addUser(user){
    users.set(user.username, user);
    saveDataToDisk();
    return user;
}

export function getUser(username) {
    return users.get(username);
}

export function deleteUser(username){
    users.delete(username);
    saveDataToDisk();
}

export function checkUserAvailable(username) {
    return !users.has(username);
}

export function checkEmailAvailable(email) {
    let result = true;
    for (let user of users.values()) {
        if (user.email === email) {
            result = false;
            break;
        }
    }
    return result;
}

export function checkUserPass(username, password) {
    let user = getUser(username);
    return user && user.password === password;
}

export function addTask(task) {
    let id = nextIdTasks++;
    task.id = id.toString();
    task.completed = false;
    tasks.set(task.id, task);
}

export function deleteTask(id) {
    let task = getTask(id);
    tasks.delete(id);
    return task;
}

export function getTasks() {
    return [...tasks.values()];
}
export function getTask(id) {
    return tasks.get(id);
}


export function saveDataToDisk() {
    const usersObj = Object.fromEntries(users); // convierte el Map en objeto
    const jsonData = JSON.stringify(usersObj, null, 4);
    fs.writeFileSync(getUsersPath(), jsonData, "utf8");
}

function getUsersPath() {
    const isDev = process.env.NODE_ENV === 'development' || process.defaultApp || !process.resourcesPath;
    const devPath = path.join(__dirname, 'users.json');

    if (isDev) return devPath;

    return path.join(process.resourcesPath, 'app', 'src', 'users.json');
}



export function loadDataFromDisk() {
    let data = fs.readFileSync(getUsersPath(), 'utf-8');
    let usersObj = JSON.parse(data);
    return new Map(Object.entries(usersObj));
}


