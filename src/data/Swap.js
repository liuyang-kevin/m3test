const spriteNames = ['Croissant', 'Cupcake', 'Danish', 'Donut', 'Macaroon', 'SugarCookie'];
const highlightedSpriteNames = [
  'Croissant-Highlighted',
  'Cupcake-Highlighted',
  'Danish-Highlighted',
  'Donut-Highlighted',
  'Macaroon-Highlighted',
  'SugarCookie-Highlighted'
];
class Gem extends Object {
  column;
  row;
  gemType;
  sprite;

  constructor(column, row, gemType) {
    super();
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

class Swap extends Object {
  gemA;
  gemB;
  constructor(gemA, gemB) {
    super();
  }
}

export default Swap;
