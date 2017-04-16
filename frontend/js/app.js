const BeatMachine = require('./beat_machine');
const BeatIndex = require('./beat_index');

class App {
  constructor () {
    this.beats = {};
    this.currentBeatId = 0;

    this.fetchBeats();

    this.beatIndex = new BeatIndex(
      document.getElementById('beat-index'),
      this.selectBeat.bind(this),
      this.currentBeatId
    );

    this.beatMachine = new BeatMachine(
      document.getElementById('matrix'),
      this.receiveBeat.bind(this),
      this.deleteBeat.bind(this),
      this.unselectBeat.bind(this),
      this.beats[this.currentBeatId]
    );
  }

  deleteBeat (beat) {
    delete this.beats[beat.id];
    this.beatIndex.receiveAllBeats(this.beatList());
    this.currentBeatId = 0;
    this.beatMachine.changeBeat({});
  }

  selectBeat (id) {
    this.currentBeatId = id;
    this.beatMachine.changeBeat(this.beats[this.currentBeatId]);
    this.beatIndex.changeSelected(this.currentBeatId);
    document.querySelector('#save-button').setAttribute('disabled', true);
    document.querySelector('#delete-button').removeAttribute('disabled');
  }

  unselectBeat () {
    this.currentBeatId = 0;
    this.beatIndex.changeSelected(0);
    document.querySelector('#delete-button').setAttribute('disabled', true);
    document.querySelector('#save-button').removeAttribute('disabled');

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
    this.beats = Object.assign(
      {},
      this.beats,
      {[beat.id]: beat}
    );
    this.beatIndex.receiveBeat(beat);
    this.beatIndex.changeSelected(beat.id);
  }
}

module.exports = App;
