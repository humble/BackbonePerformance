class FriendIndexView extends Backbone.View {
  initialize({ timers }) {
    this.timers = timers;
    this.subViews = [];
  }

  addFriends() {
    this.collection.addFriends(10000);
  }

  resetHighlight() {
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
    let femaleCount = this.collection.where({gender: "Female"}).length;
    this.timers.add({name: 'viewHighlight', count: femaleCount});
    this.$('[data-gender="Female"]').addClass('pink');
    for (var i = 0; i < femaleCount; i++) {
      this.timers.last().decrement();
    }
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
    this.friendListView = new FriendListView({
      collection: this.collection,
      timers: this.timers
    });
    this.$friendList.append(this.friendListView.render().$el);
  }

  collectionFilter() {
    this.timers.add({name: 'filterCollection'});
    const currentMonth = new Date().getMonth();
    const toRemove = this.collection.filter(friend => {
      return friend.get('birthday').getMonth() === currentMonth;
    });
    this.timers.last().set('count', toRemove.length);
    this.collection.remove(toRemove);
  }

  viewFilter() {
    const currentMonth = new Date().getMonth();
    this.removed = this.collection.filter(friend => {
      return friend.get('birthday').getMonth() === currentMonth;
    });
    this.timers.add({name: 'viewFilter', count: this.removed.length});
    this.$(`[data-month="${currentMonth}"]`).remove();
    for (var i = 0; i < this.removed.length; i++) {
      this.timers.last().decrement();
    }
  }

  rerenderFilter() {
    const currentMonth = new Date().getMonth();
    this.removed = this.collection.filter(friend => {
      return friend.get('birthday').getMonth() === currentMonth;
    });
    this.timers.add({name: 'rerenderFilter'})
    this.friendListView.rerenderFriendsWithFilter(currentMonth);
    this.timers.last().stop();
  }

  resetBirthday() {
    this.friendListView.resetBirthday(this.removed);
    if (this.removed) {
      this.removed.forEach(friend => this.friendListView.addFriend(friend));
      this.removed = null;
    }
  }

  addFilter() {
    if (!this.$filterView) {
      this.$filterView = this.$('#friend-filter');
    }
    let friendFilterView = new FriendFilterView({
      addFriends: this.addFriends.bind(this),
      resetHighlight: this.resetHighlight.bind(this),
      modelHighlight: this.modelHighlight.bind(this),
      rerenderHighlight: this.rerenderHighlight.bind(this),
      viewHighlight: this.viewHighlight.bind(this),
      jqueryHighlight: this.jqueryHighlight.bind(this),
      collectionFilter: this.collectionFilter.bind(this),
      viewFilter: this.viewFilter.bind(this),
      rerenderFilter: this.rerenderFilter.bind(this),
      resetBirthday: this.resetBirthday.bind(this)
    });
    this.subViews.push(friendFilterView);
    this.$filterView.append(friendFilterView.render().$el);
  }

  addTimers() {
    if (!this.$timerView) {
      this.$timerView = this.$('#timers');
    }
    let timersView = new TimersView({ collection: this.timers });
    this.subViews.push(timersView);
    this.$timerView.append(timersView.render().$el);
  }

  remove() {
    this.subViews.forEach(view => view.remove());
    this.friendListView.remove();
    super.remove();
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