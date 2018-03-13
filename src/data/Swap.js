const spriteNames = ['Croissant', 'Cupcake', 'Danish', 'Donut', 'Macaroon', 'SugarCookie'];
const highlightedSpriteNames = [
  'Croissant-Highlighted',
  'Cupcake-Highlighted',
  'Danish-Highlighted',
  'Donut-Highlighted',
  'Macaroon-Highlighted',
  'SugarCookie-Highlighted'
];
export class Gem extends Object {
  column;
  row;
  gemType;
  sprite;

  constructor(column, row, gemType, sprite) {
    super();
    this.column = column;
    this.row = row;
    this.gemType = gemType;
    this.sprite = sprite;
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
