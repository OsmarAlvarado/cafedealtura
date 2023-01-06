

axios

    .get(`https://cafe-de-altura-api.vercel.app/api/products`)
    .then(response => {
        const dataProducts = response.data.products
        console.log(dataProducts);

        //const abilityP = []

        // for (let i = 0; i < dataProducts.length; i++) {


        //     let imgBags = document.querySelector('.image-cart')
        //     let bagName = document.querySelector('.country')
        //     let bagPrice = document.querySelector('.price')
        //     let btnAdd = document.querySelector('.add')

        //     imgBags.setAttribute('src', dataProducts[i].img_url)
        //     bagName.innerHTML = `${dataProducts[i].brand}`
        //     bagPrice.innerHTML = `${dataProducts[i].price}€`
        //     btnAdd.innerHTML = `Añadir`

        //    // abilityP.push(dataProducts)

        // }

        dataProducts.forEach(abil => {


            //     //metodo de creacion de elementos
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
            imgBags.setAttribute('alt', abil.available)
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

        })


    })