// Polyfill pour Array.toReversed() (Node 20+ feature)
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return this.slice().reverse();
  };
}
