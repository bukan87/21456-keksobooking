'use strict';

(function () {
  /**
   * Заполнение удобств
   * @param {Element} context куда необходимо поместить удобства
   * @param {Array} features список удобств
   */
  var fillFeatures = function (context, features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (item) {
      var liElement = document.createElement('li');
      liElement.classList.add('feature');
      liElement.classList.add('feature--' + item);
      fragment.appendChild(liElement);
    });
    window.util.removeAllElementsFromNode(context);
    context.appendChild(fragment);
  };
  /**
   * Отлов нажатия на кнопку ESC
   * @param {Object} evt контекст события
   * @constructor
   */
  var onAdCardEscPress = function (evt) {
    if (evt.keyCode === window.util.KEYBOARDS.ESC) {
      window.card.hideAdCard();
    }
  };

  /**
   * Отлов нажатия на крестик в карточке объявления
   */
  var onAdCardPopupCloseClick = function () {
    window.card.hideAdCard();
  };

  // Создадим карточку объявления из шаблона
  var adCardNode = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  if (adCardNode) {
    adCardNode.classList.add('hidden');
    adCardNode.querySelector('.popup__close').addEventListener('click', onAdCardPopupCloseClick);
    adCardNode.querySelector('.popup__close').addEventListener('keydown', onAdCardEscPress);
  }
  window.card = {
    /**
     * Заполнение и отображение карточки объявления
     * @param {Object} ad объявление, данные которого нужно заполнить
     */
    fillAdCard: function (ad) {
      adCardNode.querySelector('h3').textContent = ad.offer.title;
      adCardNode.querySelector('p small').textContent = ad.offer.address;
      adCardNode.querySelector('.popup__price').textContent = ad.offer.price + '₽/ночь';
      adCardNode.querySelector('h4').textContent = window.form.HOUSING_TYPES[ad.offer.type].ru;
      adCardNode.querySelector('p:nth-child(7)').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
      adCardNode.querySelector('p:nth-child(8)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      fillFeatures(adCardNode.querySelector('.popup__features'), ad.offer.features);
      adCardNode.querySelector('p:nth-child(10)').textContent = ad.offer.description;
      adCardNode.querySelector('.popup__avatar').src = ad.author.avatar;
    },
    /**
     * Отображение карточки объявления
     */
    showAdCard: function () {
      adCardNode.classList.remove('hidden');
      document.addEventListener('keydown', onAdCardEscPress);
    },
    /**
     * Скрытие карточки объявления
     */
    hideAdCard: function () {
      adCardNode.classList.add('hidden');
      var activeButtons = document.querySelectorAll('.map__pin--active');
      if (activeButtons) {
        activeButtons.forEach(function (item) {
          item.classList.remove('map__pin--active');
        });
      }
      document.removeEventListener('keydown', onAdCardEscPress);
    },
    adCardNode: adCardNode
  };
}());
