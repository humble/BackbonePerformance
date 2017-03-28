class Timer extends Backbone.Model {
  initialize(options) {
    this.set('start', Date.now());
  }

  stop() {
    this.set('end', Date.now());
  }

  decrement() {
    this.set('count', this.get('count') - 1);
    if (this.get('count') === 0) this.stop();
  }

  total() {
    return this.get('end') - this.get('start');
  }
}