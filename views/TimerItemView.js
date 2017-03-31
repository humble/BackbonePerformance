class TimerItemView extends Backbone.View {
  initialize() {
    this.listenTo(this.model, 'change:end', this.render.bind(this));
  }

  render() {
    if (this.model.get('end')) {
      this.$el.html(this.template({ timer: this.model }));
    }

    return this;
  }
}

TimerItemView.prototype.className = 'timer-item';
TimerItemView.prototype.template = _.template(`
  <%- timer.get('name') %>: <%- timer.total() %>
`);
