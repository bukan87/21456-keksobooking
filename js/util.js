'use strict';

(function () {
  window.util = {
    /**
     * Генерация случайного числа в диапозоне
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number} случайное значение
     */
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * Выборка случайного элемента массива
     * @param {object} arr массив, из которого нужно выбрать случайный элемент
     * @return {*} случайный элемент
     */
    getRandomItem: function (arr) {
      return arr[window.util.getRandom(0, arr.length)];
    },
    /**
     * Вырезать случайный элемент из массива
     * @param {object} arr массив, из которого нужно вырезать случайный элемент
     * @return {*} вырезанный элемент
     */
    cutRandomItem: function (arr) {
      return arr.splice(Math.floor(window.util.getRandom(0, arr.length - 1)), 1);
    },
    /**
     * Генерация массива случайной длинны на основе массива
     * @param {Array} arr массив, на основе которого генерится массив
     * @return {Array} массив переменной длинны
     */
    getRandomArrayFromArray: function (arr) {
      var localArray = arr.slice(0);
      var result = [];
      for (var i = 0; i < window.util.getRandom(1, localArray.length + 1); i++) {
        result.push(window.util.cutRandomItem(localArray));
      }
      return result;
    },
    /**
     * Выбор элмента в Селекте по значению
     * @param {Element} select Нода, в которой нужно выбрать элемент
     * @param {string} value значение
     */
    selectByValue: function (select, value) {
      for (var i = 0; i < select.options.length; i++) {
        if (select[i].value === value) {
          select.options.selectedIndex = i;
          break;
        }
      }
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
    getCoords: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };
}());
