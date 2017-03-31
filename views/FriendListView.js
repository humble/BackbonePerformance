class FriendListView extends Backbone.View {
  initialize() {
    this.friendItemViews = {};
    this.removedfriends = [];
    this.listenTo(this.collection, 'add', this.addFriend);
    this.listenTo(this.collection, 'remove', this.removeFriend);
  }

  getFriendList() {
    if (!this.$friendList) this.$friendList = this.$('#friend-list');

    return this.$friendList;
  }

  //rerender model
  rerenderFriendsWithHighlights() {
    this.getFriendList().empty();
    this.collection.each(friend => {
      let friendView = new FriendItemView({
        model: friend,
        friendFilter: this.model
      });
      if (friend.get('gender') === 'Female') friendView.$el.addClass('pink');
      this.getFriendList().append(friendView.render().$el);
    })
  }

  //rerender collection
  rerenderFriendsWithFilter(month) {
    this.getFriendList().empty();
    this.collection.each(friend => {
      if (friend.get('birthday').getMonth() !== month) {
        let friendView = new FriendItemView({
          model: friend,
          friendFilter: this.model
        });
        this.getFriendList().append(friendView.render().$el);
      }
    })
  }

  //iterate over all items and add pink class to female friends

  resetBirthday() {
    this.collection.add(this.removedfriends);
    this.removedFriends = [];
  }

  addFriend(friend) {
    let friendItemView = new FriendItemView({
      model: friend,
      friendFilter: this.model
    });
    this.friendItemViews[friend.cid] = friendItemView;
    this.getFriendList().append(friendItemView.render().$el);
  }

  removeFriend(friend) {
    this.friendItemViews[friend.cid].remove();
    this.removedfriends.push(friend);
  }

  //zombie views
  remove() {
    Object.values(this.friendItemViews).forEach(subView => subView.remove())
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
