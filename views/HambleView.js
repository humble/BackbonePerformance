class HambleView extends Backbone.View {
  // for demonstration purposes.
  removePlus() {
    super.remove();
  }

  render() {
    this.$el.html(this.template);
    return this;
  }
}

HambleView.prototype.className = 'hamble';
HambleView.prototype.template = _.template(`<img src="assets/hamblewink.jpg">`);