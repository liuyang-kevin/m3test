import Phaser from 'phaser';
import imgOrbs from './../../assets/sprites/orbs.png';

const orbSize = 100;
const orbColors = 6;
const fieldSize = 7;
const gameArray = [];
let canPick = true;
let selectedOrb;
let orbGroup;

class G0 extends Phaser.Scene {
  drawField;
  constructor() {
    super({ key: 'G0' });
    this.drawField = drawField.bind(this);
  }

  preload() {
    // this.load.image('orbs', imgOrbs);
    // console.dir(this);
    this.load.spritesheet('orbs', imgOrbs, { frameWidth: orbSize, frameHeight: orbSize });
  }

  create() {
    this.add.text(10, 10, 'Phaser 3 Advanced webpack boilerplate');
    // let a = this.add.sprite(35, 50, 'orbs');
    // let a1 = this.add.sprite(95, 50, 'orbs');
    // let a2 = this.add.sprite(125, 50, 'orbs');
    // let a3 = this.add.sprite(155, 50, 'orbs');
    // let g = this.add.group();
    // g.add(a);
    // g.add(a1);
    // g.add(a2);
    // g.add(a3);
    // console.dir(a);
    // a.setFrame(Phaser.Math.RND.between(0, orbColors - 1));
    // a.texture.firstFrame = Phaser.Math.RND.between(0, orbColors - 1);

    this.drawField();
    canPick = true;
    // this.input.on('pointerdown', function (pointer) {
    //
    // }, this);
    // this.input.onDown.add(orbSelect);
    // this.input.on('pointerdown', orbSelect);
    // this.sys.game.input.onDown.add(orbSelect);
    // this.input.onUp.add(orbDeselect);
  }
}

function drawField() {
  orbGroup = this.add.group();
  for (let i = 0; i < fieldSize; i++) {
    gameArray[i] = [];
    for (let j = 0; j < fieldSize; j++) {
      let orb = this.add.sprite(orbSize * j + orbSize / 2, orbSize * i + orbSize / 2, 'orbs');
      // console.dir(orb);
      // orb.anchor.set(0.5);
      orbGroup.add(orb);
      do {
        let randomColor = Phaser.Math.RND.between(0, orbColors - 1);
        orb.setFrame(randomColor);
        gameArray[i][j] = {
          orbColor: randomColor,
          orbSprite: orb
        };
      } while (isMatch(i, j));
    }
  }
  selectedOrb = null;
}

function isMatch(row, col) {
  // return true;
  return isHorizontalMatch(row, col) || isVerticalMatch(row, col);
}

function isHorizontalMatch(row, col) {
  let c = gemAt(row, col).orbColor;
  let c_1 = gemAt(row, col - 1).orbColor;
  let c_2 = gemAt(row, col - 2).orbColor;
  return c === c_1 && c === c_2;
}

function isVerticalMatch(row, col){
  let c = gemAt(row, col).orbColor;
  let c_1 = gemAt(row - 1, col).orbColor;
  let c_2 = gemAt(row -2 , col).orbColor;
  return c === c_1 && c === c_2;
}

function gemAt(row, col) {
  if (row < 0 || row >= fieldSize || col < 0 || col >= fieldSize) {
    return -1;
  }
  return gameArray[row][col];
}

function orbSelect(e) {
  console.log('orbSelect');
  // if (canPick) {
  //   var row = Math.floor(e.clientY / orbSize);
  //   var col = Math.floor(e.clientX / orbSize);
  //   var pickedOrb = gemAt(row, col)
  //   if (pickedOrb != -1) {
  //     if (selectedOrb == null) {
  //       pickedOrb.orbSprite.scale.setTo(1.2);
  //       pickedOrb.orbSprite.bringToTop();
  //       selectedOrb = pickedOrb;
  //       game.input.addMoveCallback(orbMove);
  //     } else {
  //       if (areTheSame(pickedOrb, selectedOrb)) {
  //         selectedOrb.orbSprite.scale.setTo(1);
  //         selectedOrb = null;
  //       }
  //       else {
  //         if (areNext(pickedOrb, selectedOrb)) {
  //           selectedOrb.orbSprite.scale.setTo(1);
  //           swapOrbs(selectedOrb, pickedOrb, true);
  //         }
  //         else {
  //           selectedOrb.orbSprite.scale.setTo(1);
  //           pickedOrb.orbSprite.scale.setTo(1.2);
  //           selectedOrb = pickedOrb;
  //           game.input.addMoveCallback(orbMove);
  //         }
  //       }
  //     }
  //   }
  // }
}

export default G0;
