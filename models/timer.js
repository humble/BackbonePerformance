class Timer extends Backbone.Model {
  initialize(options) {
    this.set('start', Date.now());
  }

  stop() {
    this.set('end', Date.now());
  }

  total() {
    return this.get('end') - this.get('start');
  }
}