function createSprite(element) {
  var obj = {
    frames: [
      "frame1",
      "frame2",
      "frame3",
      "frame4",
      "frame5",
      "frame6",
      "frame7",
      "frame8",
      "frame9"
    ],
    element: $(element),
    currentFrame: 0,
    lastFrame: 8,
    hasFrame: function() {
      if (this.currentFrame == this.lastFrame) {
        return false;
      } else {
        return true;
      }
    },
    isFinish: function() {
      return !this.hasFrame();
    },
    resetFrame: function() {
      this.element
        .removeClass(this.frames[this.currentFrame])
        .addClass(this.frames[0]);
      this.currentFrame = 0;
    },
    moveFrame: function(from, to) {
      this.element.removeClass(from).addClass(to);
    },
    nextFrame: function() {
      // defense
      if (this.isFinish()) {
      } else {
        this.moveFrame(
          this.frames[this.currentFrame],
          this.frames[++this.currentFrame]
        );
      }
    }
  };
  return obj;
}
