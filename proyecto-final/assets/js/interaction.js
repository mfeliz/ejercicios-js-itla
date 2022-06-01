const interactionForm = document.querySelector("#interaction-form")

function loadInteraction(id) {
    callAPI(url+"interactions/"+id, "GET", {})
        .then( interaction => {
            interactionForm.elements["id"].value        = interaction.id
            interactionForm.elements["note"].value      = interaction.note
            interactionForm.elements["userId"].value    = interaction.user
            interactionForm.elements["customer"].value  = interaction.customer
            //interactionForm.elements["customer_representative"].value  = interaction.customer_representative
        })
}

function saveInteraction(event) {
    event.preventDefault()
    var today = new Date();
    
    // 1. obtener datos del formulario
    const inputs = event.target.elements;
    let method  = "";
    let catPath = "interactions/";
    let interaction = {}
    let messagge = "Nota no debe estar en blanco";

    interaction = {
        id:         inputs["id"].value,
        note:       inputs["note"].value,
        createdAt:  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        user:       parseInt(localStorage.getItem("id")),
        customer:   parseInt(interactionForm.elements["customer"].value),
        customer_representative: interactionForm.elements["customer"].options[interactionForm.elements["customer"].selectedIndex].text
    }

    if(interaction.id === ""){
        method = "POST"
    }else{
        method = "PUT"
        catPath = catPath + interaction.id
    }

    // 2. Guardamos
    callAPI(url+catPath, method, interaction)
    .then(interaction => {
        window.location.reload();
    })
}

function deleteInteraction(id) {
    if (confirm("Estas seguro que deseas borrar este registro?")){
        callAPI(url+"interactions/"+id, "DELETE", {})
        window.location.reload();
    }
}

async function loadList(event) {
  const list = await fetch(url + "interactions")
    .then( response => response.json());

    callAPI(url+"customers/", "GET", {})
    .then( customer => {
        customer.forEach(element => {
            var $select = $('#customer');
            $select.append('<option value='+ element.id +'>' + element.name + '</option>');
        });
  })
  renderizarListadoPost(list)
}

function renderizarListadoPost(list) {
    const elementoList = document.querySelector("#list")
    list.forEach(interaction => {
        const elemtTr = document.createElement("tr")

        const tdId          = document.createElement("td")
        const tdNote        = document.createElement("td")
        const tdCreateAt    = document.createElement("td")
        const tdUser        = document.createElement("td")
        const tdCustomer    = document.createElement("td")
        const tdCustomerRep = document.createElement("td")

        const tdAction1     = document.createElement("td")
        const tdAction2     = document.createElement("td")
        
        const hrefDelete    = document.createElement("a");
        const hrefEdit      = document.createElement("a");
        const iActionDelete = document.createElement("i");
        const iActionEdit   = document.createElement("i");

        //hrefDelete.className= "btn btn-default btn-circle btn-sm btn-outline-danger";
        hrefDelete.className= "cancel-table-button";

        // hrefEdit.className  = "btn btn-default btn-circle btn-sm btn-outline-primary";
        hrefEdit.className  = "edit-table-button";

        hrefEdit.setAttribute("onclick", "loadInteraction("+interaction.id+")");
        hrefDelete.setAttribute("onclick", "deleteInteraction("+interaction.id+")");

        iActionDelete.classList.add("fas");
        iActionDelete.classList.add("fa-trash")

        /*iActionEdit.classList.add("fad");
        iActionEdit.classList.add("fa-file-pen")*/
        iActionEdit.className = "fas fa-edit";
        
        hrefDelete.appendChild(iActionDelete);
        hrefEdit.appendChild(iActionEdit);
        //elemtPost.classList.add("interaction")

        tdId.textContent          = interaction.id;
        tdNote.textContent        = interaction.note;
        tdCreateAt.textContent    = interaction.createdAt;
        tdUser.textContent        = interaction.user
        tdCustomer.textContent    = interaction.customer;
        tdCustomerRep.textContent = interaction.customer_representative;

        elementoList.appendChild(elemtTr)

        elemtTr.appendChild(tdId)
        elemtTr.appendChild(tdCustomer)
        elemtTr.appendChild(tdCustomerRep)
        elemtTr.appendChild(tdNote)
        elemtTr.appendChild(tdCreateAt)
        elemtTr.appendChild(tdUser)
        
        elemtTr.appendChild(tdAction1)
        elemtTr.appendChild(tdAction2)
        tdAction1.appendChild(hrefDelete);
        tdAction2.appendChild(hrefEdit);
    });
}

window.addEventListener("load", loadList)

// 3. Agregar evento al formulario
interactionForm.addEventListener("submit", saveInteraction)