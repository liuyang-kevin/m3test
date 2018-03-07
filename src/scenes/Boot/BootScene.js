import Phaser from 'phaser';
import image from './../../assets/images/logo.png';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    // Load all images sounds sprite.
    this.load.image('logo', image);
  }

  create() {
    let W = this.sys.game.config.width;
    let H = this.sys.game.config.height;
    this.add.text(10, 10, 'Phaser 3 Advanced webpack boilerplate');
    this.add.image(300, 300, 'logo');
    // console.log(this.sys.game.config);
    this.add.text(W / 2, H / 2, 'Go');
    // this.button = this.add.button(95, 400, 'button', this.actionOnClick, this, 2, 1, 0);
    // this.button.onInputOver.add(this.over, this);
    // this.button.onInputOut.add(this.out, this);
    // this.button.onInputUp.add(this.up, this);
  }

  static up() {
    console.log('button up', arguments);
  }

  static over() {
    console.log('button over');
  }

  static out() {
    console.log('button out');
  }

  actionOnClick() {
    // return background.visible =! background.visible;
  }
}

export default BootScene;
