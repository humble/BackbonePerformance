class FriendListView extends Backbone.View {
  initialize() {
    this.listenTo(this.collection, 'add', this.addFriend);
    this.listenTo(this.collection, 'remove', this.removeFriend);
  }


  addFriend(friend) {
    let friendItemView = new FriendItemView({model: friend});
    this.getFriendList().append(friendItemView.render().$el);
  }

  rerenderFriendsWithHighlights() {
    this.getFriendList().empty();
    this.collection.each(friend => {
      let friendItemView = new FriendItemView({model: friend});
      if (friend.get('gender') === 'Female') {
        friendItemView.$el.addClass('pink');
      }
      this.getFriendList().append(friendItemView.render().$el);
    })
  }

  removeFriend(friend) {

  }

  getFriendList() {
    if (!this.$friendList) {
      this.$friendList = this.$('#friend-list');
    }
    return this.$friendList;
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
    <div class="cell">Say Hi</div>
  </div>
  <div id="friend-list" class="scrollable"></div>
`);
