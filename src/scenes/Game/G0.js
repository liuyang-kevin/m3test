import Phaser from 'phaser';
import image from './../../assets/images/logo.png';
import imgOrbs from './../../assets/sprites/orbs.png';

const orbSize = 100;
class G0 extends Phaser.Scene {
  constructor() {
    super({ key: 'G0' });
  }

  preload() {
    // Load all images sounds sprite.
    this.load.image('logo', image);
    this.load.spritesheet('orbs', imgOrbs, orbSize, orbSize);
  }

  create() {
    this.add.text(10, 10, 'Phaser 3 Advanced webpack boilerplate');
    this.add.image(300, 300, 'logo');
  }
}

function drawField() {
  orbGroup = game.add.group();
  for (var i = 0; i < fieldSize; i++) {
    gameArray[i] = [];
    for (var j = 0; j < fieldSize; j++) {
      var orb = game.add.sprite(orbSize * j + orbSize / 2, orbSize * i + orbSize / 2, "orbs");
      orb.anchor.set(0.5);
      orbGroup.add(orb);
      do {
        var randomColor = game.rnd.between(0, orbColors - 1);
        orb.frame = randomColor;
        gameArray[i][j] = {
          orbColor: randomColor,
          orbSprite: orb
        }
      } while (isMatch(i, j));
    }
  }
  selectedOrb = null;
}

export default G0;
