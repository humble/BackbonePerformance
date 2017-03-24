class HambleView extends Backbone.View {
  render() {
    this.$el.html(this.template);
    return this;
  }
}

HambleView.prototype.className = 'hamble';
HambleView.prototype.template = _.template(`
  <img src="assets/hamblewink.jpg">
`);