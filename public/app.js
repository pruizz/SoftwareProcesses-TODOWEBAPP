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
        window.location.href = '/';
    }
}