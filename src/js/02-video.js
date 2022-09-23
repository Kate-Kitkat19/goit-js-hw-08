import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_NAME = 'videoplayer-current-time';

player.on('timeupdate', throttle(getTime, 1000));

function getTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      console.log(seconds);
      localStorage.setItem(KEY_NAME, JSON.stringify(seconds));
    })
    .catch(function (error) {
      console.log(error);
    });
}

localStorage.removeItem('KEY_NAME');
