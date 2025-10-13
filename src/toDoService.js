const users = new Map();
let nextIdUsers = 0;

const tasks = new Map();
let nextIdTasks = 0;

export function addUser(user){
    let id = nextIdUsers++;
    user.id = id.toString();
    user.set(user.id, user);
}

export function checkUserPass(username, password) {
    for (let user of users.values()) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
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
