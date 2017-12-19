'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var debounceLastTimeout;
  window.util = {
    /**
     * Выбор элмента в Селекте по значению
     * @param {Element} select Нода, в которой нужно выбрать элемент
     * @param {string} value значение
     */
    selectByValue: function (select, value) {
      [].forEach.call(select.options, function (item, i) {
        if (item.value === value) {
          select.options.selectedIndex = i;
        }
      });
    },
    /**
     * Удаление всех дочерних элементов у ноды
     * @param {Element} node нода, у которй необходимо удалить все элементы
     */
    removeAllElementsFromNode: function (node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    },
    KEYBOARDS: {
      ESC: 27
    },
    /**
     * Определение координат элемента
     * @param {Element} elem
     * @return {{top: number, left: number}}
     */
    getCoordinates: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    },
    /**
     * Вывод текста сообщения
     * @param {string} message текс сообщения
     */
    onError: function (message) {
      var popup = document.querySelector('#message-window');
      var onCloseClick = function () {
        if (popup) {
          popup.style.display = 'none';
          popupClose.removeEventListener('click', onCloseClick);
        }
      };
      if (popup) {
        var messageBox = popup.querySelector('.message');
        if (messageBox) {
          messageBox.textContent = message;
        }
        popup.style.display = 'block';
        var popupClose = popup.querySelector('.close');
        if (popupClose) {
          popupClose.addEventListener('click', onCloseClick);
        }
      }
    },
    /**
     * Устранение "дребезга"
     * @param {Function} fun
     */
    debounce: function (fun) {
      if (debounceLastTimeout) {
        window.clearTimeout(debounceLastTimeout);
      }
      debounceLastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
}());
