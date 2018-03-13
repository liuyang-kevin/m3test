import Phaser from 'phaser';
import imgOrbs from './../../assets/sprites/orbs.png';
import { M3CONFIG } from './../../common';
import { Swap, Gem } from './../../data/Swap';

const orbSize = 100;
let canPick = true;
let selectedOrb;

const defaultGemTypes = 6;
const defaultFieldSize = 9;
const defaultLevel = {
  tiles: [
    [1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  targetScore: 1000,
  moves: 15
};

class G0 extends Phaser.Scene {
  numColumns;
  numRows;
  numGemTypes;
  level;
  spriteGroup;
  gemMap;
  possibleSwaps = [];
  constructor() {
    super({ key: 'G0', active: true });
  }

  preload() {
    // this.load.image('orbs', imgOrbs);
    // console.dir(this);
    this.load.spritesheet('orbs', imgOrbs, { frameWidth: orbSize, frameHeight: orbSize });
  }

  create() {
    this.initChessBoard();
    this.detectPossibleSwaps();
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
    // console.log(this.gemMap);
    console.log(this.possibleSwaps);
  }

  initChessBoard(
    numColumns = defaultFieldSize,
    numRows = defaultFieldSize,
    numGemTypes = defaultGemTypes,
    level = defaultLevel
  ) {
    // init data structure
    // console.dir(this);
    this.numGemTypes = numGemTypes;
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.level = level;
    this.gemMap = [];
    // recreate sprite
    this.children.removeAll();
    this.drawField(numColumns, numRows, numGemTypes, level);
  }

  drawField(numColumns, numRows, numTypes, level) {
    let padding = M3CONFIG.padding;
    let blockSize = (this.sys.game.config.width - (M3CONFIG.padding << 1)) / numColumns;
    let ratio = blockSize / orbSize;
    this.spriteGroup = this.add.group();
    for (let i = 0; i < numColumns; i++) {
      this.gemMap[i] = [];
      for (let j = 0; j < numRows; j++) {
        if (level.tiles && level.tiles[i] && level.tiles[i][j]) {
          let sprite = this.add.sprite(
            blockSize * j + (blockSize >> 1) + padding,
            blockSize * i + (blockSize >> 1) + padding,
            'orbs'
          );
          sprite.setScale(ratio, ratio);
          this.spriteGroup.add(sprite);
          do {
            let randomColor = Phaser.Math.RND.between(0, this.numGemTypes - 1);
            sprite.setFrame(randomColor);
            this.gemMap[i][j] = new Gem(j, i, randomColor, sprite);
          } while (this.hasChainAtColumn(i, j));
          // this.hasChainAtColumn(i, j)
          // this.isMatch(i, j)
        } else {
          // this.gemMap[i][j] = new Gem(i, j, -1);
        }
      }
    }
    selectedOrb = null;
  }

  isMatch(row, col) {
    return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
  }

  isHorizontalMatch(row, col) {
    let c = this.gemColorAt(row, col);
    let c_1 = this.gemColorAt(row, col - 1);
    let c_2 = this.gemColorAt(row, col - 2);
    return c === c_1 && c === c_2;
  }

  isVerticalMatch(row, col) {
    let c = this.gemColorAt(row, col);
    let c_1 = this.gemColorAt(row - 1, col);
    let c_2 = this.gemColorAt(row - 2, col);
    return c === c_1 && c === c_2;
  }

  gemAt(row, col) {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numColumns) {
      return -1;
    }
    return this.gemMap[row][col];
  }

  gemColorAt(row, col) {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numColumns) {
      return -1;
    }
    if (this.gemMap[row][col]) {
      return this.gemMap[row][col].gemType;
    }
    return -1;
  }

  loadLevelJson(json = {}) {
    console.log(json);
  }

  tileAtColumn(column, row) {
    return gameArray[row][column];
  }

  isPossibleSwap(other) {
    // for (let i = 0; i < this.possibleSwaps.length; i++) {
    //   var possibleSwap = this.possibleSwaps[i];
    //
    //   var isPossible = (this.isTwoCookiesEquals(other.cookieA, possibleSwap.cookieA) && this.isTwoCookiesEquals(other.cookieB, possibleSwap.cookieB)) ||
    //     (this.isTwoCookiesEquals(other.cookieB, possibleSwap.cookieA) && this.isTwoCookiesEquals(other.cookieA, possibleSwap.cookieB));
    //
    //   if (isPossible) return true;
    // }
    return false;
  }

  detectPossibleSwaps() {
    let possibleSwaps = [];
    for (let row = 0; row < this.numRows; row++) {
      for (let column = 0; column < this.numColumns; column++) {
        let gemA = this.gemMap[column][row];
        if (gemA) {
          // Is it possible to swap this cookie with the one on the right?
          if (column < this.numColumns - 1) {
            // Have a cookie in this spot? If there is no tile, there is no cookie.
            let gemB = this.gemMap[column + 1][row];
            if (gemB) {
              // Swap them
              this.gemMap[column][row] = gemB;
              this.gemMap[column + 1][row] = gemA;

              // Is either cookie now part of a chain?
              if (this.hasChainAtColumn(column + 1, row) || this.hasChainAtColumn(column, row)) {
                let swap = new Swap(gemA, gemB);
                possibleSwaps.push(swap);
              }

              // Swap them back
              this.gemMap[column][row] = gemA;
              this.gemMap[column + 1][row] = gemB;
            }
          }

          if (row < this.numRows - 1) {
            let gemB = this.gemMap[column][row + 1];
            if (gemB) {
              // Swap them
              this.gemMap[column][row] = gemB;
              this.gemMap[column][row + 1] = gemA;

              if (this.hasChainAtColumn(column, row + 1) || this.hasChainAtColumn(column, row)) {
                let swap = new Swap(gemA, gemB);
                possibleSwaps.push(swap);
              }

              this.gemMap[column][row] = gemA;
              this.gemMap[column][row + 1] = gemB;
            }
          }
        }
      }
    }

    this.possibleSwaps = possibleSwaps;
  }

  // shuffle() {
  //   let set = Cookie[];
  //
  //   do {
  //     set = this.createInitialCookies();
  //     this.detectPossibleSwaps();
  //   } while (this.possibleSwaps.length == 0)
  //
  //   console.log(this.possibleSwaps);
  //
  //   return set;
  // }
  /*
  * 横向左右查找 符合 +1
  * or
  * 竖向上下查找 符合 +1
  * 判断链子长度即可
  * */
  hasChainAtColumn(column, row) {
    let gemType;
    let gem = this.gemMap[column][row];
    if (gem) {
      gemType = gem.gemType;
    } else {
      gemType = -1;
    }

    let horzLength = 1;
    for (
      let i = column - 1;
      i >= 0 && this.gemMap[i][row] && this.gemMap[i][row].gemType === gemType;
      i--, horzLength++
    ) {}
    for (
      let i = column + 1;
      i < this.numColumns &&
      this.gemMap[i] &&
      this.gemMap[i][row] &&
      this.gemMap[i][row].gemType === gemType;
      i++, horzLength++
    ) {}
    if (horzLength >= 3) return true;

    let vertLength = 1;
    for (
      let i = row - 1;
      i >= 0 && this.gemMap[column][i] && this.gemMap[column][i].gemType === gemType;
      i--, vertLength++
    ) {}
    for (
      let i = row + 1;
      i < this.numRows && this.gemMap[column][i] && this.gemMap[column][i].gemType === gemType;
      i++, vertLength++
    ) {}
    return vertLength >= 3;
  }
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
