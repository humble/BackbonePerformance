class TimersView extends Backbone.View {
  initialize() {
    this.listenTo(this.collection, 'add', this.addTimer);
  }

  addTimer(timer) {
    if (!this.$timers) {
      this.$timers = this.$('#timers');
    }
    let timerItemView = new TimerItemView({model: timer});
    this.$timers.append(timerItemView.render().$el);
  }

  render() {
    this.$el.html(this.template);
    this.collection.each(timer => this.addTimer(timer));
    return this;
  }
}

TimersView.prototype.className = 'timer-list';
TimersView.prototype.template = _.template(`
  <h2>Timers</h2>
  <div id="timers"></div>
  <img src="assets/hamblesweat.jpg">
`);
