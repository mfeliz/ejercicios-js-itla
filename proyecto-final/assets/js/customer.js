const customerForm = document.querySelector("#customer-form")

function loadCustomer(id) {
    
    callAPI(url+"customers/"+id, "GET", {})
        .then( customer => {
            customerForm.elements["id"].value       = customer.id
            customerForm.elements["name"].value     = customer.name
            customerForm.elements["email"].value    = customer.email
            customerForm.elements["address"].value  = customer.address
        })
}

function saveCustomer(event) {
    event.preventDefault()
    var today = new Date();
    
    // 1. obtener datos del formulario
    const inputs = event.target.elements;
    let method  = "";
    let catPath = "customers/";
    let customer = {}
    let messagge = "Contraña no debe estar en blanco";

    customer = {
        id:         inputs["id"].value,
        name:       inputs["name"].value,
        email:      inputs["email"].value,
        address:    inputs["address"].value,
        createdAt:  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    }

    if(customer.id === ""){
        method = "POST"
    }else{
        method = "PUT"
        catPath = catPath + customer.id
    }
    // 2. Guardamos
    callAPI(url+catPath, method, customer)
    .then(customer => {
        window.location.reload();
    })
}

function deleteCustomer(id) {
    if (confirm("Estas seguro que deseas borrar este registro?")){
        callAPI(url+"customers/"+id, "DELETE", {})
        window.location.reload();
    }
}

async function loadList(event) {
    const list = await fetch(url+"customers")
    .then( response => response.json());
    renderizarListadoPost(list)
}

function renderizarListadoPost(list) {
    const elementoList = document.querySelector("#list")
    list.forEach(customer => {
        const elemtTr = document.createElement("tr")
        const tdId = document.createElement("td")
        const tdName = document.createElement("td")
        const tdEmail = document.createElement("td")
        const tdAddress = document.createElement("td")
        const tdCreateAt = document.createElement("td")
        const tdAction1 = document.createElement("td")
        const tdAction2 = document.createElement("td")
        
        const hrefDelete    = document.createElement("a");
        const hrefEdit      = document.createElement("a");
        const iActionDelete = document.createElement("i");
        const iActionEdit   = document.createElement("i");
        /*hrefDelete.className= "btn btn-default btn-circle btn-sm btn-outline-danger";
        hrefEdit.className  = "btn btn-default btn-circle btn-sm btn-outline-primary";*/
        hrefDelete.className= "cancel-table-button";
        hrefEdit.className  = "edit-table-button";
        hrefEdit.setAttribute("onclick", "loadCustomer("+customer.id+")");
        hrefDelete.setAttribute("onclick", "deleteCustomer("+customer.id+")");

        iActionDelete.classList.add("fas");
        iActionDelete.classList.add("fa-trash")

        iActionEdit.classList.add("fas");
        iActionEdit.classList.add("fa-user-edit")

        hrefDelete.appendChild(iActionDelete);
        hrefEdit.appendChild(iActionEdit);
        //elemtPost.classList.add("customer")
        tdId.textContent = customer.id;
        tdName.textContent = customer.name;
        tdEmail.textContent = customer.email;
        tdCreateAt.textContent = customer.createdAt;
        tdAddress.textContent = customer.address;
        elementoList.appendChild(elemtTr)
        elemtTr.appendChild(tdId)
        elemtTr.appendChild(tdName)
        elemtTr.appendChild(tdEmail)
        elemtTr.appendChild(tdAddress)
        elemtTr.appendChild(tdCreateAt)
        elemtTr.appendChild(tdAction1)
        elemtTr.appendChild(tdAction2)
        tdAction1.appendChild(hrefDelete);
        tdAction2.appendChild(hrefEdit);
    });
}

window.addEventListener("load", loadList)

// 3. Agregar evento al formulario
customerForm.addEventListener("submit", saveCustomer)