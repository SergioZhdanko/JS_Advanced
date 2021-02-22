'use strict';
const products = [
    {id: 1, title: 'Notebook', price: 20000, fig: 'img/00000195.JPG'},
    {id: 2, title: 'Mouse', price: 1500, fig: 'img/00000196.JPG'},
    {id: 3, title: 'Keyboard', price: 5000, fig: 'img/00000197.JPG'},
    {id: 4, title: 'Gamepad', price: 4500, fig: 'img/00000198.JPG'},
];

/**
 * Функция принимает название, цену и фото товара и преоразует его в html-разметку
 * @param {string} title
 * @param {number} price
 * @param {string} fig
 * @returns {string} html-разметка товаров всего каталога
 */
//заданы параметры по умолчанию для функции renderProduct 
const renderProduct = (title = 'Some new product', price = 0, fig = 'img/00000008.JPG') => { 
    return `<div class="product-item">
                <h3>${title}</h3>
                <img class="image" src="${fig}" alt="product picture">
                <p>${price}</p>
                <button class="browse__button">Добавить в корзину</button>
              </div>`;
};

const renderCatalog = (list) => {
    const productList = list.map((item) => {
        return renderProduct(item.title, item.price, item.fig);
    });

    console.log(productList);   
    document.querySelector('.products').innerHTML = productList.join('');
};

renderCatalog(products);
