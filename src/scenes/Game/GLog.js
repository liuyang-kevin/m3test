import Phaser from 'phaser';
import imgDownBubble from './../../assets/images/down-bubble.png';

const H = window.innerHeight;

class GLog extends Phaser.Scene {
  drawField;
  constructor() {
    super({ key: 'GLog', active: true });
  }

  preload() {
    this.load.image('down', imgDownBubble);
  }

  create() {
    this.add.text(10, H - 10, 'Phaser 3 Advanced webpack boilerplate', {
      font: '20px Helvetica',
      fill: 'white'
    });
    let ttt = this.add.text(10, H - 30, `${document.documentElement.clientWidth}`);
    this.add.text(10, H - 60, `${document.documentElement.clientHeight}`);
    this.add.text(10, H - 90, `${window.devicePixelRatio}`);

    let downButton = this.add.image(10, H - 100, 'down').setInteractive();
    downButton.on('pointerdown', pointer => {
      // console.dir(this.scene.manager.keys['G0']);
      if (this.scene.manager.keys['G0']) {
        this.scene.manager.keys['G0'].initChessBoard(9, 9, 6);
      }
    });
  }
}

export default GLog;
