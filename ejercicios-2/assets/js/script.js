const formulario = document.querySelector("#form-user");

//function updateUser(event, user)

function callAPI(url,method, data) {
    let configuracion = {};
    const header = {
        'Content-Type': 'application/json'
    }
    
    if (method === "GET") {
        configuracion = {
            method: method,
            headers: header
        }
    
    } else {
        configuracion = {
            method: method,
            body: JSON.stringify(data),
            headers: header
        }
    }

    return fetch(url, configuracion)
    .then(response => {
        return response.json()
    })
}

function createUser(event){
    event.preventDefault();

    const inputs = event.target.elements;
    const methodType = "GET";

    //const id = inputs["id"].value;

    const user = {
        id: inputs["id"].value,
        name: inputs["name"].value,
        userName: inputs["userName"].value,
        password: inputs["password"].value,
    }

    if (user.id == null){
        methodType = "PUT"
    }else{
        methodType = "POST"
    }
    
    const confi = {
        method: methodType,
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const url = "http://localhost:3200/users/"+user.id;

    fetch(url, confi).then(response => response.json()).then(user => console.log(user))
}

formulario.addEventListener("submit", createUser);