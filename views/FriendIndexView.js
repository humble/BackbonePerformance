class FriendIndexView extends Backbone.View {
  initialize({ timers }) {
    this.timers = timers;
  }

  addFriends() {
    this.collection.addFriends(10000);
  }

  resetFriends() {
    this.model.set('highlightGender', false);
    this.$('.row').removeClass('pink');
    this.$('.friend-item').removeClass('pink');
  }

  modelHighlight() {
    let femaleCount = this.collection.where({gender: "Female"}).length;
    this.timers.add({name: 'modelHighlight', count: femaleCount});
    this.model.set('highlightGender', true);
  }

  jqueryHighlight() {
    this.timers.add({name: 'jqueryHighlight'});
    $('[data-gender="Female"]').addClass('pink');
    this.timers.last().stop();
  }

  viewHighlight() {
    this.timers.add({name: 'viewHighlight'});
    this.$('[data-gender="Female"]').addClass('pink');
    this.timers.last().stop();
  }

  rerenderHighlight() {
    this.timers.add({name: 'rerenderHighlight'});
    this.friendListView.rerenderFriendsWithHighlights();
    this.timers.last().stop();
  }

  addFriendList() {
    if (!this.$friendList) {
      this.$friendList = this.$('#friends-list');
    }
    this.friendListView = new FriendListView({collection: this.collection});
    this.$friendList.append(this.friendListView.render().$el);
  }

  addFilter() {
    if (!this.$filterView) {
      this.$filterView = this.$('#friend-filter');
    }
    let friendFilterView = new FriendFilterView({
      addFriends: this.addFriends.bind(this),
      resetFriends: this.resetFriends.bind(this),
      modelHighlight: this.modelHighlight.bind(this),
      rerenderHighlight: this.rerenderHighlight.bind(this),
      viewHighlight: this.viewHighlight.bind(this),
      jqueryHighlight: this.jqueryHighlight.bind(this)
    });
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