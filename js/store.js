

axios

    .get(`https://cafe-de-altura-api.vercel.app/api/products`)
    .then(response => {
        const dataProducts = response.data.products
        console.log(dataProducts);

        dataProducts.forEach((coffe) => {

            if (coffe.available === true) {
                let article = document.createElement('article')
                article.className = "col"
                let imgBags = document.createElement('img')
                imgBags.classList.add('image-cart')
                let bagName = document.createElement('a')
                bagName.classList.add('country')
                let bagPrice = document.createElement('p')
                bagPrice.classList.add('price')
                let btnAdd = document.createElement('button')
                btnAdd.classList.add('add')


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
                btnAdd.innerText = `Añadir`
                btnAdd.setAttribute('style', 'font-family: outfit')
                btnAdd.setAttribute('data-id', coffe._id)
                
                document.querySelector('#bags').appendChild(article)

                btnAdd.addEventListener("click", () => {

                    const repeat = carCoffe.some((repeatCoffe) => repeatCoffe.id === coffe._id)//buscamos un producto que este repetido

                    if (repeat) {//si es true
                        carCoffe.map((anyProduct) => {
                            if (anyProduct.id === coffe._id) {
                                anyProduct.quanty++;
                            }
                        })
                    } else {
                        carCoffe.push({
                            img: coffe.img_url,
                            name: coffe.brand,
                            price: coffe.price,
                            id: coffe._id,
                            quanty: 1
                        });
                    };
                    
                    carCounter();
                })

            } else if (coffe.available === false) {

                let article = document.createElement('article')
                article.classList.add('col')
                let imgBags = document.createElement('img')
                imgBags.classList.add('image-block')
                let bagName = document.createElement('a')
                bagName.classList.add('countryBlock')
                let bagPrice = document.createElement('p')
                bagPrice.classList.add('priceBlock')
                let btnAdd = document.createElement('button')
                btnAdd.classList.add('exhausted')

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
                btnAdd.innerText = 'Agotado'
                btnAdd.setAttribute('style', 'font-family: outfit')
                btnAdd.setAttribute('data-id', coffe._id)

                document.querySelector('#bags').appendChild(article)
            }
        })

        const carBuy = document.getElementById("carBuy");
        const shopCoffes = document.getElementById("products-id");
        const carList = document.querySelector("#card-items");
        const priceTotal = document.querySelector('.price-total');
        const amountProduct = document.querySelector('.count-product');

        let carCoffe = [];

        console.log(shopCoffes);
        console.log(carList);
        console.log(carCoffe);

        const printCart = () => {

            carList.innerHTML = "";
            const carHeader = document.createElement('div')//div1
            carHeader.className = "car-header" //header
            carHeader.innerHTML = `
            <h1 class="header-title">Mi carrito</h1>
            `;
            carList.append(carHeader)//se coloca dentro del div cart products y abajo de botonX

            carCoffe.forEach((product) => {
                const rowCoffe = document.createElement('div');//div2
                rowCoffe.className = "item";
                rowCoffe.innerHTML = `
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p class="cart-price">${product.price},00 €</p>
                <p> Unidades: ${product.quanty}</p>
                <p> Subtotal: ${product.quanty * product.price},00 €</p>
                `
                carList.append(rowCoffe)                

                const deleteCoffe = document.createElement("span");
                deleteCoffe.className = "delete-product"
                deleteCoffe.innerText = "X";
                rowCoffe.append(deleteCoffe)

                deleteCoffe.addEventListener("click", coffeDeleted)
            })

            const totalCoffes = carCoffe.reduce((acc, element) => acc + element.price * element.quanty, 0);

            priceTotal.innerHTML = `Total: ${totalCoffes},00 €`;

            shopCoffes.style.display = "block";
        }

        carBuy.addEventListener("mouseover", printCart)

        const coffeDeleted = () => {
            //para buscar en el carrito el elemento con X id
            const idFounded = carCoffe.find((element) => element.id)

            //le asignamos un valor al carrito usando el filter
            carCoffe = carCoffe.filter((carId) => {
                return carId !== idFounded; //retornara un id distinto al de idFounded
            });

            carCounter();
            printCart();
        }

        const carCounter = () => {
            amountProduct.style.display = "block"
            amountProduct.innerText = carCoffe.length
        }


        // const amountProduct = document.querySelector('.count-product');
        // const btnEmptyCar = document.getElementById("empty-cart");


        // let totalCoffes = 0;
        // let countCoffes = 0;

        //--HACER EL LOCAL STORAGE

        //loadEventListenrs()

        // function loadEventListenrs() {
        //     //agregar carrito
        //     allCoffes.addEventListener('click', addCoffes);

        //     // Cuando se elimina una compra del carrito
        //     carList.addEventListener('click', deleteCoffes);

        //     // Vaciar el carrito
        //     btnEmptyCar.addEventListener("click", emptyCart);
        // }

        // function addCoffes(e) {
        //     e.preventDefault();
        //     // Delegation para enviar al carrito
        //     if (e.target.classList.contains("add")) {
        //         const coffe = e.target.parentElement;
        //         readDataCoffe(coffe);
        //         saveLocal();
        //     }
        // }

        // function deleteCoffes(e) {

        //     if (e.target.classList.contains('delete-product')) {
        //         const deleteId = e.target.getAttribute('data-id');

        //         buyCoffe.forEach(value => {
        //             if (value.id === deleteId) {
        //                 let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
        //                 totalCoffes = totalCoffes - priceReduce;
        //                 totalCoffes = totalCoffes.toFixed(2);
        //             }
        //         });
        //         buyCoffe = buyCoffe.filter(product => product.id !== deleteId);

        //         countCoffes--;
        //         saveLocal()
        //     }
        //     //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
        //     if (buyCoffe.length === 0) {
        //         priceTotal.innerHTML = 0;
        //         amountProduct.innerHTML = 0;
        //     }
        //     loadHtml();
        //     saveLocal();
        // }

        // function readDataCoffe(product) {

        //     const infoCoffes = {
        //         image: product.querySelector('img').src,
        //         title: product.querySelector('.country').textContent,
        //         price: product.querySelector('.price').textContent,
        //         id: product.querySelector('.add').getAttribute('data-id'),
        //         amount: 1
        //     }

        //     totalCoffes = parseFloat(totalCoffes) + parseFloat(infoCoffes.price);
        //     totalCoffes = totalCoffes.toFixed(2);

        //     const exist = buyCoffe.some(product => product.id === infoCoffes.id);
        //     if (exist) {
        //         const pro = buyCoffe.map(product => {
        //             if (product.id === infoCoffes.id) {
        //                 product.amount++;
        //                 return product;
        //             } else {
        //                 return product
        //             }
        //         });
        //         buyCoffe = [...pro];
        //     } else {
        //         buyCoffe = [...buyCoffe, infoCoffes]
        //         countCoffes++;

        //     }
        //     loadHtml();
        //     saveLocal()
        // }

        // function loadHtml() {

        //     clearHtml();

        //     buyCoffe.forEach(product => {
        //         const { image, title, price, amount, id } = product;
        //         const row = document.createElement('div');
        //         row.classList.add('item');
        //         row.innerHTML = `
        //         <img src="${image}" width="60px"alt="">
        //         <div class="item-content">
        //             <h5>${title}</h5>
        //             <h5 class="cart-price">${price}</h5>
        //             <h6>Amount: ${amount}</h6>
        //         </div>
        //         <span class="delete-product" data-id="${id}">X</span>
        //     `;

        //         carList.appendChild(row);

        //         priceTotal.innerHTML = totalCoffes;

        //         amountProduct.innerHTML = countCoffes;
        //         saveLocal()
        //     });
        //     saveLocal()
        // }
        // function clearHtml() {
        //     carList.innerHTML = '';
        // }

        // function emptyCart(e) {
        //     e.preventDefault
        //     // Forma mas rapida y recomendada
        //     while (carList.firstChild) {

        //         carList.removeChild(carList.firstChild);
        //         btnEmptyCar.style.display="inline"
        //         saveLocal()
        //     }

        //     priceTotal.innerHTML = 0;
        //     amountProduct.innerHTML = 0;
        //     localStorage.removeItem("product");

        //     return false;
        // }

        // //set item
        // const saveLocal = () => {
        //     localStorage.setItem('car', JSON.stringify(buyCoffe))//al local storage se envia los datos en string
        // }

    })




