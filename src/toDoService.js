const tasks = new Map();
let nextId = 0;

export function addTask(task) {
    let id = nextId++;
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
