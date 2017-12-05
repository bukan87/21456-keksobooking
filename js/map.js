'use strict';

(function () {
  var SIMILAR_ADS_COUNT = 8;

  /**
   * Отлов нажатия на главную кнопку на карте
   */
  var onMapPinMainMouseUp = function () {
    map.classList.remove('map--faded');
    window.data.similarAds = window.data.createRandomAds(SIMILAR_ADS_COUNT);
    window.pin.generateButtonsByAds(map.querySelector('.map__pins'), window.data.similarAds);
    var noticeForm = document.querySelector('.notice__form');
    noticeForm.classList.remove('notice__form--disabled');
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    map.querySelector('.map__pin--main').removeEventListener('mouseup', onMapPinMainMouseUp);
  };

  var map = document.querySelector('.map');
  // Нажатия на пины на карте
  var mapPins = map.querySelector('.map__pins');
  if (mapPins) {
    mapPins.addEventListener('click', function (evt) {
      var pressedButton = evt.target.parentNode;
      var buttons = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < buttons.length; i++) {
        if (evt.target === buttons[i].childNodes[0]) {
          window.pin.deactivateActiveButtons();
          window.pin.activateButton(pressedButton);
          window.card.fillAdCard(window.data.similarAds[i]);
          window.card.showAdCard();
          break;
        }
      }
    });
  }
  map.querySelector('.map__pin--main').addEventListener('mouseup', onMapPinMainMouseUp);
  map.insertBefore(window.card.adCardNode, map.querySelector('.map__filters-container'));
}());
