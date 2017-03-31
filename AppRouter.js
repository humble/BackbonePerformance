class AppRouter extends Backbone.Router {
  initialize({ $rootEl }) {
    this.$rootEl = $rootEl;
    this.friendFilter = new FriendFilter();
    this.friends = new Friends();
    this.timers = new Timers();
  }

  baseView() {
    if (!this._baseView) {
      this._baseView = new BaseView({ model: this.friendFilter });
      this.$rootEl.html(this._baseView.$el);
      this._baseView.render();
    }
    return this._baseView;
  }

  friendIndex() {
    let view = new FriendIndexView({
      collection: this.friends,
      model: this.friendFilter,
      timers: this.timers
    });
    this._swapView(view);
  }

  hamble() {
    let view = new HambleView();
    this._swapView(view);
  }

  _swapView(view) {
    if (this._currentView) {
      if (this.friendFilter.get('removeChildren')) {
        this._currentView.removePlus();
      } else {
        this._currentView.remove();
      }
    }
    this._currentView = view;
    this.baseView().$('#view').html(view.render().$el);
  }
}

AppRouter.prototype.routes = {
  '': 'friendIndex',
  'hamble': 'hamble'
}
