'use strict';

(function () {
  /**
   * Обработка результата звапроса
   * @param {XMLHttpRequest} xhr
   * @return {string}
   */
  var responseHandle = function (xhr) {
    var error;
    switch (xhr.status) {
      case 200:
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
    }
    return error;
  };
  window.backend = {
    /**
     * Загрузка данных с сервера
     * @param {Function} onLoad функция, которая будет запущена при успешной загрузке
     * @param {Function} onError функция, которая будет запущена при ошибке
     */
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);
      xhr.addEventListener('load', function () {
        var error = responseHandle(xhr);
        if (error) {
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.send();
    },
    /**
     * Отправка данных на сервер
     * @param {FormData} data данные для отправки
     * @param {Function} onLoad функция, которая будет запущена при успешной загрузке
     * @param {Function} onError функция, которая будет запущена при ошибке
     */
    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL);
      xhr.addEventListener('load', function () {
        var error = responseHandle(xhr);
        if (error) {
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.send(data);
    }
  };
}());
