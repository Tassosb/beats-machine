const BeatMachine = require('./js/beat_machine');
const Tone = require('tone');

$l(() => {
  const el = document.getElementById('matrix');
  window.beatMachine = new BeatMachine(el);
  window.Tone = Tone;
});
