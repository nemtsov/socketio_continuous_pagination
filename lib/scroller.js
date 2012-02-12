function Scroller() {
  this.counter = 0;
}

Scroller.prototype.getData = function () {
  return {
      counter: ++this.counter
    , html: 'interesting data: ' + this.counter
  };
}

module.exports = Scroller;
