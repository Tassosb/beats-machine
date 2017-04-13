const Column = require('./column.js');

class Matrix {
  constructor (el, startState = Matrix.DEFAULT_STATE) {
    this.el = el;
    this.ul = document.createElement('ul');
    this.el.appendChild(this.ul);

    this.columns = this.generateColumns(startState);
    this.render();
  }

  generateColumns(startState) {
    return startState.map((colState) => {
      const colEl = document.createElement('li');
      this.ul.appendChild(colEl);
      return new Column(colEl, colState);
    });
  }

  clear () {
    this.eachCol((col) => col.clear());
  }

  render (currColIdx = -1) {
    this.eachCol((col, idx) => {
      const playing = (idx === currColIdx);
      col.render(playing);
    });
  }

  eachCol (cb) {
    this.columns.forEach(cb);
  }

  stringify() {
    return this.columns.map((col) => col.stringify()).join('');
  }
}

Matrix.NUM_ROWS = 6;
Matrix.NUM_COLUMNS = 10;
Matrix.DEFAULT_STATE = [
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

module.exports = Matrix;
