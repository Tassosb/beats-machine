const Matrix = require('./matrix');

class BeatIndex {
  constructor (el) {
    this.el = el;
    this.beats = [];
  }

  receiveAllBeats (beats) {
    this.beats = beats;
    this.render();
  }

  receiveBeat(beat) {
    this.beats.push(beat);
    this.render();
  }

  render () {
    $l(this.el).empty();
    const ul = document.createElement('ul');
    this.beats.forEach((beat) => {
      const li = document.createElement('li');
      $l(li).addClass('beat-index-item');
      li.innerHTML = beat.name;
      ul.append(li);
      const matrix = new Matrix(li, false, beat.sound);
    });

    this.el.append(ul);
  }
}

module.exports = BeatIndex;
