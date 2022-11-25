// VARIABLES
const smallCar = document.getElementById("smallCar");
const sectionAdd = document.querySelector("#section3");
const carList = document.querySelector("#carList tbody");
console.log(carList);
const btnEmptyCar = document.getElementById("empty-cart");
//console.log(sectionAdd);


//--HACER EL LOCAL STORAGE

loadEventListener();

function loadEventListener() {
    // Dispara cuando se presiona agregar carrito
    sectionAdd.addEventListener("click", buyCoffe);

    // Cuando se elimina una compra del carrito
    smallCar.addEventListener("click", eraseCoffe);

    // Vaciar el carrito
    btnEmptyCar.addEventListener("click", emptyCart);

    // AL cargar el documento, mostrar el localStorage
    document.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//FUNCIONES

// Función que añade la compra del cafe al carrito
function buyCoffe(e) {
    e.preventDefault();
    // Delegation para enviar al carrito
    if (e.target.classList.contains("Add")) {
        const coffe = e.target.parentElement.parentElement;
        readDataCoffe(coffe);
    }
}

// Función para leer los datos del producto
function readDataCoffe(coffe) {
    const infCoffe = {
        image: coffe.querySelector("img").src,
        title: coffe.querySelector("a").textContent,
        price: coffe.querySelector(".price").textContent,
        id: coffe.querySelector(".Add").getAttribute("data-id")
    }

    insertCar(infCoffe);
}

// Muestra el curso seleccionado en el carrito
function insertCar(coffe) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${coffe.image}" width="80">
        </td>
        <td>${coffe.title}</td>
        <td>${coffe.price}</td>
        <td>
            <a href="#" class="erase-coffe" data-id="${coffe.id}">X</a>
        </td>
    `;

    carList.appendChild(row);
    saveLocalStorage(coffe);
}

// Eliminar un producto del carrito en el DOM
function eraseCoffe(e) {
    e.preventDefault();

    let coffe;
    let coffeId;

    if (e.target.classList.contains("erase-coffe")) {
        coffe = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();
        coffeId = coffe.querySelector(".Add").getAttribute("data-id");
    }

    eraseCoffeLocalStorage(coffeId);
}

// Vaciar el carrito de compras
function emptyCart(e) {
    e.preventDefault

    // Forma lenta
    //carList.innerHTML = "";

    // Forma mas rapida y recomendada
    while (carList.firstChild) {
        carList.removeChild(carList.firstChild);
    }

    localStorage.removeItem("sectionAdd");
    return false;
}





//console.log(addCoffe);