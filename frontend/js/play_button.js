class PlayButton {
  constructor (handleClick) {
    this.$el =  $l('#play-button');
    this.handleClick = handleClick;
    this.playing = false;

    this.bindEvents();
  }

  bindEvents () {
    this.$el.on('click', (e) => {
      e.preventDefault();
      this.togglePlaying();
      this.handleClick();
    });
  }

  togglePlaying () {
    if (this.playing) {
      this.$el.removeClass('playing');
      this.$el.html('Play');
      this.playing = false;
    } else {
      this.$el.addClass('playing');
      this.$el.html('Stop!');
      this.playing = true;
    }
  }
}

module.exports = PlayButton;
