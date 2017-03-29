class BaseView extends Backbone.View {
  render() {
    this.$el.html(this.template);
    return this;
  }
}

BaseView.prototype.className = '';
BaseView.prototype.template = _.template(`
  <div id="navigation" class="navigation">
    <a href="#/hamble" class="tab">Secret</a> |
    <a href="#/" class="tab">Friends</a>
  </div>
  <div id="view" class="base"></div>
`);