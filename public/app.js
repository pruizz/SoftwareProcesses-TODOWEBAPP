async function processTaskData(event) {
    event.preventDefault();
    const taskForm = document.getElementById('taskForm');
    // Añadir aquí el código para validar los campos
    const formData = new FormData(event.target);
    const response = await fetch('/task/add', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        window.location.href = '/home';
    }
}


async function checkUser(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch("/getUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username: username,
            password: password
        })
    })

}