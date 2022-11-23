// VARIABLES
const smallCar = document.getElementById("smallCar");
const sectionAdd = document.getElementById("section3");
const carList = document.querySelector("#carList tbody");
const btnEmptyCar = document.getElementById("empty-cart");
//console.log(sectionAdd);


//--HACER EL LOCAL STORAGE

loadEventListener();

function loadEventListener() {
    // Dispara cuando se presiona agregar carrito
    sectionAdd.addEventListener("click", buyCoffe);

    // Cuando se elimina un curso del carrito
    smallCar.addEventListener("click", eraseCoffe);

    // Vaciar el carrito
    btnEmptyCar.addEventListener("click", emptyCart);

    // AL cargar el documento, mostrar el localStorage
    document.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//FUNCIONES

// Función que añade el curso al carrito
function buyCoffe(e) {
    e.preventDefault();
    // Delegation para enviar al carrito
    if (e.target.classList.contains("up-car")) {
        const coffe = e.target.parentElement.parentElement;
        readDataCoffe(coffe);
    }
}

let buyStorage = []

if (localStorage.getItem('notes')) {  //-- si recibe informacion del carrito
    noteStorage = JSON.parse(localStorage.getItem('notes'))  // transforma la nota almacenada en un objeto
} else {  // SI NO RECIBE NADA LA INPUT
    noteStorage = []
}

addCoffe.addEventListener('submit', e => {

    e.preventDefault() //cancela y se mantiene
    noteStorage.push(inputNote.value) //--para que se vaya agregando notas a la lista
    localStorage.setItem('notes', JSON.stringify(noteStorage)) // con el stringify hara que el valor se convierta en una cadena JSON
    listBuilder(inputNote.value) //
    inputNote.value = ''
})





//console.log(addCoffe);