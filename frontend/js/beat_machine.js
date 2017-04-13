const Matrix = require('./matrix.js');
const PlayButton = require('./play_button');
const TempoBar = require('./tempo_bar');
const Tone = require('tone');

class BeatMachine {
  constructor (el) {
    this.matrix = new Matrix(el);

    this.tempo = BeatMachine.DEFAULT_TEMPO;
    this.playing = false;
    this.clear = this.clear.bind(this);
    this.saveBeat = this.saveBeat.bind(this);

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
    $l('#save-button').on('click', this.saveBeat);
  }

  saveBeat() {
    $l.ajax({
      url: '/beats',
      method: 'POST',
      data: `sound=${this.matrix.stringify()}&name=awesome`
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

  animate() {
    let colIdx = 1;
    this.interval = window.setInterval(() => {
      this.matrix.play(colIdx);
      colIdx = (colIdx + 1) % Matrix.NUM_COLUMNS;
    }, 1000);
  }

  handlePlayClick () {
    if (this.playing) {
      this.stopBeat();
    } else {
      this.playBeat();
    }
  }

  changeTempo (newTempo) {
    console.log(newTempo);
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
  "clap" : "app/assets/audio/clap.mp3",
  "highHat" : "app/assets/audio/high_hat.mp3",
  "kickDrum" : "app/assets/audio/kick_drum.mp3",
  "maracas" : "app/assets/audio/maracas.mp3",
  "rimShot" : "app/assets/audio/rim_shot.mp3",
  "snareDrum" : "app/assets/audio/snare_drum.mp3"
};

module.exports = BeatMachine;
