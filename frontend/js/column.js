const Tile = require('./tile.js');

class Column {
  constructor (el, state) {
    $l(el).addClass('column');
    this.el = el;
    this.ul = document.createElement('ul');
    this.el.appendChild(this.ul);
    this.tiles = this.generateTiles(state);
  }

  generateTiles(state) {
    return state.map((tileState) => {
      const tileEl = document.createElement('li');
      this.ul.append(tileEl);
      return new Tile(tileEl, tileState);
    });
  }

  clear () {
    this.eachTile((tile) => tile.clear());
  }

  render (playing = false) {
    this.eachTile((tile) => tile.render(playing));
  }

  eachTile (cb) {
    this.tiles.forEach(cb);
  }

  stringify () {
    return this.tiles.map((tile) => tile.stringify()).join("");
  }
}

module.exports = Column;
