import { handleGameStatus } from '../../scripts/game.js';
import { Matrix } from '../../scripts/Matrix.js';

describe('game test suite', () => {
  afterAll(() => {
    document.querySelector('.js-game-container').innerHTML = '';
    document.querySelector('.js-score').innerHTML = '';
  })

  it('10x5 unrevealed matrix HTML check', () => {
    const matrix = new Matrix(5, 10, 5);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-game-container').innerHTML).toEqual(`<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell" data-x="2" data-y="0"></div><div class="cell" data-x="3" data-y="0"></div><div class="cell" data-x="4" data-y="0"></div><div class="cell" data-x="5" data-y="0"></div><div class="cell" data-x="6" data-y="0"></div><div class="cell" data-x="7" data-y="0"></div><div class="cell" data-x="8" data-y="0"></div><div class="cell" data-x="9" data-y="0"></div></div><div class="row"><div class="cell" data-x="0" data-y="1"></div><div class="cell" data-x="1" data-y="1"></div><div class="cell" data-x="2" data-y="1"></div><div class="cell" data-x="3" data-y="1"></div><div class="cell" data-x="4" data-y="1"></div><div class="cell" data-x="5" data-y="1"></div><div class="cell" data-x="6" data-y="1"></div><div class="cell" data-x="7" data-y="1"></div><div class="cell" data-x="8" data-y="1"></div><div class="cell" data-x="9" data-y="1"></div></div><div class="row"><div class="cell" data-x="0" data-y="2"></div><div class="cell" data-x="1" data-y="2"></div><div class="cell" data-x="2" data-y="2"></div><div class="cell" data-x="3" data-y="2"></div><div class="cell" data-x="4" data-y="2"></div><div class="cell" data-x="5" data-y="2"></div><div class="cell" data-x="6" data-y="2"></div><div class="cell" data-x="7" data-y="2"></div><div class="cell" data-x="8" data-y="2"></div><div class="cell" data-x="9" data-y="2"></div></div><div class="row"><div class="cell" data-x="0" data-y="3"></div><div class="cell" data-x="1" data-y="3"></div><div class="cell" data-x="2" data-y="3"></div><div class="cell" data-x="3" data-y="3"></div><div class="cell" data-x="4" data-y="3"></div><div class="cell" data-x="5" data-y="3"></div><div class="cell" data-x="6" data-y="3"></div><div class="cell" data-x="7" data-y="3"></div><div class="cell" data-x="8" data-y="3"></div><div class="cell" data-x="9" data-y="3"></div></div><div class="row"><div class="cell" data-x="0" data-y="4"></div><div class="cell" data-x="1" data-y="4"></div><div class="cell" data-x="2" data-y="4"></div><div class="cell" data-x="3" data-y="4"></div><div class="cell" data-x="4" data-y="4"></div><div class="cell" data-x="5" data-y="4"></div><div class="cell" data-x="6" data-y="4"></div><div class="cell" data-x="7" data-y="4"></div><div class="cell" data-x="8" data-y="4"></div><div class="cell" data-x="9" data-y="4"></div></div>`)
  })
  it('4x4 partly revealed matrix HTML check', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[1][1].insertBomb();
    matrix.matrix[0][1].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(3, 3);

    handleGameStatus(matrix)
    expect(document.querySelector('.js-game-container').innerHTML).toEqual(`<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell revealed" data-x="2" data-y="0">2</div><div class="cell revealed" data-x="3" data-y="0"></div></div><div class="row"><div class="cell" data-x="0" data-y="1"></div><div class="cell" data-x="1" data-y="1"></div><div class="cell revealed" data-x="2" data-y="1">2</div><div class="cell revealed" data-x="3" data-y="1"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="2">1</div><div class="cell revealed" data-x="1" data-y="2">1</div><div class="cell revealed" data-x="2" data-y="2">1</div><div class="cell revealed" data-x="3" data-y="2"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="3"></div><div class="cell revealed" data-x="1" data-y="3"></div><div class="cell revealed" data-x="2" data-y="3"></div><div class="cell revealed" data-x="3" data-y="3"></div></div>`);
  })


  it('HTML check of right clicking cells', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(2, 2);
    matrix.changeFlagStateOnCell(0, 0);
    matrix.changeFlagStateOnCell(2, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-game-container').innerHTML).toEqual('<div class="row"><div class="cell" data-x="0" data-y="0">🚩</div><div class="cell" data-x="1" data-y="0"></div><div class="cell" data-x="2" data-y="0">🚩</div><div class="cell" data-x="3" data-y="0"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="1">1</div><div class="cell revealed" data-x="1" data-y="1">2</div><div class="cell revealed" data-x="2" data-y="1">1</div><div class="cell revealed" data-x="3" data-y="1">1</div></div><div class="row"><div class="cell revealed" data-x="0" data-y="2"></div><div class="cell revealed" data-x="1" data-y="2"></div><div class="cell revealed" data-x="2" data-y="2"></div><div class="cell revealed" data-x="3" data-y="2"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="3"></div><div class="cell revealed" data-x="1" data-y="3"></div><div class="cell revealed" data-x="2" data-y="3"></div><div class="cell revealed" data-x="3" data-y="3"></div></div>');
  });

  it('gameOver tests', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    expect(matrix.gameOver).toEqual(false);
    matrix.revealCell(3, 3);
    matrix.revealCell(0, 0);
    expect(matrix.gameOver).toEqual(true);
  })

  it('failedCell tests', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    expect(matrix.failedCell).toEqual(undefined);
    matrix.revealCell(3, 3);
    matrix.revealCell(0, 0)
    expect(matrix.failedCell.x).toEqual(0);
    expect(matrix.failedCell.y).toEqual(0);
  })

  it('revealMines tests', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][1].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.matrix[0][3].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealMines();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 0) {
          expect(matrix.matrix[i][j].isRevealed).toEqual(true);
        } else {
          expect(matrix.matrix[i][j].isRevealed).toEqual(false);
        }
      }
    }
  })

  it('handleGameStatus tests', (done) => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.bombCount = 2;
    spyOn(window, 'alert').and.stub();
    spyOn(matrix, 'revealMines');
    handleGameStatus(matrix);
    expect(document.querySelector('.js-game-container').innerHTML).toEqual('<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell" data-x="2" data-y="0"></div><div class="cell" data-x="3" data-y="0"></div></div><div class="row"><div class="cell" data-x="0" data-y="1"></div><div class="cell" data-x="1" data-y="1"></div><div class="cell" data-x="2" data-y="1"></div><div class="cell" data-x="3" data-y="1"></div></div><div class="row"><div class="cell" data-x="0" data-y="2"></div><div class="cell" data-x="1" data-y="2"></div><div class="cell" data-x="2" data-y="2"></div><div class="cell" data-x="3" data-y="2"></div></div><div class="row"><div class="cell" data-x="0" data-y="3"></div><div class="cell" data-x="1" data-y="3"></div><div class="cell" data-x="2" data-y="3"></div><div class="cell" data-x="3" data-y="3"></div></div>')
    expect(window.alert).toHaveBeenCalledTimes(0);
    expect(matrix.revealMines).toHaveBeenCalledTimes(0);
    matrix.revealCell(2, 2);
    handleGameStatus(matrix);
    expect(document.querySelector('.js-game-container').innerHTML).toEqual('<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell" data-x="2" data-y="0"></div><div class="cell" data-x="3" data-y="0"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="1">1</div><div class="cell revealed" data-x="1" data-y="1">2</div><div class="cell revealed" data-x="2" data-y="1">1</div><div class="cell revealed" data-x="3" data-y="1">1</div></div><div class="row"><div class="cell revealed" data-x="0" data-y="2"></div><div class="cell revealed" data-x="1" data-y="2"></div><div class="cell revealed" data-x="2" data-y="2"></div><div class="cell revealed" data-x="3" data-y="2"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="3"></div><div class="cell revealed" data-x="1" data-y="3"></div><div class="cell revealed" data-x="2" data-y="3"></div><div class="cell revealed" data-x="3" data-y="3"></div></div>');
    matrix.revealCell(0, 0);
    handleGameStatus(matrix);
    setTimeout(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(matrix.revealMines).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  })
  it('updateRemainingFlags html tests', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.bombCount = 2;
    matrix.changeFlagStateOnCell(0, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩2');
    matrix.revealCell(2, 2);
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩2');
    matrix.changeFlagStateOnCell(1, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩1');
    matrix.changeFlagStateOnCell(1, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩2');
    matrix.changeFlagStateOnCell(1, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩1');
    matrix.changeFlagStateOnCell(2, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩0');
    matrix.changeFlagStateOnCell(0, 0);
    handleGameStatus(matrix)
    expect(document.querySelector('.js-score').innerHTML).toEqual('🚩-1');
  })
}
)