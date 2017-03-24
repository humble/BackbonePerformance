class FriendItemView extends Backbone.View {
  render() {
    this.$el.html(this.template({friend: this.model}));
    return this;
  }
}

FriendItemView.prototype.className = 'friend-item';
FriendItemView.prototype.template = _.template(`
  <div class="row">
    <div class="cell"><%- friend.get('name') %></div>
    <div class="cell"><%- friend.get('gender') %></div>
    <div class="cell"><%- friend.get('birthday') %></div>
  </div>
`);
