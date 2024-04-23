let UIdata = document.getElementById('data');
let form = document.getElementById('form');
let name = document.getElementById('name');
let btn = document.getElementById('btn');
let success = document.getElementById('success');
let error = document.getElementById('error');

// Edit modal

let editModal = document.getElementById('editModal')
let closeModal = document.querySelector('.modal__close')
let editModalForm = document.querySelector('.edit__todo__form form')
let editInput = document.getElementById('editInput')
let successEdit = document.getElementById('success__edit')
let errorEdit = document.getElementById('error__edit')



let data = [];

form.addEventListener('submit', function (event){
    event.preventDefault();
    console.log('working...');

    checkInputs();
})

editModalForm.addEventListener('submit', function (event){
    event.preventDefault();
    const todoId = +editInput.dataset.todoId;

    if(editInput.value == "") {
        errorEdit.innerHTML = "Please enter data"
        successEdit.innerHTML = "";
        return;
    }
    else{
        errorEdit.innerHTML = "";
        successEdit.innerHTML = "Data has been successfully entered"
        updateEditData(editInput.value, todoId)
    }
})

function updateEditData(editInp, id){
    let todoIndex = data.findIndex(function (todoId) {
        return todoId.id === id;
    });

    data[todoIndex].name = editInp;
    localStorage.setItem('data', JSON.stringify(data));
    hideModal();
    read();
}


function checkInputs(){
    if(name.value == ""){
        console.log('malumot kiriting');
        error.innerHTML = "Please enter data"
        success.innerHTML = ""
        return;
    }
    else{
        error.innerHTML = "";
        success.innerHTML = "Data has been successfully entered"
    }
    create();
}


function uniqueId (id) {
    if(!id.length){
        return 1;
    }else{
        return data[data.length - 1].id + 1
    }
}

function showModal(name, todoId){
    editInput.value = name;
    editInput.dataset.todoId = todoId;
        editModal.style.display = "flex"
}

function hideModal(){
        editModal.style.display = "none"
}

closeModal.addEventListener("click", function(){
    hideModal();
})

function editData(id){
    let idx = data.find(function (id2) {
        return id2.id === id;
    });
    
    showModal(idx.name, id);
}


function create (){
    data.push(
        {
            id: uniqueId(data),
            name: name.value,
        }
    )
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
    read();
}

(function () {
    data = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [];
    read();
})();



function deleteData(id){
    let idx = data.findIndex(function (id2) {
        return id2.id === id;
    });
    
    data.splice(idx, 1);
    localStorage.setItem('data', JSON.stringify(data));
    read();
}



function read(){
    UIdata.innerHTML = '';
    data.map((obj, id) => {
        return (
            UIdata.innerHTML += `
            <div class="note">
                <p>${id + 1}</p>
                <h3>${obj.name}</h3>
                <i class="fa-solid fa-pen-to-square" onclick="editData(${obj.id})" style="color: yellow;"></i>
                <i class="fa-solid fa-trash" onclick="deleteData(${obj.id})" style="color: red;"></i>
            </div>
            `
        );
    });
    name.value = "";
};