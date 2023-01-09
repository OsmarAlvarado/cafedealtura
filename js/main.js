// DECLARACION VARIABLES



const allCoffes = document.querySelector("#bags");//.products

const carList = document.querySelector(".card-items"); //card-items
const priceTotal = document.querySelector('.price-total')
const amountProduct = document.querySelector('.count-product');
const btnEmptyCar = document.getElementById("empty-cart");


let buyCoffe = JSON.parse(localStorage.getItem('car')) || [];
let totalCoffes = 0;
let countCoffes = 0;

//--HACER EL LOCAL STORAGE

loadEventListenrs()

function loadEventListenrs() {
    //agregar carrito
    allCoffes.addEventListener('click', addCoffes);

    // Cuando se elimina una compra del carrito
    carList.addEventListener('click', deleteCoffes);

    // Vaciar el carrito
    btnEmptyCar.addEventListener("click", emptyCart);
}

function addCoffes(e) {
    e.preventDefault();
    // Delegation para enviar al carrito
    if (e.target.classList.contains("Add")) {
        const coffe = e.target.parentElement;
        readDataCoffe(coffe);
    }
}

function deleteCoffes(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyCoffe.forEach(value => {
            if (value.id === deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCoffes = totalCoffes - priceReduce;
                totalCoffes = totalCoffes.toFixed(2);
            }
        });
        buyCoffe = buyCoffe.filter(product => product.id !== deleteId);

        countCoffes--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyCoffe.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
    saveLocal();
}

function readDataCoffe(product) {
    const infoCoffes = {
        image: product.querySelector('img').src,
        title: product.querySelector('.country').textContent,
        price: product.querySelector('.price').textContent,
        id: product.querySelector('.Add').getAttribute('data-id'),
        amount: 1
    }

    totalCoffes = parseFloat(totalCoffes) + parseFloat(infoCoffes.price);
    totalCoffes = totalCoffes.toFixed(2);

    const exist = buyCoffe.some(product => product.id === infoCoffes.id);
    if (exist) {
        const pro = buyCoffe.map(product => {
            if (product.id === infoCoffes.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyCoffe = [...pro];
    } else {
        buyCoffe = [...buyCoffe, infoCoffes]
        countCoffes++;
    }
    loadHtml();
    saveLocal()
}

function loadHtml() {
    clearHtml();
    buyCoffe.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" width="60px"alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        carList.appendChild(row);

        priceTotal.innerHTML = totalCoffes;

        amountProduct.innerHTML = countCoffes;
        saveLocal()
    });
}
function clearHtml() {
    carList.innerHTML = '';
}

function emptyCart(e) {
    e.preventDefault

    // Forma mas rapida y recomendada
    while (carList.firstChild) {
        carList.removeChild(carList.firstChild);
        saveLocal()
    }

    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
    localStorage.removeItem("product");

    return false;

}

const saveLocal=()=>{
    localStorage.setItem('car', JSON.stringify(buyCoffe))
}





// function loadEventListener() {
//     //agregar carrito
//     coffes.addEventListener("click", addCoffe);

//     // Cuando se elimina una compra del carrito
//     carList.addEventListener("click", eraseCoffe);

//     // Vaciar el carrito
//     btnEmptyCar.addEventListener("click", emptyCart);

//     // AL cargar el documento, mostrar el localStorage
//     document.addEventListener("DOMContentLoaded", loadLocalStorage);
// }

// //FUNCIONES



// // Eliminar un producto del carrito en el DOM
// function eraseCoffe(e) {
//     e.preventDefault();

//     let coffe;

//     if (e.target.classList.contains("erase-coffe")) {

//         coffe = e.target.parentElement.parentElement;
//         e.target.parentElement.parentElement.remove();

//         const coffeId = e.target.getAttribute("data-id");

//         buyCoffe.forEach(value => {
//             if (value.id == coffeId) {
//                 let reduce = parseFloat(value.price) * parseFloat(value.amount)
//                 totalBags = totalBags - reduce
//                 totalBags = totalBags.toFixed(2);
//             }
//         });
//         buyCoffe = buyCoffe.filter(coffe => coffe.id !== coffeId);

//         countProduct--;
//     }

//     //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
//     if (buyCoffe.length === 0) {
//         priceTotal.innerHTML = 0;
//         amountProduct.innerHTML = 0;
//     }
//     insertCar(infCoffe);
// }



// // Función para leer los datos del producto
// function readDataCoffe(coffe) {
//     const infCoffe = {
//         image: coffe.querySelector("img").src,
//         title: coffe.querySelector(".country").textContent,
//         price: coffe.querySelector(".price").textContent,
//         id: coffe.querySelector("a").getAttribute("data-id"),
//         amount: 1
//     }

//     totalCoffes = parseFloat(totalCoffes) + parseFloat(infCoffe.price);
//     totalCoffes = totalCoffes.toFixed(2)

//     const exist = buyCoffe.some(coffe => coffe.id === infCoffe.id);
//     if (exist) {
//         const prodCoffe = buyCoffe.map(coffe => {
//             if (coffe.id === infCoffe.id) {
//                 coffe.amount++;
//                 return coffe;
//             } else {
//                 return coffe
//             }
//         })
//         buyCoffe = [...prodCoffe];

//     } else {
//         buyCoffe = [...buyCoffe, infCoffe]
//         countProduct++;
//     }

//     insertCar(infCoffe);
// }

// // Muestra el producto seleccionado en el carrito
// function insertCar(coffe) {
//     //clearHtml();
//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>
//             <img src="${coffe.image}" width="80">
//         </td>
//         <td>${coffe.title}</td>
//         <td>${coffe.price}</td>
//         <td> Amount:${coffe.amount}</td>
//         <td>
//             <a href="#" class="erase-coffe" data-id="${coffe.id}">X</a>
//         </td>
//     `;

//     carList.appendChild(row);
//     priceTotal.innerHTML = totalCoffes;
//     amountProduct.innerHTML = countProduct;
//     saveLocalStorage(coffe);
// }

// // function clearHtml() {
// //     carList.innerHTML = '';
// // }


// // Vaciar el carrito de compras
// function emptyCart(e) {
//     e.preventDefault

//     // Forma lenta
//     //carList.innerHTML = "";

//     // Forma mas rapida y recomendada
//     while (carList.firstChild) {
//         carList.removeChild(carList.firstChild);
//     }

//     localStorage.removeItem("coffes");
//     return false;
// }

// // Almacena productos en el carrito al localStorage
// function saveLocalStorage(coffe) {
//     // Tomar el valor del localStorage
//      let coffes = getCoffesLocalStorage();
//      // El producto seleccionado se agrega al arreglo
//      coffes.push(coffe);
//      localStorage.setItem("coffes", JSON.stringify(coffes));

// }

// // Obtener los productos al localStorage
// function getCoffesLocalStorage() {
//     let coffesLS;

//     // Comprobamos si hay algo el en localStorage
//     if (localStorage.getItem("coffes") === null) {
//         coffesLS = [];
//     } else {
//         coffesLS = JSON.parse(localStorage.getItem("coffes"));
//     }

//     return coffesLS;
// }

// // Funcion que imprime los productos del localStorage en el carrito
// function loadLocalStorage() {
//     let coffesLS = getCoffesLocalStorage();
//     coffesLS.forEach(coffe => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>
//                 <img src="${coffe.image}" width="80">
//             </td>
//             <td>${coffe.title}</td>
//             <td>${coffe.price}</td>
//             <td> Amount:${coffe.amount}</td>
//             <td>
//                 <a href="#" class="erase-coffe" data-id="${coffe.id}">X</a>
//             </td>
//         `;

//         carList.appendChild(row);
//     });
// }

// // Elimina el producto por el ID del localStorage
// function eraseCoffeLocalStorage(coffeId) {
//     let coffesLS;
//     coffesLS = getCoffesLocalStorage();
//     coffesLS.forEach((coffe, index) => {
//         if (coffeId === coffe.id) {
//             coffesLS.splice(index, 1);
//         }
//     });

//     localStorage.setItem("coffes", JSON.stringify(coffesLS));
// }

//ACCORDION

const btnCollapsed1 = document.querySelector(".collapsed1")
const text1 = document.querySelector(".txtOne")

const btnCollapsed2 = document.querySelector(".collapsed2")
const text2 = document.querySelector(".txtTwo")

const btnCollapsed3 = document.querySelector(".collapsed3")
const text3 = document.querySelector(".txtThree")

//const flushH3 = document.querySelectorAll('.drop-down')
//const article = document.querySelector('#section4 div')


btnCollapsed1.onclick = () => {

    if (text1.style.display === "block") {
        text1.style.display = "none"

    } else {
        text1.style.display = "block"
    }

}

btnCollapsed2.onclick = () => {

    if (text2.style.display === "none") {
        text2.style.display = "block"
    } else {
        text2.style.display = "none"
    }

}

btnCollapsed3.onclick = () => {

    if (text3.style.display === "none") {
        text3.style.display = "block"
    } else {
        text3.style.display = "none"
    }

}

//VAMOS CON EL FORMULARIO

const form = document.querySelector('.form');
const inputName = document.querySelector('.name input');


const btnEnviar = document.getElementById('enviarForm');


const formValidation = (e) => {
    e.preventDefault()
    if (inputName.value === '') {
        alert('[ERROR]Introduce tu nombre.');
        inputName.focus();
        return false;
    }
    if (inputName.value.length < 6) {
        alert('[ERROR] El nombre tiene que tener mas de 6 caracteres');
        inputName.focus();
        return false;
    }

    const inputEmail = document.querySelector('.email input');
    if (inputEmail.value === "") {
        alert("Por favor, escribe tu correo electrónico");
        inputEmail.focus();
        return false;
    }

    if (!inputEmail.value.includes('@')) {
        alert('ERROR: colocar el @')
        inputEmail.focus()
        return
    }

    if (!inputEmail.value.includes('.')) {
        alert('ERROR: colocar el punto(.)')
        inputEmail.focus()
        return
    }

    const inputPhone = document.querySelector('.phonebox input')
    if (inputPhone.value === "") {
        alert("Por favor, escribe tu numero de telefono");
        inputPhone.focus();
        return false;
    }


    if (!(/^\d{9}$/.test(inputPhone.value))) {
        alert('ERROR, coloclar 9 cifras numericas consecutivas')
        inputPhone.focus();
        return false;
    }

    const inputArea = document.querySelector('#textarea').value;
    if (inputArea == null || inputArea.length == 0 || /^\s+$/.test(inputArea)) {
        alert('colocar mas de 0 caracteres');
        return false;
    }

    const inputCheckBox = document.querySelector('.checkBoxForm input');
    if (!inputCheckBox.checked) {
        alert('[ERROR], aceptar haber leido nuestras politicas y términos');
        inputCheckBox.focus();
        return false;
    }

    return true;
}

//form.addEventListener('submit', formValidation)