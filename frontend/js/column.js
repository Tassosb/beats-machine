const Tile = require('./tile.js');

class Column {
  constructor (el, state, focus, unselectBeat) {
    $l(el).addClass('column');
    this.el = el;
    this.focus = focus;
    this.ul = document.createElement('ul');
    this.el.appendChild(this.ul);
    this.tiles = this.generateTiles(state, unselectBeat);
  }

  generateTiles(state, unselectBeat) {
    return state.map((tileState) => {
      const tileEl = document.createElement('li');
      this.ul.append(tileEl);
      return new Tile(tileEl, tileState, this.focus, unselectBeat);
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
