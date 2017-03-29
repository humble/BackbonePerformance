class FriendItemView extends Backbone.View {
  initialize({friendFilter}) {
    if (this.model.get('gender') === 'Female') {
      this.listenTo(friendFilter, 'change:highlightGender', this.pink.bind(this));
    }
  }

  pink(filter) {
    if (filter.get('highlightGender')) {
      this.$el.addClass('pink');
    } else {
      this.$el.removeClass('pink');
    }
  }

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
FriendItemView.prototype.events = { 'click .wink': 'wink' };
FriendItemView.prototype.template = _.template(`
  <div class="row" data-gender="<%- friend.get('gender') %>" data-month="<%- friend.get('birthday').getMonth() %>">
    <div class="cell"><%- friend.get('name') %></div>
    <div class="cell"><%- friend.get('gender') %></div>
    <div class="cell birthday"><%- friend.get('birthday').toDateString() %></div>
    <div class="cell"><a href="#" class="button wink">Wink</a></div>
  </div>
`);
