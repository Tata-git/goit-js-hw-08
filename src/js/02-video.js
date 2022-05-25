import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// const throttle = require('lodash.throttle'); // 1000
const STORAGE_KEY = 'videoplayer-current-time';
//--3---------------------------------------------------------
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

//--4.----------------------------------------------------
// Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
const onPlay = function (data) {
  // console.log('played the video!');
  
    // duration: 61.857;
    // percent: 0.049;
    // seconds: 3.034;
  
  // data is an object containing properties specific to that event
  // data — это объект, содержащий свойства, специфичные для этого события
};

player.on('play', onPlay);
// 7.  сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.

//------ player.on('eventName', function (data) {
// data is an object containing properties specific to that event

// });-------
player.on('timeupdate', throttle(onPlay, 1000));

// 5.Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".

// function updatePlaybackTime(evt) {
//   const playbackTime = evt.target.value;

//   localStorage.setItem(STORAGE_KEY, playbackTime);
// }
//---6---------------------------------------------------
// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
    //   секунды = фактическое время, которое игрок пытался
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        // время было меньше 0 или больше  чем продолжительности видео
        break;

      default:
        // some other error occurred
        // произошла какая-то другая ошибка
        break;
    }
  });
