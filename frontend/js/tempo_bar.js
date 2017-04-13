class TempoBar {
  constructor (changeTempo, defaultVal) {
    this.el = document.getElementById('tempo-bar');
    this.marker = $l('#tempo-marker');
    this.val = defaultVal;
    this.changeTempo = changeTempo;
    this.setup();
    this.bindEvents();
  }

  setup () {
    this.el.style.width = '400px';
    this.bindEvents();
    this.updateMarker();
  }

  updateMarker () {
    this.marker.attr('style', `left: ${this.val * this.barWidth()}px`);
  }

  barWidth () {
    const width = this.el.style.width.slice(0, -2);
    return parseInt(width);
  }

  bindEvents() {
    this.marker.on('drag', (e) => {
      const offset = this.el.offsetLeft;
      const dist = e.clientX - offset - 15;
      if (dist < this.barWidth() && dist > 0) {
        this.val = dist / this.barWidth();
        this.updateMarker();
        this.changeTempo(this.val * TempoBar.MAX + TempoBar.MIN);
      }
    });
  }
}

TempoBar.MAX = 400;
TempoBar.MIN = 200;

module.exports = TempoBar;
