export class Cell {
  adjacentMines;
  isMine;
  isFlagged;
  isRevealed;

  constructor() {
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
  }

  insertBomb() {
    this.isMine = true;
  }
  reveal() {
    this.isRevealed = true;
  }
}
const cell = new Cell();