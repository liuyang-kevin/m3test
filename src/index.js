import Phaser from 'phaser';
import BootScene from './scenes/Boot/BootScene';
import G0 from './scenes/Game/G0';
import GLog from './scenes/Game/GLog';
import { W, H } from './common';
/*
* IPhone 6 375 * 667
* I Plus   414 * 736
* Pixel    411 * 731
* P XL     411 * 823
*
*  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，
* */
const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  // roundPixels: true,
  transparent: true,
  title: 'Game',
  url: 'http://yourgame.com',
  banner: {
    hidePhaser: true
  },
  // scene: [BootScene, G0, GLog]
  scene: [GLog, G0]
};

class AppGame extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

window.onresize = function() {
  game.renderer.resize(window.innerWidth, window.innerHeight, 1.0);
};

let game = new AppGame(config);
