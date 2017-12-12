'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ARROW_HEIGHT = 18;
  var ADS_COUNT = 8;
  var ads = [];
  /**
   * Создание кнопки похожего объявления на основе объявления
   * @param {Object} ad объявление
   * @return {Element} Созданная кнопка
   */
  var createButton = function (ad) {
    var button = document.createElement('button');
    button.classList.add('map__pin');
    button.style.left = (ad.location.x - IMG_WIDTH / 2) + 'px';
    button.style.top = (ad.location.y - (IMG_HEIGHT + ARROW_HEIGHT)) + 'px';
    var img = document.createElement('img');
    img.src = ad.author.avatar;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.draggable = false;
    button.appendChild(img);
    return button;
  };
  /**
   * Разбор ответа при запросе объявлений
   * @param {Object} response ответа от сервера
   */
  var onLoadAds = function (response) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    response.forEach(function (item) {
      if (ads.length <= ADS_COUNT) {
        ads.push(item);
        fragment.appendChild(createButton(item));
      }
    });
    mapPins.appendChild(fragment);
  };
  window.pin = {
    PIN_WIDTH: 40,
    PIN_HEIGHT: IMG_HEIGHT + ARROW_HEIGHT,
    ads: ads,
    /**
     * Загрузка и заполнение карты пинами объявлений
     */
    fillMapPin: function () {
      window.backend.load(onLoadAds, window.util.onError);
    },
    /**
     * Активация кнопки
     * @param {Node} button кнопка
     */
    activateButton: function (button) {
      button.classList.add('map__pin--active');
    },
    /**
     * Снятие активности со всех активных кнопок
     */
    deactivateActiveButtons: function () {
      var activeButtons = document.querySelectorAll('.map__pin--active');
      if (activeButtons) {
        for (var i = 0; i < activeButtons.length; i++) {
          activeButtons[i].classList.remove('map__pin--active');
        }
      }
    }
  };
}());
