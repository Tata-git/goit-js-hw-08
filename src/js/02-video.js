import Player from '@vimeo/player';
import throttle from 'lodash.throttle'; // 1000

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = function (data) {
  // console.log('played the video!');
  const forUpdatePlaybackTime = JSON.stringify(data.seconds);
  localStorage.setItem(STORAGE_KEY, forUpdatePlaybackTime);
 
  console.log(forUpdatePlaybackTime);
};

player.on('play', onPlay);
player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
