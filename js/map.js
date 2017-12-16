'use strict';

(function () {
  /**
   * Определение позиции стрелки у главного пина
   * @return {{number, number}} координаты конца стрелки
   */
  var mainPinArrowPoint = function () {
    var ARROW_HEIGHT = 22;
    var BUTTON_SIZE = 65;
    var pinCoordinate = window.util.getCoords(mainPin);
    return {
      x: pinCoordinate.left + BUTTON_SIZE / 2,
      y: pinCoordinate.top + (BUTTON_SIZE + ARROW_HEIGHT)
    };
  };
  /**
   * Заполнение адреса на основе координат
   * @param {{number: x, number: y}}coordinates
   */
  var fillAddress = function (coordinates) {
    var address = document.querySelector('#address');
    if (address) {
      address.value = 'x: ' + Math.round(coordinates.x) + ', y: ' + Math.round(coordinates.y);
    }
  };
  /**
   * Drag'n'Drop гланого пина
   * @param {Event} evt данные о событии
   */
  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };
      var arrowPoint = mainPinArrowPoint();
      arrowPoint.x -= shift.x;
      arrowPoint.y -= shift.y;
      var mapOverlay = map.querySelector('.map__pinsoverlay');
      mapOverlay.xLength = {
        fromX: window.util.getCoords(mapOverlay).left,
        toX: window.util.getCoords(mapOverlay).left + mapOverlay.offsetWidth
      };
      if (arrowPoint.y < 100 || arrowPoint.y > 500 || arrowPoint.x < mapOverlay.xLength.fromX || arrowPoint.x > mapOverlay.xLength.toX) {
        return;
      }
      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      fillAddress(arrowPoint);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  /**
   * Отлов нажатия на главную кнопку на карте
   */
  var onMapPinMainMouseUp = function () {
    map.classList.remove('map--faded');
    window.pin.fillMapPin();
    var noticeForm = document.querySelector('.notice__form');
    noticeForm.classList.remove('notice__form--disabled');
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    mainPin.removeEventListener('mouseup', onMapPinMainMouseUp);
    mainPin.addEventListener('mousedown', onMapPinMainMousedown);
    var img = mainPin.querySelector('img');
    if (img) {
      img.draggable = true;
    }
    fillAddress(mainPinArrowPoint());
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  // Нажатия на пины на карте
  var mapPins = map.querySelector('.map__pins');
  if (mapPins) {
    mapPins.addEventListener('click', function (evt) {
      var pressedButton;
      if (evt.target.tagName.toLowerCase() === 'button') {
        pressedButton = evt.target;
      } else {
        pressedButton = evt.target.parentNode;
      }
      var buttons = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < buttons.length; i++) {
        if (evt.target === buttons[i].childNodes[0] || evt.target === buttons[i]) {
          window.pin.deactivateActiveButtons();
          window.pin.activateButton(pressedButton);
          window.showCard(window.pin.getAd(i));
          break;
        }
      }
    });
  }
  map.insertBefore(window.card.adCardNode, map.querySelector('.map__filters-container'));
  mainPin.addEventListener('mouseup', onMapPinMainMouseUp);
}());
