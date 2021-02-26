'use strict';

//1.  Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.

// Класс Cart для Корзины
class Cart {
    constructor(container = '.cart-products') {
        this.container = container;
        this._goodsInCart = [];
        this._allProductsInCart = [];
        this._fetchGoodsInCart();
        this._render();
    }

  _fetchGoodsInCart() {
    /*как-то получаем все товары из корзины? из-за заказа?
      чтобы записать это в _goodsInCart.
    */
  }

  _render() {
    const block = document.querySelector(this.container);
    this._goodsInCart.forEach((product) => {
      const productInCart = new ProductInCart(product);
      console.log(productInCart);
      this._allProductsInCart.push(productInCart);
      block.insertAdjacentHTML('beforeend', productInCart.render());
    });
  }

  _deleteProductFromCart() {
    /*
      метод, который будет вызываться при удалении товара из корзины по нажитию кнопки "Удалить товар из корзины"
      он должен будет делать следующее:
      1. удалять товар из массива _allProductsInCart
      2. вызывать метод render() для перерисовки товаров в Корзине
      3. вызывать метод getPriceAllGoodsInCart() для пересчета стоимости товаров в Корзине
    */
  }

  // Подсчет стоимости всех товаров в корзине
  getPriceAllGoodsInCart() {
    return this._goodsInCart.reduce((total, { price }) => total + price, 0);
  }  
}

// Класс ProductInCart элемент корзины товаров
class ProductInCart {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.fig = product.fig;
  }

  render() {
        `<div class="product-item" data-id="${this.id}">
              <img src="${this.fig}" alt="Figure product">
              <div class="info">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="delete-btn">Удалить товар из корзины</button>
              </div>
          </div>`;
    }
}

// 2.  Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
class GoodList {

  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
  }
/* 
  Данное решение полностью вдохновленно твоим разбором на занятии.
  Мое решение оказалось, увы, не работающим.
*/
  getTotalPrice() {
    return this._goods.reduce((total, { price }) => total + price, 0);
  }

  getTotalWithDiscount(discount) {
    return this.getTotalPrice * discount;
  }

  _fetchGoods() {
    this._goods = [
      {id: 1, title: 'Notebook', price: 19000, fig: 'img/00000195.JPG'},
      {id: 2, title: 'Mouse', price: 1500, fig: 'img/00000196.JPG'},
      {id: 3, title: 'Keyboard', price: 3500, fig: 'img/00000197.JPG'},
      {id: 4, title: 'Gamepad', price: 4000, fig: 'img/00000198.JPG'},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    this._goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.fig = product.fig;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img class="image" src="${this.fig}" alt="Prroduct figure">
              <div class="info">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="browse__button">Добавить в корзину</button>
              </div>
          </div>`;
  }
}

const productList = new GoodList();
console.log(productList.getTotalPrice());
