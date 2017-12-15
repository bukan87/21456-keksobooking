'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ARROW_HEIGHT = 18;
  var MAX_ADS_COUNT = 5;
  var ads = [];
  var filter = {
    features: []
  };
  var filterContainer = document.querySelector('.map__filters-container');
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
   * Проверка пина по наложенным фильтрам
   * @param {Object} pin пин
   * @return {boolean}
   */
  var checkPinByFilter = function (pin) {
    if (filter.housingType && pin.offer.type !== filter.housingType) {
      return false;
    }
    if (filter.housingPrice) {
      if (filter.housingPrice === 'low' && pin.offer.price > 10000) {
        return false;
      }
      if (filter.housingPrice === 'middle' && (pin.offer.price < 10000 || pin.offer.price > 50000)) {
        return false;
      }
      if (filter.housingPrice === 'high' && pin.offer.price < 50000) {
        return false;
      }
    }
    if (filter.housingRooms && pin.offer.rooms.toString() !== filter.housingRooms) {
      return false;
    }
    if (filter.housingGuests && pin.offer.guests.toString() !== filter.housingGuests) {
      return false;
    }
    var hasAllFeatures = filter.features.every(function (it) {
      return pin.offer.features.indexOf(it) >= 0;
    });
    return hasAllFeatures;
  };
  /**
   * Разбор ответа при запросе объявлений
   * @param {Object} response ответа от сервера
   */
  var onLoadAds = function (response) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    if (filter) {
      ads = response.filter(checkPinByFilter).slice(0, MAX_ADS_COUNT);
    } else {
      ads = response.slice(0, MAX_ADS_COUNT);
    }
    ads.forEach(function (item) {
      fragment.appendChild(createButton(item));
    });
    // Удалим старые кнопки
    window.card.hideAdCard();
    while (mapPins.childElementCount > 2) {
      mapPins.removeChild(mapPins.lastElementChild);
    }
    mapPins.appendChild(fragment);
  };
  /**
   * Загрузка и заполнение карты пинами объявлений
   */
  var fillMapPin = function () {
    window.backend.load(onLoadAds, window.util.onError);
  };
  /**
   * Добавление события по смене филтра для селектов
   * @param {string} id ид селекта, на который нужно наложить событие
   * @param {string} filterName название поля в фильтре
   */
  var addEventToSelectFilter = function (id, filterName) {
    var select = filterContainer.querySelector('#' + id);
    if (select) {
      select.addEventListener('change', function (evt) {
        var selectedItem = evt.target.value;
        if (selectedItem !== 'any') {
          filter[filterName] = selectedItem;
        } else {
          filter[filterName] = null;
        }
      });
    }
  };
  filterContainer.addEventListener('change', function () {
    window.util.debounce(fillMapPin);
  });
  addEventToSelectFilter('housing-type', 'housingType');
  addEventToSelectFilter('housing-price', 'housingPrice');
  addEventToSelectFilter('housing-rooms', 'housingRooms');
  addEventToSelectFilter('housing-guests', 'housingGuests');
  var features = filterContainer.querySelector('#housing-features');
  if (features) {
    features.addEventListener('change', function (evt) {
      var featureName = evt.target.value;
      if (evt.target.checked) {
        filter.features.push(featureName);
      } else {
        filter.features.splice(filter.features.indexOf(featureName), 1);
      }
    });
  }
  window.pin = {
    PIN_WIDTH: 40,
    PIN_HEIGHT: IMG_HEIGHT + ARROW_HEIGHT,
    /**
     * Загрузка и заполнение карты пинами объявлений
     */
    fillMapPin: fillMapPin,
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
    },
    /**
     * Вывод сообщения по его номеру
     * @param {number} num номер объявления
     * @return {Object}
     */
    getAd: function (num) {
      return ads[num];
    }
  };
}());
