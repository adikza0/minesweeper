import { Matrix } from './Matrix.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let columns = urlParams.get('columns');
let rows = urlParams.get('rows');
let mines = urlParams.get('mines');


if (columns < 5 || columns === null) {
  columns = 10;
}
if (rows < 5 || rows === null) {
  rows = 10;
}
if(mines === null ){
  mines = 8;
}

const matrix = new Matrix(rows, columns, mines);
handleGameStatus(matrix)




export function generateHTML(matrix) {
  let gameHTML = '';
  for (let i = 0; i < matrix.rows; i++) {
    gameHTML += '<div class="row">';
    for (let j = 0; j < matrix.columns; j++) {
      let content = '';
      if (matrix.matrix[i][j].isRevealed) {
        if (matrix.matrix[i][j].isMine) {
          content = '💣';
        } else {
          if (matrix.matrix[i][j].adjacentMines === 0) {
            content = ''
          } else {
            content = matrix.matrix[i][j].adjacentMines;
          }
        }
      } else {
        if (matrix.matrix[i][j].isFlagged) {
          content = '🚩';
        } else {
          content = '';
        }
      }
      gameHTML += `<div class="cell${matrix.matrix[i][j].isRevealed ? ' revealed' : ''}${matrix.failedCell && i === matrix.failedCell.y && j === matrix.failedCell.x ? ' failed' : ''}" data-x="${j}" data-y="${i}">${content}</div>`;
    }
    gameHTML += '</div>';
  }
  document.querySelector('.js-game-container').innerHTML = gameHTML;
};

export function handleGameStatus(matrix) {
  if (matrix.gameOver) {
    matrix.revealMines();
    generateHTML(matrix);
    showAlert('YOU LOST!');
  } else if (matrix.gameWon) {
    generateHTML(matrix);
    showAlert('YOU WON!');
  } else {
    generateHTML(matrix);
    addEventListeners(matrix);
  }
}

function showAlert(message) {
  setTimeout(() => {
    alert(message);
  }, 1);
}




function addEventListeners(matrix) {
  document.addEventListener('contextmenu', event => {
    event.preventDefault();
  })
  let isRMBClicked = false;
  document.addEventListener("mousedown", (event) => {
    if (event.button === 2) { // 2 is the code for the right mouse button
      isRMBClicked = true;
    }
  });
  document.addEventListener("mouseup", (event) => {
    if (event.button === 2) { // 2 is the code for the right mouse button
      isRMBClicked = false;
    }
  });
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cell => {
      const x = parseInt(cell.target.dataset.x);
      const y = parseInt(cell.target.dataset.y);
      if (!matrix.matrix[y][x].isRevealed && !isRMBClicked) {
        matrix.revealCell(x, y);
        handleGameStatus(matrix)
      } else {
        if (matrix.matrix[y][x].adjacentMines !== 0 && isRMBClicked) {
          matrix.revealAdjacent(x, y);
          handleGameStatus(matrix)
        }
      }
    })


    cell.addEventListener('contextmenu', cell => {
      const x = parseInt(cell.target.dataset.x);
      const y = parseInt(cell.target.dataset.y);
      if (!matrix.matrix[y][x].isRevealed) {
        matrix.changeFlagStateOnCell(x, y);
        handleGameStatus(matrix)
      }
    })
  })
}