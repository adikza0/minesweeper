import { generateHTML } from '../../scripts/game.js';
import { Matrix } from '../../scripts/Matrix.js';

describe('game test suite', () => {

  it('10x5 unrevealed matrix HTML check', () => {
    const matrix = new Matrix(5, 10, 5);
    generateHTML(matrix);
    expect(document.querySelector('.js-game-container').innerHTML).toEqual(`<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell" data-x="2" data-y="0"></div><div class="cell" data-x="3" data-y="0"></div><div class="cell" data-x="4" data-y="0"></div><div class="cell" data-x="5" data-y="0"></div><div class="cell" data-x="6" data-y="0"></div><div class="cell" data-x="7" data-y="0"></div><div class="cell" data-x="8" data-y="0"></div><div class="cell" data-x="9" data-y="0"></div></div><div class="row"><div class="cell" data-x="0" data-y="1"></div><div class="cell" data-x="1" data-y="1"></div><div class="cell" data-x="2" data-y="1"></div><div class="cell" data-x="3" data-y="1"></div><div class="cell" data-x="4" data-y="1"></div><div class="cell" data-x="5" data-y="1"></div><div class="cell" data-x="6" data-y="1"></div><div class="cell" data-x="7" data-y="1"></div><div class="cell" data-x="8" data-y="1"></div><div class="cell" data-x="9" data-y="1"></div></div><div class="row"><div class="cell" data-x="0" data-y="2"></div><div class="cell" data-x="1" data-y="2"></div><div class="cell" data-x="2" data-y="2"></div><div class="cell" data-x="3" data-y="2"></div><div class="cell" data-x="4" data-y="2"></div><div class="cell" data-x="5" data-y="2"></div><div class="cell" data-x="6" data-y="2"></div><div class="cell" data-x="7" data-y="2"></div><div class="cell" data-x="8" data-y="2"></div><div class="cell" data-x="9" data-y="2"></div></div><div class="row"><div class="cell" data-x="0" data-y="3"></div><div class="cell" data-x="1" data-y="3"></div><div class="cell" data-x="2" data-y="3"></div><div class="cell" data-x="3" data-y="3"></div><div class="cell" data-x="4" data-y="3"></div><div class="cell" data-x="5" data-y="3"></div><div class="cell" data-x="6" data-y="3"></div><div class="cell" data-x="7" data-y="3"></div><div class="cell" data-x="8" data-y="3"></div><div class="cell" data-x="9" data-y="3"></div></div><div class="row"><div class="cell" data-x="0" data-y="4"></div><div class="cell" data-x="1" data-y="4"></div><div class="cell" data-x="2" data-y="4"></div><div class="cell" data-x="3" data-y="4"></div><div class="cell" data-x="4" data-y="4"></div><div class="cell" data-x="5" data-y="4"></div><div class="cell" data-x="6" data-y="4"></div><div class="cell" data-x="7" data-y="4"></div><div class="cell" data-x="8" data-y="4"></div><div class="cell" data-x="9" data-y="4"></div></div>`)
  })
  it('4x4 partly revealed matrix HTML check', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[1][1].insertBomb();
    matrix.matrix[0][1].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(0, 1);
    matrix.revealCell(0, 2);
    matrix.revealCell(1, 2);
    matrix.revealCell(2, 2);
    matrix.revealCell(2, 1);
    matrix.revealCell(2, 0);
    generateHTML(matrix);
    expect(document.querySelector('.js-game-container').innerHTML).toEqual(`<div class="row"><div class="cell" data-x="0" data-y="0"></div><div class="cell" data-x="1" data-y="0"></div><div class="cell revealed" data-x="2" data-y="0">2</div><div class="cell" data-x="3" data-y="0"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="1">3</div><div class="cell" data-x="1" data-y="1"></div><div class="cell revealed" data-x="2" data-y="1">2</div><div class="cell" data-x="3" data-y="1"></div></div><div class="row"><div class="cell revealed" data-x="0" data-y="2">1</div><div class="cell revealed" data-x="1" data-y="2">1</div><div class="cell revealed" data-x="2" data-y="2">1</div><div class="cell" data-x="3" data-y="2"></div></div><div class="row"><div class="cell" data-x="0" data-y="3"></div><div class="cell" data-x="1" data-y="3"></div><div class="cell" data-x="2" data-y="3"></div><div class="cell" data-x="3" data-y="3"></div></div>`);
  })
  afterAll(() => {
    document.querySelector('.js-game-container').innerHTML = '';
  })
}
)
