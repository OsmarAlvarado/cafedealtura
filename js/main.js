// DECLARACION VARIABLES

axios
    .get(`https://cafe-de-altura-api.vercel.app/api/products`)
    .then(response => {
        const dataProducts = response.data.products;
        console.log(response);
        const indexProducts = dataProducts.slice(0, 4);

        indexProducts.forEach(coffe => {

            let article = document.createElement('article')
            article.classList.add('col')
            let imgBags = document.createElement('img')
            imgBags.classList.add('image-cart')
            let bagName = document.createElement('a')
            bagName.classList.add('country')
            let bagPrice = document.createElement('p')
            bagPrice.classList.add('price')
            let btnAdd = document.createElement('button')
            btnAdd.classList.add('Add')

            article.appendChild(imgBags)
            article.appendChild(bagName)
            article.appendChild(bagPrice)
            article.appendChild(btnAdd)

            imgBags.setAttribute('src', coffe.img_url)
            bagName.innerHTML = `${coffe.brand}`
            bagName.setAttribute('href', '#')
            bagName.setAttribute('style', 'font-family: outfit')
            bagPrice.innerText = `${coffe.price},00 €`
            bagPrice.setAttribute('style', 'font-family: outfit')
            btnAdd.innerHTML = `Añadir`
            btnAdd.setAttribute('style', 'font-family: outfit')
            btnAdd.setAttribute('href', '#')
            btnAdd.setAttribute('data-id', coffe._id)

            document.querySelector('#bags').appendChild(article)

            btnAdd.addEventListener("click", () => {

                const repeat = carCoffe.some((repeatCoffe) => repeatCoffe.id === coffe._id)//buscamos un producto que este repetido

                if (repeat) {//si es true
                    carCoffe.map((anyProduct) => {
                        if (anyProduct.id === coffe._id) {
                            anyProduct.quanty++;
                        };
                    });
                } else {
                    carCoffe.push({
                        img: coffe.img_url,
                        name: coffe.brand,
                        price: coffe.price,
                        id: coffe._id,
                        quanty: 1
                    });

                    carCounter();
                    saveLocal();
                };
            });
        });

        const carBuy = document.getElementById("carBuy");
        const shopCoffes = document.getElementById("products-id");
        const carList = document.querySelector("#card-items");
        const priceTotal = document.querySelector('.price-total');
        const amountProduct = document.querySelector('.count-product');

        let carCoffe = JSON.parse(localStorage.getItem("cart")) || [];

        const printCart = () => {

            carList.innerHTML = "";
            const carHeader = document.createElement('div')//div1
            carHeader.className = "car-header" //header
            carHeader.innerHTML = `
            <h1 class="header-title">Mi carrito</h1>
            `;
            carList.append(carHeader);//se coloca dentro del div cart products y abajo de botonX

            carCoffe.forEach((product) => {
                const rowCoffe = document.createElement('div');//div2
                rowCoffe.className = "item";
                rowCoffe.innerHTML = `
                <img src="${product.img}">
                <h3>${product.name}</h3>                
                <p class="cart-price">${product.price},00 €</p>
                <span class="rest"> - </span>                
                <p class="quanty"> Unds: ${product.quanty}</p>
                <span class="summation"> + </span>
                <p> Subtotal: ${product.quanty * product.price},00 €</p>
                `
                carList.append(rowCoffe)

                //Funcion restar
                const restUnds = rowCoffe.querySelector(".rest");

                restUnds.addEventListener("click", () => {
                    if (product.quanty !== 1) {
                        product.quanty--;
                    };

                    saveLocal();
                    printCart();
                });

                //funcion sumar
                const addUnds = rowCoffe.querySelector(".summation");

                addUnds.addEventListener("click", () => {
                    product.quanty++;

                    saveLocal();
                    printCart();
                });

                const deleteCoffe = document.createElement("span");
                deleteCoffe.className = "delete-product"
                deleteCoffe.innerText = "X";
                rowCoffe.append(deleteCoffe)

                deleteCoffe.addEventListener("click", coffeDeleted);
            });

            const totalCoffes = carCoffe.reduce((acc, element) => acc + element.price, 0);
            priceTotal.innerHTML = `Total: ${totalCoffes},00 €`;

            shopCoffes.style.display = "block";
        };

        carBuy.addEventListener("mouseover", printCart);

        const coffeDeleted = () => {
            //para buscar en el carrito el elemento con X id
            const idFounded = carCoffe.find((element) => element.id)

            //le asignamos un valor al carrito usando el filter
            carCoffe = carCoffe.filter((carId) => {
                return carId !== idFounded; //retornara un id distinto al de idFounded
            });

            carCounter();
            saveLocal();
            printCart();
        };

        //set item
        const saveLocal = () => {
            localStorage.setItem("cart", JSON.stringify(carCoffe));
        };

        const carCounter = () => {
            amountProduct.style.display = "block"

            const cartNum = carCoffe.length;

            localStorage.setItem("cartNum", JSON.stringify(cartNum));

            amountProduct.innerText = JSON.parse(localStorage.getItem("cartNum"));
        };

        carCounter();

    });


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