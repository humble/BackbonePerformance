class BaseView extends Backbone.View {
  render() {
    this.$el.html(this.template);
    return this;
  }
}

BaseView.prototype.className = 'base';
BaseView.prototype.template = _.template(`
  <div id="navigation">
    <a href="#/hamble">Secret<a>
    <a href="#/">Friends<a>
  </div>
  <div id="view"></div>
`);