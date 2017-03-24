class FriendListView extends Backbone.View {
  initialize() {
    this.listenTo(this.collection, 'add', this.addFriend);
  }

  addFriend(friend) {
    if (!this.$friendList) {
      this.$friendList = this.$('#friend-list');
    }
    let friendItemView = new FriendItemView({model: friend});
    this.$friendList.append(friendItemView.render().$el);
  }

  render() {
    this.$el.html(this.template);
    this.collection.each(friend => this.addFriend(friend));
    return this;
  }
}

FriendListView.prototype.className = 'friends-list';
FriendListView.prototype.template = _.template(`
  <div class="row header">
    <div class="cell">Friend Name</div>
    <div class="cell">Gender</div>
    <div class="cell">Birthday</div>
  </div>
  <div id="friend-list" class="scrollable"></div>
`);
