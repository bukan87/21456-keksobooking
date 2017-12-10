'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ARROW_HEIGHT = 18;
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
  window.pin = {
    PIN_WIDTH: 40,
    PIN_HEIGHT: IMG_HEIGHT + ARROW_HEIGHT,
    /**
     * Создание кнопок на основе массива объявлений
     * @param {Element} context место, куда необходимо добавить кнопки
     * @param {Array} ads массив объявлений
     */
    generateButtonsByAds: function (context, ads) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(createButton(ads[i]));
      }
      context.appendChild(fragment);
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
