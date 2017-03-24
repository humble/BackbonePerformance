class FriendItemView extends Backbone.View {
  wink(e) {
    e.preventDefault();
    alert(`Hamble winks at ${this.model.get('name')}`);
  }

  render() {
    this.$el.html(this.template({friend: this.model}));
    return this;
  }
}

FriendItemView.prototype.className = 'friend-item';
FriendItemView.prototype.events = {
  'click .wink': 'wink'
}
FriendItemView.prototype.template = _.template(`
  <div class="row">
    <div class="cell"><%- friend.get('name') %></div>
    <div class="cell"><%- friend.get('gender') %></div>
    <div class="cell"><%- friend.get('birthday') %></div>
    <div class="cell"><a href="#" class="button wink">Wink</a></div>
  </div>
`);
