import Phaser from 'phaser';

export const emptySpace = -1;
export const noGem = -2;
const spriteNames = ['Croissant', 'Cupcake', 'Danish', 'Donut', 'Macaroon', 'SugarCookie'];
const highlightedSpriteNames = [
  'Croissant-Highlighted',
  'Cupcake-Highlighted',
  'Danish-Highlighted',
  'Donut-Highlighted',
  'Macaroon-Highlighted',
  'SugarCookie-Highlighted'
];
export class Gem extends Phaser.GameObjects.Sprite {
  column;
  row;
  gemType;

  constructor(column, row, gemType, ...config) {
    // console.log(config);
    super(...config);
    this.column = column;
    this.row = row;
    this.gemType = gemType;
  }

  spriteName() {
    return spriteNames[this.gemType - 1];
  }
  highlightedSpriteName() {
    return highlightedSpriteNames[this.gemType - 1];
  }
}

export class Swap extends Object {
  gemA;
  gemB;
  constructor(gemA, gemB) {
    super();
    this.gemA = gemA;
    this.gemB = gemB;
  }
}

// export default Swap;
