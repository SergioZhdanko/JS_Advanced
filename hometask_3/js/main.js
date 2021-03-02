const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch
// let getRequest = (url, callBack) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         callBack(xhr.responseText);
//       }
//     }
//   }
//   xhr.send();
// };

// Задание #1 getRequest на Promise

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status !== 200) {reject('Error!');}
        else {resolve(xhr.responseText);}
      }
    }
    xhr.send();
  });
};



///////////////////////////////////////
/*
  Базовый класс StadardModel для каталога ProductList и корзины Cart
*/

class StadardModel {
  constructor(url, container, model = modelContext) {
    this.url = url;
    this.container = container;
    this.model = model;
    this.goods = []; // массив с получаемыми по запросу товарами
    this.allProducts = []; // массив со всеми товарами
    //this.filter = []; // массив с отфильтрованными товарами для поля поиска
    this._init(); // метод в котором будут слушатели с обработчиками событий кликов, по кнопкам. Для каждого дочернего класса будут свои
  }

  /**
   * метод получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
   getJsonData(url) {
      return fetch(`${API + this.url}`) // ВНИМАНИЕ!!! проверить варианты работы с таким аргументом
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
   }

   /**
   * обработка полученных данных
   * @param data
   */
  handleData(data){
    this.goods = [...data];
    this.render();
  }

  /**
   * рендер (отрисовка) основного каталога или корзины
   */
  render() {
    const block = document.querySelector(this.container);
    this.goods.forEach((product) => {
      const productObject = new this.model[this.constructor.name](product); // Часть кода в промежутке this и (product) совершенно не понятна по синтаксису и потому как это работает
      console.log(productObject);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }

  /**
   * метод подсчитывает стоимость всех товаров
   */
  goodsTotalPrice() {
    return this.goods.reduce((sum, { price }) => sum + price, 0);
  }

  _init() {
    return false;
  }
}

// класс Корзины наследуется от StadardModel
class Cart extends StadardModel {
  constructor(container = ".cart-block", url = "/getBasket.json") {
    super(url, container);
    this.getJsonData() // ((( нет понимание, что и откуда сюда прходит и как это работает
      .then(data => {
          this.handleData(data.contents);
      });
  }

  /**
   * добавление товара
   * @param product
   */
  addProduct(element) { 
    this.getJsonData(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновление данных корзины
   * @param product
   */
  _updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }

}

// Вариант без наследовани от базовых классов
class ProductList {

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    // this.#fetchGoods();
    // this.#render();
    this._getProducts()
        .then((data) => {
          this._goods = [...data];
          this._render();
        });
  }

  goodsTotalPrice() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     // console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //     console.log(this.#allProducts);
  //   });
  // }
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        });
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
  constructor(product, img='https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}



const productList = new ProductList();
