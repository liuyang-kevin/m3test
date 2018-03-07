import Phaser from 'phaser';
import BootScene from './scenes/Boot/BootScene';
import G0 from './scenes/Game/G0';

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  title: 'Game',
  url: 'http://yourgame.com',
  banner: {
    hidePhaser: true
  },
  scene: [BootScene, G0]
};

class AppGame extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

let game = new AppGame(config);
