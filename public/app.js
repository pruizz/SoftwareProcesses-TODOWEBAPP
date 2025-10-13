function processTaskData(event) {
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