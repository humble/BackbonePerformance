class FriendListView extends Backbone.View {
  initialize({ timers }) {
    this.friendItemViews = {};
    this.removedfriends = [];
    this.timers = timers;
    this.listenTo(this.collection, 'add', this.addFriend);
    this.listenTo(this.collection, 'remove', this.removeFriend);
  }

  addFriend(friend) {
    let friendItemView = new FriendItemView({model: friend});
    this.friendItemViews[friend.cid] = friendItemView
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

  rerenderFriendsWithFilter(month) {
    this.getFriendList().empty();
    this.collection.each(friend => {
      if (friend.get('birthday').getMonth() !== month) {
        let friendItemView = new FriendItemView({model: friend});
        this.getFriendList().append(friendItemView.render().$el);
      }
    })
  }

  resetBirthday() {
    this.collection.add(this.removedfriends);
    this.removedFriends = [];
  }

  removeFriend(friend) {
    this.friendItemViews[friend.cid].remove();
    this.removedfriends.push(friend);
    this.timers.last().decrement();
  }

  getFriendList() {
    if (!this.$friendList) {
      this.$friendList = this.$('#friend-list');
    }
    return this.$friendList;
  }

  remove() {
    Object.values(this.friendItemViews).forEach(friendItemView => {
      friendItemView.remove();
    })
    super.remove();
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
    <div class="cell birthday">Birthday</div>
    <div class="cell">Say Hi</div>
  </div>
  <div id="friend-list" class="scrollable"></div>
`);
