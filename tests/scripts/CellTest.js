import {Cell} from '../../scripts/Cell.js';
describe('Cell tests', () => {
  it('constructor test', () => {
    const cell = new Cell();
    expect(cell.adjacentMines).toEqual(0);
    expect(cell.isMine).toEqual(false);
    expect(cell.isFlagged).toEqual(false);
    expect(cell.isRevealed).toEqual(false);
    expect(cell instanceof Cell).toEqual(true);
  })
  it('insertBomb test', () => {
    const cell = new Cell();
    expect(cell.isMine).toEqual(false);
    cell.insertBomb();
    expect(cell.isMine).toEqual(true);
  })
  it('reveal test', () => {
    const cell = new Cell();
    expect(cell.isRevealed).toEqual(false);
    cell.reveal();
    expect(cell.isRevealed).toEqual(true);
  })
})