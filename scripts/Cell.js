export class Cell {
  adjacentMines;
  isMine;
  isFlagged;
  isRevealed;
  x;
  y;

  constructor(x, y) {
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
    if(x !== undefined && y!== undefined){
      this.x = x;
      this.y = y;
    }
  }

  insertBomb() {
    this.isMine = true;
  }
  reveal() {
    this.isRevealed = true;
  }
}
