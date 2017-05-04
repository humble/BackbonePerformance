class FriendIndexView extends Backbone.View {
  initialize({ timers }) {
    this.timers = timers;
    this.subViews = [];
  }

  addFriends() {
    this.collection.addFriends(1000);
  }

  // model study
  rerenderHighlight() {
    this.timers.add({name: 'Rerender Highlight'});
    this.friendListView.rerenderFriendsWithHighlights();
    this.timers.last().stop();
  }

  jqueryHighlight() {
    this.timers.add({name: 'jQuery Highlight'});
    $('[data-gender="Female"]').addClass('pink');
    this.timers.last().stop();
  }

  viewHighlight() {
    this.timers.add({name: 'View Highlight'});
    this.$('[data-gender="Female"]').addClass('pink');
    this.timers.last().stop();
  }

  modelHighlight() {
    this.timers.add({name: 'Model Highlight'});
    this.model.set('highlightGender', true);
    this.timers.last().stop();
  }

  resetHighlight() {
    this.model.set('highlightGender', false);
    this.$('.row').removeClass('pink');
    this.$('.friend-item').removeClass('pink');
  }


  /// collection study
  getRemoved(currentMonth) {
    return this.collection.filter(friend => {
      return friend.get('birthday').getMonth() === currentMonth;
    });
  }

  rerenderFilter() {
    const currentMonth = new Date().getMonth();
    this.removed = this.getRemoved(currentMonth);
    this.timers.add({name: 'Rerender Filter'})
    this.friendListView.rerenderFriendsWithFilter(currentMonth);
    this.timers.last().stop();
  }

  viewFilter() {
    const currentMonth = new Date().getMonth();
    this.removed = this.getRemoved(currentMonth);
    this.timers.add({name: 'View Filter'});
    this.$(`[data-month="${currentMonth}"]`).remove();
    this.timers.last().stop();
  }

  collectionFilter() {
    this.timers.add({name: 'Collection Filter'});
    const currentMonth = new Date().getMonth();
    const toRemove = this.getRemoved(currentMonth);
    this.collection.remove(toRemove);
    this.timers.last().stop();
  }

  resetBirthday() {
    this.friendListView.resetBirthday(this.removed);
    if (this.removed) {
      this.removed.forEach(friend => this.friendListView.addFriend(friend));
      this.removed = null;
    }
  }



  /// avoid zombie views
  removePlus() {
    this.subViews.forEach(view => view.remove());
    this.friendListView.remove();
    super.remove();
  }

  addFriendList() {
    if (!this.$friendList) this.$friendList = this.$('#friends-list');
    this.friendListView = new FriendListView({
      collection: this.collection,
      model: this.model
    });
    this.$friendList.append(this.friendListView.render().$el);
  }

  addTimers() {
    if (!this.$timerView) this.$timerView = this.$('#timers');
    let timersView = new TimersView({ collection: this.timers });
    this.subViews.push(timersView);
    this.$timerView.append(timersView.render().$el);
  }

  render() {
    this.$el.html(this.template);
    this.addFriendList();
    this.addTimers();

    return this;
  }
}

FriendIndexView.prototype.className = 'friend-index';
FriendIndexView.prototype.events = {
  'click #add-friends': 'addFriends',
  'click #reset-highlight': 'resetHighlight',
  'click .rerenderHighlight': 'rerenderHighlight',
  'click .viewHighlight': 'viewHighlight',
  'click .modelHighlight': 'modelHighlight',
  'click .jqueryHighlight': 'jqueryHighlight',
  'click .collectionFilter': 'collectionFilter',
  'click .viewFilter': 'viewFilter',
  'click .rerenderFilter': 'rerenderFilter',
  'click #reset-filter': 'resetBirthday'

};
FriendIndexView.prototype.template = _.template(`
  <div class="left">
    <div id="timers"></div>
  </div>
  <div class="right">
    <div id="friend-filter">
      <a href="#" class="button" id="add-friends">Add Friends</a>
      <div>
        <h3>Applying Changes to elements</h3>
        <a href="#" class="button rerenderHighlight">Entire rerender</a>
        <a href="#" class="button jqueryHighlight">jQuery selectors</a>
        <a href="#" class="button viewHighlight">View selectors</a>
        <a href="#" class="button modelHighlight">Model listeners</a>
        <a href="#" class="button" id="reset-highlight">Reset</a>
      </div>
      <div>
        <h3>Filtering Elements</h3>
        <a href="#" class="button rerenderFilter">Entire rerender</a>
        <a href="#" class="button viewFilter">jQuery selectors</a>
        <a href="#" class="button collectionFilter">Collection Listener</a>
        <a href="#" class="button" id="reset-filter">Reset</a>
      </div>
    </div>
    <div id="friends-list"></di>
  </div>
`);