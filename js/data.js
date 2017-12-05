'use strict';

(function () {
  var AVATARS = ['user01.png', 'user02.png', 'user03.png', 'user04.png', 'user05.png', 'user06.png', 'user07.png', 'user08.png'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSING_TYPES = ['flat', 'house', 'bungalo'];
  window.data = {
    /**
     * Создание случайных объявлений
     * @param {number} adsCount количество случайных объявлений
     * @return {Array} массив созданных случайных объявлений
     */
    createRandomAds: function (adsCount) {
      var adsArray = [];
      for (var i = 0; i < adsCount; i++) {
        var x = window.util.getRandom(300, 900);
        var y = window.util.getRandom(100, 500);
        adsArray.push({
          author: {
            avatar: 'img/avatars/' + window.util.cutRandomItem(AVATARS)
          },
          offer: {
            title: window.util.cutRandomItem(titles),
            address: x + ', ' + y,
            price: window.util.getRandom(1000, 1000000),
            type: window.util.getRandomItem(HOUSING_TYPES),
            rooms: window.util.getRandom(1, 5),
            guests: window.util.getRandom(1, 10),
            checkin: window.util.getRandomItem(window.form.TIMES),
            checkout: window.util.getRandomItem(window.form.TIMES),
            features: window.util.getRandomArrayFromArray(window.form.FEATURES),
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
    },
    similarAds: []
  };
}());
