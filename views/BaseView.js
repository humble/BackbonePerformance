class BaseView extends Backbone.View {
  toggleRemove(e) {
    this.model.set('removeChildren', $(e.currentTarget).is(':checked'));
  }

  render() {
    this.$el.html(this.template);

    return this;
  }
}

BaseView.prototype.events = { 'change #remove': 'toggleRemove' };
BaseView.prototype.template = _.template(`
  <div id="navigation" class="navigation">
    <a href="#/hamble" class="tab">Secret</a> |
    <a href="#/" class="tab">Friends</a> |
    <label for="remove" class="tab">Remove children
      <input id="remove" type="checkbox"/>
    </label>
  </div>
  <div id="view" class="base"></div>
`);