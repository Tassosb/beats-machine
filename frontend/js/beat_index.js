const Matrix = require('./matrix');

class BeatIndex {
  constructor (el, selectBeat, currentBeatId) {
    this.selectBeat = selectBeat;
    this.el = el;
    this.beats = [];
    this.currentBeatId = currentBeatId;
  }

  changeSelected (id) {
    this.currentBeatId = id;
    this.render();
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
      $l(li).on('click', () => {
        this.selectBeat(beat.id);
      });
      if (this.currentBeatId === beat.id) {
        $l(li).addClass('selected');
      }
      ul.append(li);
      new Matrix(li, false, this.unselectBeat, beat.sound);
      li.innerHTML += beat.name;
    });

    this.el.append(ul);
  }
}

module.exports = BeatIndex;
