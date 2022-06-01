const loginForm = document.querySelector("#login-form")

async function logIn(event) {
    event.preventDefault()
    const inputs = event.target.elements;
    let messagge = "Usuario o contraseña incorectos";
    
    const userName = inputs["userName"].value;
    const password = inputs["password"].value;
    const p        = document.querySelector("p")

    callAPI(url+"users?user_name="+userName, "GET", {})
    .then( user => {
        if(user[0].user_name === userName){
            if(user[0].password === password){
                localStorage.setItem("id", user[0].id);
                localStorage.setItem("userName", user[0].user_name);
                window.location.replace(window.location.origin);
            }else{
                p.textContent=messagge;
            }
        }else{
            p.textContent=messagge;
        }
    })
    .catch(function () {
        p.textContent=messagge;
    });
}

loginForm.addEventListener("submit", logIn)