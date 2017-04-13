const BeatMachine = require('./beat_machine');
const BeatIndex = require('./beat_index');

class App {
  constructor () {
    this.beats = {};
    this.currentBeatId = 0;

    this.fetchBeats();

    this.beatIndex = new BeatIndex(
      document.getElementById('beat-index'),
      this.selectBeat.bind(this)
    );

    this.beatMachine = new BeatMachine(
      document.getElementById('matrix'),
      this.receiveBeat.bind(this),
      this.beats[this.currentBeatId]
    );
  }

  selectBeat (id) {
    this.currentBeatId = id;
    this.render();
  }

  render () {
    this.beatMachine.changeBeat(this.beats[this.currentBeatId]);
  }

  fetchBeats() {
    $l.ajax({
      method: 'GET',
      url: '/beats',
      success: this.receiveAllBeats.bind(this)
    });
  }

  receiveAllBeats (beats) {
    this.beats = beats;
    this.beatIndex.receiveAllBeats(this.beatList());

  }

  beatList() {
    return Object.keys(this.beats).map((beatId) => this.beats[beatId]);
  }

  receiveBeat(beat) {
    this.beats.push(beat);
    this.render();
  }

  // receiveBeat (beat) {
  //   this.beatIndex.receiveBeat(beat);
  // }
}

module.exports = App;
