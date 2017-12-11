'use strict';

(function () {
  /**
   * Синхронизация полей формы
   * @param {Element} element1 Поле1
   * @param {Element} element2 Поле2
   * @param {Object} dataMapping Мапинг элементов первого поля на значения второго
   * @param {Function} callback Функция синхронизации значения
   */
  window.synchronizeFields = function (element1, element2, dataMapping, callback) {
    if (!element1 || !element2 || !dataMapping || !callback) {
      throw new Error('Не все параметры заданы');
    }
    element1.addEventListener('change', function (evt) {
      var element2Value;
      if (element1.tagName.toLowerCase() === 'select') {
        element2Value = dataMapping[evt.target.options[evt.target.options.selectedIndex].value];
      } else {
        element2Value = dataMapping[evt.target.value];
      }
      if (!element2Value) {
        throw new Error('Не найдено значения для элемента ' + evt.target.options[evt.target.options.selectedIndex].value);
      }
      callback(element2, element2Value);
    });
  };
}());
