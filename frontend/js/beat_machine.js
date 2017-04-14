const Matrix = require('./matrix.js');
const PlayButton = require('./play_button');
const TempoBar = require('./tempo_bar');
const Tone = require('tone');

class BeatMachine {
  constructor (el, saveCallback, deleteCallback, currentBeat = {}) {
    this.beat = currentBeat;
    this.matrix = new Matrix(el, true, this.beat.sound);

    this.saveCallback = saveCallback;
    this.deleteCallback = deleteCallback;

    this.tempo = BeatMachine.DEFAULT_TEMPO;
    this.playing = false;
    this.clear = this.clear.bind(this);
    this.saveBeat = this.saveBeat.bind(this);
    this.deleteBeat = this.deleteBeat.bind(this);

    this.setupControls();
    this.setupAudio();
  }

  setupControls () {
    new PlayButton(this.handlePlayClick.bind(this));

    new TempoBar(
      this.changeTempo.bind(this),
      BeatMachine.DEFAULT_TEMPO
    );

    $l('#clear-button').on('click', this.clear);
    $l('#save-form').on('submit', this.saveBeat);
    $l('#delete-button').on('click', this.deleteBeat);
    document.querySelector('#save-form input[type=submit]').setAttribute('disabled', true);
    // document.querySelector('input[type=submit]').setAttribute('disabled', true);
  }

  changeBeat (newBeat) {
    this.beat = newBeat;
    this.matrix.generateColumns(this.beat.sound);
    this.matrix.render();
  }

  deleteBeat () {
    if (typeof this.beat.id === 'undefined') { return; }
    $l.ajax({
      url: `/beats/${this.beat.id}`,
      method: 'DELETE',
      success: this.deleteCallback
    });
  }

  saveBeat (e) {
    e.preventDefault();
    const name = document.querySelector('input[name="beat-name"]').value;

    document.querySelector('#save-form input[type=submit]').setAttribute('disabled', true);
    document.querySelector('input[name="beat-name"]').value = "";

    $l('.error-list').empty();

    $l.ajax({
      url: '/beats',
      method: 'POST',
      data: `sound=${this.matrix.stringify()}&name=${name}`,
      success: this.saveCallback,
      error: (errors) => {
        $l('.error-list').empty();
        if (errors.name) {
          $l('.error-list').append(`<li>Name ${errors.name}</li>`);
        }
        if (errors.author_id) {
          $l('.error-list').append('<li>Please log in</li>');
        }
        document.querySelector('#save-form input[type=submit]').removeAttribute('disabled');
      }
    });
  }

  setupAudio () {
    this.audioPlayer = new Tone.MultiPlayer({
      urls : BeatMachine.AUDIO_FILES,
      volume : -10,
      fadeOut : 0.1,
    }).toMaster();

    this.loop = new Tone.Sequence((time, col) => {
      var column = this.matrix.columns[col];
      this.matrix.render(col);
      for (let i = 0; i < Matrix.NUM_ROWS; i++){
        if (column.tiles[i].activated){
          //slightly randomized velocities
          var vel = Math.random() * 0.5 + 0.5;
          this.audioPlayer.start(
            BeatMachine.AUDIO_NAMES[i], time, 0, "32n", 0, vel
          );
        }
      }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], this.tempo);
    Tone.Transport.start();
  }

  clear () {
    this.matrix.clear();
  }

  stopBeat () {
    this.matrix.render();
    this.loop.stop();
    this.playing = false;
  }

  playBeat () {
    this.loop.start();
    this.playing = true;
  }

  handlePlayClick () {
    if (this.playing) {
      this.stopBeat();
    } else {
      this.playBeat();
    }
  }

  changeTempo (newTempo) {
    this.tempo = newTempo;

    if (this.playing) {
      Tone.Transport.bpm.value = this.tempo;
    }
  }
}

BeatMachine.DEFAULT_TEMPO = 0.3;
BeatMachine.AUDIO_NAMES = [
  "clap",
  "highHat",
  "kickDrum",
  "maracas",
  "rimShot",
  "snareDrum"
];
BeatMachine.AUDIO_FILES = {
  "clap" : "/app/assets/audio/clap.mp3",
  "highHat" : "/app/assets/audio/high_hat.mp3",
  "kickDrum" : "/app/assets/audio/kick_drum.mp3",
  "maracas" : "/app/assets/audio/maracas.mp3",
  "rimShot" : "/app/assets/audio/rim_shot.mp3",
  "snareDrum" : "/app/assets/audio/snare_drum.mp3"
};

module.exports = BeatMachine;
