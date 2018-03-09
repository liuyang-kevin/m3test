import Phaser from 'phaser';
import imgOrbs from './../../assets/sprites/orbs.png';
import { M3CONFIG } from './../../common';

const orbSize = 100;
const orbColors = 6;
const fieldSize = 9;
const gameArray = [];
let canPick = true;
let selectedOrb;
let orbGroup;

let IJsonLevel = {
  tiles: [
    [1, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1]
  ],
  targetScore: 1000,
  moves: 15
};

class G0 extends Phaser.Scene {
  constructor() {
    super({ key: 'G0', active: true });
  }

  preload() {
    // this.load.image('orbs', imgOrbs);
    // console.dir(this);
    this.load.spritesheet('orbs', imgOrbs, { frameWidth: orbSize, frameHeight: orbSize });
  }

  create() {
    drawField.bind(this)();
    // this.drawField();
    canPick = true;
    // this.input.on('pointerdown', function (pointer) {
    //
    // }, this);
    // this.input.onDown.add(orbSelect);
    // this.input.on('pointerdown', orbSelect);
    // this.sys.game.input.onDown.add(orbSelect);
    // this.input.onUp.add(orbDeselect);
    // this.input.on(
    //   'pointerdown',
    //   pointer => {
    //     console.log('f');
    //   },
    //   this
    // );

    // console.dir(this);
  }

  initChessBoard(numColumns = fieldSize, numRows = fieldSize, numCookieTypes = orbColors) {
    console.dir(this);
    this.children.removeAll();
    let md = drawField.bind(this);
    md(numColumns, numRows, numCookieTypes, IJsonLevel);
  }

  loadLevelJson(json = {}) {
    console.log(json);
  }
}

function drawField(numColumns = fieldSize, numRows = fieldSize, numTypes = orbColors, level = {}) {
  let padding = M3CONFIG.padding;
  let blockSize = (this.sys.game.config.width - (M3CONFIG.padding << 1)) / fieldSize;
  let ratio = blockSize / orbSize;
  orbGroup = this.add.group();
  for (let i = 0; i < numRows; i++) {
    gameArray[i] = [];
    for (let j = 0; j < numColumns; j++) {
      if (level.tiles && level.tiles[i] && level.tiles[i][j]) {
        let orb = this.add.sprite(
          blockSize * j + (blockSize >> 1) + padding,
          blockSize * i + (blockSize >> 1) + padding,
          'orbs'
        );
        orb.setScale(ratio, ratio);
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
      } else {
        gameArray[i][j] = {
          orbColor: -1,
          orbSprite: null
        };
      }
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

function isVerticalMatch(row, col) {
  let c = gemAt(row, col).orbColor;
  let c_1 = gemAt(row - 1, col).orbColor;
  let c_2 = gemAt(row - 2, col).orbColor;
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
