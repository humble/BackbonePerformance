class FriendFilterView extends Backbone.View {
  render() {
    this.$el.html(this.template);
    return this;
  }
}

FriendFilterView.prototype.className = 'friends-filter';
FriendFilterView.prototype.template = _.template(`
  <a href="#" class="button">Add Friends</a>
  <a href="#" class="button">Reset</a>
  <div>
    <h2>Applying Changes to elements</h2>
    <a href="#" class="button">With entire rerender</a>
    <a href="#" class="button">With jQuery selectors</a>
    <a href="#" class="button">With Backbone model listeners</a>
  </div>
  <div>
    <h2>Filtering Elements</h2>
    <a href="#" class="button">With entire rerender</a>
    <a href="#" class="button">With jQuery selectors</a>
    <a href="#" class="button">With Backbone Collection Listener</a>
  </div>
`);