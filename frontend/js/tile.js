class Tile {
  constructor (el, state, focus) {
    $l(el).addClass('tile');
    this.el = el;
    this.activated = !!state;
    this.focus = focus;

    if (this.focus) {
      this.bindEvents();
      $l(this.el).addClass('enabled');
    }
  }

  render (playing) {
    if (playing) {
      $l(this.el).addClass('playing');
    } else {
      $l(this.el).removeClass('playing');
    }
    if (this.activated) {
      $l(this.el).addClass('activated');
    }
    else {
      $l(this.el).removeClass('activated');
    }
  }

  clear () {
    this.activated = false;
    this.render();
  }

  activate () {
    this.activated = true;
    this.render();
  }

  toggleActivated () {
    if (this.activated) {
      this.clear();
    } else {
      this.activate() ;
    }
  }

  stringify () {
    return this.activated ? '1' : '0';
  }

  bindEvents () {
    this.el.addEventListener('click', this.toggleActivated.bind(this));
  }
}

module.exports = Tile;
