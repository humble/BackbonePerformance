class FriendFilterView extends Backbone.View {
  initialize({ addFriends, resetHighlight, modelHighlight, jqueryHighlight, viewHighlight, rerenderHighlight, collectionFilter, viewFilter, rerenderFilter, resetBirthday }) {
    this.addFriends = addFriends;
    this.resetHighlight = resetHighlight;
    this.modelHighlight = modelHighlight;
    this.jqueryHighlight = jqueryHighlight;
    this.viewHighlight = viewHighlight;
    this.rerenderHighlight = rerenderHighlight;
    this.collectionFilter = collectionFilter;
    this.viewFilter = viewFilter;
    this.rerenderFilter = rerenderFilter;
    this.resetBirthday = resetBirthday;
  }
  addHambleFriends() {
    this.addFriends();
  }
  resetHambleHighlight() {
    this.resetHighlight();
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
  filterByHambleBirthday() {
    this.collectionFilter();
  }
  resetHambleBirthday() {
    this.resetBirthday();
  }
  viewHambleFilter() {
    this.viewFilter();
  }
  rerenderHambleFilter() {
    this.rerenderFilter();
  }
  render() {
    this.$el.html(this.template);
    return this;
  }
}

FriendFilterView.prototype.className = 'friends-filter';
FriendFilterView.prototype.events = {
  'click #add-friends': 'addHambleFriends',
  'click #reset-highlight': 'resetHambleHighlight',
  'click .rerenderHighlight': 'rerenderHambleHighlight',
  'click .viewHighlight': 'viewHambleHighlight',
  'click .modelHighlight': 'modelHambleHighlight',
  'click .jqueryHighlight': 'jqueryHambleHighlight',
  'click .collectionFilter': 'filterByHambleBirthday',
  'click .viewFilter': 'viewHambleFilter',
  'click .rerenderFilter': 'rerenderHambleFilter',
  'click #reset-filter': 'resetHambleBirthday'

};
FriendFilterView.prototype.template = _.template(`
  <a href="#" class="button" id="add-friends">Add Friends</a>
  <div>
    <h3>Applying Changes to elements</h3>
    <a href="#" class="button rerenderHighlight">Entire rerender</a>
    <a href="#" class="button jqueryHighlight">jQuery selectors</a>
    <a href="#" class="button viewHighlight">View selectors</a>
    <a href="#" class="button modelHighlight">Backbone model listeners</a>
    <a href="#" class="button" id="reset-highlight">Reset</a>
  </div>
  <div>
    <h3>Filtering Elements</h3>
    <a href="#" class="button rerenderFilter">Entire rerender</a>
    <a href="#" class="button viewFilter">jQuery selectors</a>
    <a href="#" class="button collectionFilter">Backbone Collection Listener</a>
    <a href="#" class="button" id="reset-filter">Reset</a>
  </div>
`);