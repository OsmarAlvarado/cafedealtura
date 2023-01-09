

axios

    .get(`https://cafe-de-altura-api.vercel.app/api/products`)
    .then(response => {
        const dataProducts = response.data.products
        console.log(dataProducts);

        // dataProducts.forEach(abil => {


        //     //     //metodo de creacion de elementos
        //     let article = document.createElement('article')
        //     article.classList.add('col')
        //     let imgBags = document.createElement('img')
        //     imgBags.classList.add('image-cart')
        //     let bagName = document.createElement('a')
        //     bagName.classList.add('country')
        //     let bagPrice = document.createElement('p')
        //     bagPrice.classList.add('price')
        //     let btnAdd = document.createElement('button')
        //     btnAdd.classList.add('add')


        //     article.appendChild(imgBags)
        //     article.appendChild(bagName)
        //     article.appendChild(bagPrice)
        //     article.appendChild(btnAdd)


        //     imgBags.setAttribute('src', abil.img_url)
        //     bagName.innerHTML = `${abil.brand}`
        //     bagName.setAttribute('href', '#')
        //     bagName.setAttribute('style', 'font-family: outfit')
        //     bagPrice.innerText = `${abil.price},00 €`
        //     bagPrice.setAttribute('style', 'font-family: outfit')
        //     btnAdd.innerHTML = `Añadir`
        //     btnAdd.setAttribute('style', 'font-family: outfit')
        //     btnAdd.setAttribute('href', '#')
        //     btnAdd.setAttribute('data-id', abil._id)
        //     //abilityP.push(abil)
        //     document.querySelector('#bags').appendChild(article)


        // })

        dataProducts.forEach(abil => {

            if (abil.available === true) {
                let article = document.createElement('article')
                article.classList.add('col')
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


                imgBags.setAttribute('src', abil.img_url)
                bagName.innerHTML = `${abil.brand}`
                bagName.setAttribute('href', '#')
                bagName.setAttribute('style', 'font-family: outfit')
                bagPrice.innerText = `${abil.price},00 €`
                bagPrice.setAttribute('style', 'font-family: outfit')
                btnAdd.innerHTML = `Añadir`
                btnAdd.setAttribute('style', 'font-family: outfit')
                btnAdd.setAttribute('href', '#')
                btnAdd.setAttribute('data-id', abil._id)
                //abilityP.push(abil)
                document.querySelector('#bags').appendChild(article)
            } else if (abil.available === false) {

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

                imgBags.setAttribute('src', abil.img_url)
                bagName.innerHTML = `${abil.brand}`
                bagName.setAttribute('href', '#')
                bagName.setAttribute('style', 'font-family: outfit')
                bagPrice.innerText = `${abil.price},00 €`
                bagPrice.setAttribute('style', 'font-family: outfit')
                btnAdd.innerHTML = 'Agotado'
                btnAdd.setAttribute('style', 'font-family: outfit')
                btnAdd.setAttribute('href', '#')
                btnAdd.setAttribute('data-id', abil._id)

                document.querySelector('#bags').appendChild(article)
            }


        })

        //FUNCIONABILIDAD DEL CAFE
        const allCoffes = document.querySelector("#bags");
        const carList = document.querySelector(".card-items");
        const priceTotal = document.querySelector('.price-total');
        const amountProduct = document.querySelector('.count-product');
        const btnEmptyCar = document.getElementById("empty-cart");
        console.log(allCoffes);

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
            if (e.target.classList.contains("add")) {
                const coffe = e.target.parentElement;
                readDataCoffe(coffe);
                saveLocal();
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
                id: product.querySelector('.add').getAttribute('data-id'),
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

            // Forma lenta
            //carList.innerHTML = "";

            // Forma mas rapida y recomendada
            while (carList.firstChild) {
                carList.removeChild(carList.firstChild);
            }


            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
            localStorage.removeItem("product");

            return false;
        }

        const saveLocal = () => {
            localStorage.setItem('car', JSON.stringify(buyCoffe))
        }
    })