import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './locstorage';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_NAME = 'videoplayer-current-time';

player.on('timeupdate', throttle(getTime, 1000));

function getTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      save(KEY_NAME, seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const currentTime = load(KEY_NAME);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
