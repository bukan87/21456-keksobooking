'use strict';

(function () {
  // Мапинг соответствия количества гостей по умолчанию от количества комнат
  var ROOM_PLACES_MAPPING = {
    1: '1',
    2: '2',
    3: '3',
    100: '0'
  };
  var notice = document.querySelector('.notice');
  // Зависимоть даты въезда от даты выезда и наоборот
  var timein = notice.querySelector('#timein');
  var timeout = notice.querySelector('#timeout');
  if (timein) {
    timein.addEventListener('change', function (evt) {
      timeout.options.selectedIndex = evt.target.options.selectedIndex;
    });
  }
  if (timeout) {
    timeout.addEventListener('change', function (evt) {
      timein.options.selectedIndex = evt.target.options.selectedIndex;
    });
  }
  // зависимоть минимальной цены на жильё от его типа
  var type = notice.querySelector('#type');
  if (type) {
    type.addEventListener('change', function (evt) {
      notice.querySelector('#price').min = window.form.HOUSING_TYPES[type.options[evt.target.options.selectedIndex].value].minCost;
    });
  }

  // Зависимоть количества гостей по умолчанию в зависимости от количества комнат
  var roomCount = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  if (roomCount) {
    roomCount.addEventListener('change', function (evt) {
      var selectedValue = roomCount[evt.target.options.selectedIndex].value;
      window.util.selectByValue(capacity, ROOM_PLACES_MAPPING[selectedValue]);
    });
  }

  // проверка формы перед отправкой
  var noticeSubmit = notice.querySelector('.form__submit');
  if (noticeSubmit) {
    noticeSubmit.addEventListener('click', function () {
      var isFormCorrect = true;
      var formInputs = notice.querySelectorAll('input');
      for (var i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].validity.valid) {
          isFormCorrect = false;
        }
      }
      if (isFormCorrect) {
        notice.querySelector('.setup-notice__form-form').submit();
      }
    });
  }
  window.form = {
    TIMES: ['12:00', '13:00', '14:00'],
    HOUSING_TYPES: {
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
    },
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };
}());
