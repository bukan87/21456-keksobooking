'use strict';

(function () {
  var CAPACITY = {
    1: {
      value: '1',
      text: 'для 1 гостя'
    },
    2: {
      value: '2',
      text: 'для 2 гостей'
    },
    3: {
      value: '3',
      text: 'для 3 гостей'
    },
    noGuests: {
      value: '0',
      text: 'не для гостей'
    }
  };
  var TIME_MAPPING = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };
  // Мапинг соответствия количества гостей по умолчанию от количества комнат
  var ROOM_CAPACITY_MAPPING = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['noGuests']
  };
  var HOUSING_TYPES = {
    flat: {
      ru: 'Квартира',
      eng: 'flat',
      minCost: 1000
    },
    bungalo: {
      ru: 'Бунгало',
      eng: 'bungalo',
      minCost: 0
    },
    house: {
      ru: 'Дом',
      eng: 'house',
      minCost: 5000
    },
    palace: {
      end: 'palace',
      minCost: 10000
    }
  };
  /**
   * Задание минимального цены
   * @param {Element} element элемент, еоторому нужно задать минимальное значение
   * @param {Object} housingType минимальное значение
   */
  var setMin = function (element, housingType) {
    element.min = housingType.minCost;
  };
  /**
   * Измененение состава Select
   * @param {Element} select
   * @param {Array} options Список допустимых значений
   */
  var updateSelect = function (select, options) {
    window.util.removeAllElementsFromNode(select);
    options.forEach(function (item) {
      var option = document.createElement('option');
      option.value = CAPACITY[item].value;
      option.textContent = CAPACITY[item].text;
      select.appendChild(option);
    });
  };
  var resetFormToDefault = function () {
    var title = notice.querySelector('#title');
    if (title) {
      title.value = '';
    }
    type.value = 'flat';
    price.value = 1000;
    price.min = 1000;
    timein.value = '12:00';
    timeout.value = '12:00';
    roomCount.value = '1';
    updateSelect(capacity, ROOM_CAPACITY_MAPPING[roomCount.value]);
    var description = notice.querySelector('#description');
    if (description) {
      description.value = '';
    }
    var features = notice.querySelectorAll('.form__element input');
    if (features) {
      features.forEach(function (item) {
        item.checked = false;
      });
    }
  };
  var notice = document.querySelector('.notice');
  // Зависимоть даты въезда от даты выезда и наоборот
  var timein = notice.querySelector('#timein');
  var timeout = notice.querySelector('#timeout');
  if (timein && timeout) {
    window.synchronizeFields(timein, timeout, TIME_MAPPING, window.util.selectByValue);
    window.synchronizeFields(timeout, timein, TIME_MAPPING, window.util.selectByValue);
  }
  // зависимоть минимальной цены на жильё от его типа
  var type = notice.querySelector('#type');
  var price = notice.querySelector('#price');
  if (type && price) {
    window.synchronizeFields(type, price, HOUSING_TYPES, setMin);
  }
  // Зависимоть количества гостей от количества комнат
  var roomCount = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  if (roomCount && capacity) {
    window.synchronizeFields(roomCount, capacity, ROOM_CAPACITY_MAPPING, updateSelect);
  }
  // проверка формы перед отправкой
  var noticeSubmit = notice.querySelector('.form__submit');
  if (noticeSubmit) {
    noticeSubmit.addEventListener('click', function (evt) {
      var isFormCorrect = true;
      var formInputs = notice.querySelectorAll('input');
      formInputs.forEach(function (item) {
        if (!item.validity.valid) {
          isFormCorrect = false;
        }
      });
      if (isFormCorrect) {
        var form = notice.querySelector('.notice__form');
        if (form) {
          window.backend.save(new FormData(form), resetFormToDefault, window.util.onError);
          evt.preventDefault();
        }
      }
    });
  }
  window.form = {
    TIMES: ['12:00', '13:00', '14:00'],
    HOUSING_TYPES: HOUSING_TYPES,
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };
}());
