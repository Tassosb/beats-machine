const Column = require('./column.js');

class Matrix {
  constructor (el, focus, startState) {
    this.el = el;
    this.ul = document.createElement('ul');
    this.el.appendChild(this.ul);
    this.focus = focus;

    this.generateColumns(startState);
    this.render();
  }

  generateColumns(startState = Matrix.DEFAULT_STATE) {
    $l(this.ul).empty();
    this.columns = this.parseState(startState).map((colState) => {
      const colEl = document.createElement('li');
      this.ul.appendChild(colEl);
      return new Column(colEl, colState, this.focus);
    });
  }

  parseState (state) {
    if (typeof state === 'string') {
      const parsed = [];
      for (let i = 0; i < Matrix.NUM_COLUMNS; i++) {
        parsed.push([]);
      }

      for (let i = 0; i < state.length; i++) {
        parsed[i % Matrix.NUM_COLUMNS].push(parseInt(state[i]));
      }
      return parsed;
    } else {
      return state;
    }
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
