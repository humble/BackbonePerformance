class FriendFilterView extends Backbone.View {
  initialize({ addFriends, resetFriends, modelHighlight, jqueryHighlight, viewHighlight, rerenderHighlight }) {
    this.addFriends = addFriends;
    this.resetFriends = resetFriends;
    this.modelHighlight = modelHighlight;
    this.jqueryHighlight = jqueryHighlight;
    this.viewHighlight = viewHighlight;
    this.rerenderHighlight = rerenderHighlight;
  }
  addHambleFriends() {
    this.addFriends();
  }
  resetHambleFriends() {
    this.resetFriends();
  }
  rerenderHambleHighlight() {
    this.rerenderHighlight();
  }
  viewHambleHighlight() {
    this.viewHighlight();
  }
  modelHambleHighlight() {
    this.modelHighlight();
  }
  jqueryHambleHighlight() {
    this.jqueryHighlight();
  }
  render() {
    this.$el.html(this.template);
    return this;
  }
}

FriendFilterView.prototype.className = 'friends-filter';
FriendFilterView.prototype.events = {
  'click #add-friends': 'addHambleFriends',
  'click #reset': 'resetHambleFriends',
  'click .rerenderHighlight': 'rerenderHambleHighlight',
  'click .viewHighlight': 'viewHambleHighlight',
  'click .modelHighlight': 'modelHambleHighlight',
  'click .jqueryHighlight': 'jqueryHambleHighlight'

};
FriendFilterView.prototype.template = _.template(`
  <a href="#" class="button" id="add-friends">Add Friends</a>
  <a href="#" class="button" id="reset">Reset</a>
  <div>
    <h3>Applying Changes to elements</h3>
    <a href="#" class="button rerenderHighlight">Entire rerender</a>
    <a href="#" class="button jqueryHighlight">jQuery selectors</a>
    <a href="#" class="button viewHighlight">View selectors</a>
    <a href="#" class="button modelHighlight">Backbone model listeners</a>
  </div>
  <div>
    <h3>Filtering Elements</h3>
    <a href="#" class="button">Entire rerender</a>
    <a href="#" class="button">jQuery selectors</a>
    <a href="#" class="button">Backbone Collection Listener</a>
  </div>
`);