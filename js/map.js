'use strict';
var SIMILAR_ADS_COUNT = 8;
var AVATARS = ['user01.png', 'user02.png', 'user03.png', 'user04.png', 'user05.png', 'user06.png', 'user07.png', 'user08.png'];
var HOUSING_TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSING_TYPES_INFO = {
  flat: {ru: 'Квартира'},
  bungalo: {ru: 'Бунгало'},
  house: {ru: 'Дом'}
};

/**
 * Генерация случайного числа в диапозоне
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное значение
 */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Выборка случайного элемента массива
 * @param {object} arr массив, из которого нужно выбрать случайный элемент
 * @return {*} случайный элемент
 */
var getRandomItem = function (arr) {
  return arr[getRandom(0, arr.length)];
};

/**
 * Вырезать случайный элемент из массива
 * @param {object} arr массив, из которого нужно вырезать случайный элемент
 * @return {*} вырезанный элемент
 */
var cutRandomItem = function (arr) {
  return arr.splice(Math.floor(getRandom(0, arr.length - 1)), 1);
};

/**
 * Генерация массива случайной длинны на основе массива
 * @param {Array} arr массив, на основе которого генерится массив
 * @return {Array} массив переменной длинны
 */
var getRandomArrayFromArray = function (arr) {
  var localArray = arr.slice(0);
  var result = [];
  for (var i = 0; i < getRandom(1, localArray.length + 1); i++) {
    result.push(cutRandomItem(localArray));
  }
  return result;
};

/**
 * Удаление всех дочерних элементов у ноды
 * @param {Element} node нода, у которй необходимо удалить все элементы
 */
var removeAllElementsFromNode = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

/**
 * Создание случайных объявлений
 * @param {number} adsCount количество случайных объявлений
 * @return {Array} массив созданных случайных объявлений
 */
var createRandomAds = function (adsCount) {
  var adsArray = [];
  for (var i = 0; i < adsCount; i++) {
    var x = getRandom(300, 900);
    var y = getRandom(100, 500);
    adsArray.push({
      author: {
        avatar: 'img/avatars/' + cutRandomItem(AVATARS)
      },
      offer: {
        title: cutRandomItem(titles),
        address: x + ', ' + y,
        price: getRandom(1000, 1000000),
        type: getRandomItem(HOUSING_TYPES),
        rooms: getRandom(1, 5),
        guests: getRandom(1, 10),
        checkin: getRandomItem(TIMES),
        checkout: getRandomItem(TIMES),
        features: getRandomArrayFromArray(FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  return adsArray;
};

/**
 * Создание кнопки похожего объявления на основе объявления
 * @param {Object} ad объявление
 * @return {Element} Созданная кнопка
 */
var createButton = function (ad) {
  var button = document.createElement('button');
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ARROW_HEIGHT = 18;
  button.classList.add('map__pin');
  button.style.left = (ad.location.x + IMG_WIDTH / 2) + 'px';
  button.style.top = (ad.location.y + IMG_HEIGHT + ARROW_HEIGHT) + 'px';
  var img = document.createElement('img');
  img.src = ad.author.avatar;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;
  img.draggable = false;
  button.appendChild(img);
  return button;
};

/**
 * Создание кнопок на основе массива объявлений
 * @param {Element} context место, куда необходимо добавить кнопки
 * @param {Array} ads массив объявлений
 */
var generateButtonsByAds = function (context, ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createButton(similarAds[i]));
  }
  context.appendChild(fragment);
};

/**
 * Заполнение удобств
 * @param {Element} context куда необходимо поместить удобства
 * @param {Array} features список удобств
 */
var fillFeatures = function (context, features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var liElement = document.createElement('li');
    liElement.classList.add('feature');
    liElement.classList.add('feature--' + features[i]);
    fragment.appendChild(liElement);
  }
  removeAllElementsFromNode(context);
  context.appendChild(fragment);
};

/**
 * Создание ноды на основе шаблона и объявления
 * @param {Object} ad объявление, на основе которого нужно сделать объявление
 * @return {Node} Созданная нода объявления
 */
var createAdInfoNodeByTemplate = function (ad) {
  var adNode = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  adNode.querySelector('h3').textContent = ad.offer.title;
  adNode.querySelector('p small').textContent = ad.offer.address;
  adNode.querySelector('.popup__price').textContent = ad.offer.price + '₽/ночь';
  adNode.querySelector('h4').textContent = HOUSING_TYPES_INFO[ad.offer.type].ru;
  adNode.querySelector('p:nth-child(7)').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  adNode.querySelector('p:nth-child(8)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  fillFeatures(adNode.querySelector('.popup__features'), ad.offer.features);
  adNode.querySelector('p:nth-child(10)').textContent = ad.offer.description;
  adNode.querySelector('.popup__avatar').src = ad.author.avatar;
  return adNode;
};

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var similarAds = createRandomAds(SIMILAR_ADS_COUNT);
document.querySelector('.map').classList.remove('map--faded');
generateButtonsByAds(document.querySelector('.map .map__pins'), similarAds);
var map = document.querySelector('.map .map__pins');
map.insertBefore(createAdInfoNodeByTemplate(similarAds[0]), map.querySelector('.map__filters-container'));
