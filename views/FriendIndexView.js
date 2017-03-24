class FriendIndexView extends Backbone.View {
  initialize(options) {
    this.timers = options.timers;
  }

  addFriendList() {
    if (!this.$friendList) {
      this.$friendList = this.$('#friends-list');
    }
    let friendListView = new FriendListView({collection: this.collection});
    this.$friendList.append(friendListView.render().$el);
  }

  addFilter() {
    if (!this.$filterView) {
      this.$filterView = this.$('#friend-filter');
    }
    let friendFilterView = new FriendFilterView({ model: this.model });
    this.$filterView.append(friendFilterView.render().$el);
  }

  addTimers() {
    if (!this.$timerView) {
      this.$timerView = this.$('#timers');
    }
    let timersView = new TimersView({ collection: this.timers });
    this.$timerView.append(timersView.render().$el);
  }

  render() {
    this.$el.html(this.template);
    this.addFilter();
    this.addFriendList();
    this.addTimers();
    return this;
  }
}

FriendIndexView.prototype.className = 'friend-index';
FriendIndexView.prototype.template = _.template(`
  <div class="left">
    <div id="timers"></div>
  </div>
  <div class="right">
    <div id="friend-filter"></div>
    <div id="friends-list"></di>
  </div>
`);