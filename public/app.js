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

    const response = await fetch("/checkUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username: username,
            password: password
        })
    })

    const result = await response.json();

    if (result){
        alert("Correcto")
    }else{
        alert("Incorrecto")
    }

}

async function checkUsernameAvailability(){
    const username = document.getElementById("usernameR").value
    const response = await fetch("/duplicateUsername", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username: username
        })
    })

    const result = await response.json()
    const feedback = document.getElementById("usernameFeedback")
    const button = document.getElementById("newAccountBt")
    if (!result){
        feedback.innerHTML = "Ese nombre de usuario no está disponible, prueba con otro."
        button.disabled = true;
    }else{
        feedback.innerHTML = ""
        button.disabled = false;
    }
}

async function checkEmailAvailability(){
    const email = document.getElementById("emailR").value
    const response = await fetch("/duplicateEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email: email
        })
    })

    const result = await response.json()
    const feedback = document.getElementById("emailFeedback")
    const button = document.getElementById("newAccountBt")
    if (!result){
        feedback.innerHTML = "Ese email ya ha sido registrado, prueba a iniciar sesión con tu nombre de usuario."
        button.disabled = true;
    }else{
        feedback.innerHTML = ""
        button.disabled = false;
    }
}

function checkSamePassword(){
    const password1 = document.getElementById("passwordR1").value
    const password2 = document.getElementById("passwordR2").value
    const feedback = document.getElementById("passwordFeedback")
    const button = document.getElementById("newAccountBt")

if (password1 !== password2){
    feedback.innerHTML = "Las contraseñas no coinciden."
    button.disabled = true;
}else{
    feedback.innerHTML = ""
    button.disabled = false;
}
}

async function newUser(event){
    event.preventDefault();
    const username = document.getElementById("usernameR").value;
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR2").value;


    const response = await fetch("/newUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })

    const result = await response.json();

    if (result){
        alert("Usuario creado con éxito")
    }

}