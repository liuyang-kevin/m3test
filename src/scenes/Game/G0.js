import Phaser from 'phaser';
import imgOrbs from './../../assets/sprites/orbs.png';
import { M3CONFIG } from './../../common';
import { Swap, Gem, emptySpace, noGem } from './../../data/Swap';

const orbSize = 100;

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
  isPossibleSwap;
  swipeFromColumn;
  swipeFromRow;
  userInteractionEnabled;
  constructor() {
    super({ key: 'G0', active: true });
  }

  preload() {
    // this.load.image('orbs', imgOrbs);
    // console.dir(this);
    this.load.spritesheet('orbs', imgOrbs, { frameWidth: orbSize, frameHeight: orbSize });
  }

  create() {
    // let sprite = new Gem(0, 0, 0, this, 400, 100, 'orbs');
    // this.sys.displayList.add(sprite);
    // this.sys.updateList.add(sprite);
    // console.dir(sprite);
    this.initChessBoard();
    this.detectPossibleSwaps();
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

    this.input.topOnly = true;
    // this.input.on('pointerdown', this.touchesBegan, this);
    this.input.on('gameobjectdown', (pointer, gameObject) => {
      gameObject.setTint(0xff0000);
    });

    this.input.on('gameobjectup', (pointer, gameObject) => {
      gameObject.clearTint();
    });

    this.input.on('gameobjectmove', (pointer, gameObject) => {
      gameObject.setTint(Math.random() * 16000000);
    });
    // this.input.setDraggable(this.gemMap[0][0]);
    // this.input.on('DRAG_EVENT', event => {
    //   console.log(event);
    //   event.gameObject.x = event.pointer.x - event.input.dragX;
    //   event.gameObject.y = event.pointer.y - event.input.dragY;
    // });

    // this.input.events.on(
    //   'pointerup',
    //   (pointer, sprite) => {
    //     console.log('uuuu');
    //     console.log(sprite);
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
    // init operative
    this.swipeFromColumn = null;
    this.swipeFromRow = null;
    this.isPossibleSwap = true;

    console.log('add touches to sprites');
    this.gemMap.forEach(col => {
      col.forEach(gem => {
        // console.log(gem);
        gem.setInteractive();
        // gem.sprite.on(
        //   'pointerdown',
        //   (pointer, b, c, d, e, f, g) => {
        //     console.log('dddd');
        //     console.log(pointer.gameObject);
        //   },
        //   this
        // );
        // gem.sprite.on(
        //   'pointerup',
        //   pointer => {
        //     console.log('uuuu');
        //   },
        //   this
        // );
        // createdCookie.inputEnabled = true;
        // createdCookie.events.onInputDown.add(this.touchesBegan, this);
        // createdCookie.events.onInputUp.add(this.touchesEnd, this);
        // cookie.sprite = createdCookie;
      });
    });
    console.log('======================');
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
          let sprite = new Gem(
            i,
            j,
            noGem,
            this,
            blockSize * j + (blockSize >> 1) + padding,
            blockSize * i + (blockSize >> 1) + padding,
            'orbs'
          );
          sprite.setScale(ratio, ratio);
          this.spriteGroup.add(sprite);
          this.gemMap[i][j] = sprite;
          do {
            let randomType = Phaser.Math.RND.between(0, this.numGemTypes - 1);
            sprite.setFrame(randomType);
            sprite.gemType = randomType;
          } while (this.hasChainAtColumn(i, j));

          this.sys.displayList.add(sprite);
          this.sys.updateList.add(sprite);
        } else {
          // this.gemMap[i][j] = new Gem(i, j, -1);
        }
      }
    }
  }

  gemAt(col, row) {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numColumns) {
      return -1;
    }
    return this.gemMap[col][row];
  }

  gemColorAt(col, row) {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numColumns) {
      return emptySpace;
    }
    if (this.gemMap[col][row]) {
      return this.gemMap[col][row].gemType;
    }
    return emptySpace;
  }

  loadLevelJson(json = {}) {
    console.log(json);
  }

  tileAtColumn(column, row) {
    return gameArray[row][column];
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

  shuffle() {
    let gemMap = [];
    do {
      gemMap = this.shuffleGems();
      this.detectPossibleSwaps();
    } while (this.possibleSwaps.length === 0);
    // console.log(this.possibleSwaps);
    this.gemMap = gemMap;
  }

  shuffleGems() {
    let gemMap = [];
    for (let column = 0; column < this.numColumns; column++) {
      for (let row = 0; row < this.numRows; row++) {
        let gem = this.gemAt(column, row);
        if (gem) {
          // 本位置有💎， 随机一个合法位置，看看有没有
          console.log('-------');
          let randomGem;
          do {
            let randomC = Phaser.Math.RND.between(0, this.numColumns - 1);
            let randomR = Phaser.Math.RND.between(0, this.numRows - 1);
            randomGem = this.gemAt(randomC, randomR);
            // console.log(gem);
            console.log(randomGem);
            console.log(`rc:${randomC} | rr:${randomR}`)
          } while (!randomGem);
        } else {
        }

        // if (this.gemMap[column][row] != null) {
        //   var cookie: Cookie = this.createCookieAtColumn(column, row, cookieType);
        //   array.push(cookie);
        // } else {
        //   this.cookies[column][row] = null;
        // }
      }
    }

    return gemMap;
  }

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

  touchesEnd(selectedGem, pointer) {
    this.swipeFromColumn = this.swipeFromRow = null;
    //console.log('releaseCookie', selectedCookie);
    //console.log('up from', selectedGem);
    //console.log('touchesEnd pointer', pointer.position);
    if (this.isPossibleSwap) {
      this.handleMatches();
    }
    this.userInteractionEnabled = true;
  }

  touchesBegan(pointer, array) {
    if (array && array[0]) {
      let selectedGem = array[0];
      // console.log(selectedGem);
      this.swipeFromColumn = selectedGem.column;
      this.swipeFromRow = selectedGem.row;
      console.log('selectedCookie', 'column: ' + selectedGem.column + ' row: ' + selectedGem.row);
    } else {
      this.swipeFromColumn = null;
      this.swipeFromRow = null;
    }
  }
}

export default G0;
