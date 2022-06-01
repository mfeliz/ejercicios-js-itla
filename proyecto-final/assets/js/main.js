const url = "http://localhost:3200/";

function validateSession(){
    if(localStorage.getItem("id") === null){
        window.location.replace(window.location.origin+"/login");
    }else{
        let userId = localStorage.getItem("id");
        let userName = localStorage.getItem("userName");
        var $userRegistration = $('#registrationUserName');
        $userRegistration.append("<strong class='d-block text-primary font-size-14 font-weight-medium'>Hola, "+userName+"</strong>");
    }
}

function logout(){
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    window.location.reload();
}

function getParam(param) {
    const params = new URLSearchParams(window.location.search)
    return params.get(param)
}

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