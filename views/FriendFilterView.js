class FriendFilterView extends Backbone.View {
  addFriends(e) {
    e.preventDefault();
    this.model.set('friendCount', 1000);
  }
  reset(e) {
    e.preventDefault();
    this.model.set('reset', true);
  }
  render() {
    this.$el.html(this.template);
    return this;
  }
}

FriendFilterView.prototype.className = 'friends-filter';
FriendFilterView.prototype.events = {
  'click #add-friends': 'addFriends',
  'click #reset': 'reset'
}
FriendFilterView.prototype.template = _.template(`
  <a href="#" class="button" id="add-friends">Add Friends</a>
  <a href="#" class="button" id="reset">Reset</a>
  <div>
    <h3>Applying Changes to elements</h3>
    <a href="#" class="button">With entire rerender</a>
    <a href="#" class="button">With jQuery selectors</a>
    <a href="#" class="button">With Backbone model listeners</a>
  </div>
  <div>
    <h3>Filtering Elements</h3>
    <a href="#" class="button">With entire rerender</a>
    <a href="#" class="button">With jQuery selectors</a>
    <a href="#" class="button">With Backbone Collection Listener</a>
  </div>
`);