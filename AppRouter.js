class AppRouter extends Backbone.Router {
  initialize(options) {
    this.$rootEl = options.$rootEl;
    // this._preventPageReload();
    this.chance = new Chance();
    this.friends = new Friends();
    this.friends.addFriends(1000);
    this.timers = new Timers();
    this.friendFilter = new FriendFilter();
  }

  baseView() {
    if (!this._baseView) {
      this._baseView = new BaseView();
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
    if (this._currentView) this._currentView.remove();
    this._currentView = view;
    this.baseView().$('#view').html(view.render().$el);
  }

  // _preventPageReload() {
  //   // Looks for anchor tags whose hrefs start with '/' and that don't include
  //   // data-reload=1
  //   this.$rootEl.on('click', "a[href^='/']:not([data-reload=1])", (e) => {
  //     let current = $(e.currentTarget);
  //     let href = current.attr('href');
  //
  //     // Allow shift+click for new tabs, etc.
  //     if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
  //       e.preventDefault();
  //
  //       // Remove leading slashes and hash bangs (backward compatablility)
  //       let url = href.replace(/^\//,'').replace('\#\!\/','');
  //       this.navigate(url, { trigger: true });
  //       // stop browser from redirecting.
  //       return false;
  //     }
  //   });
  // }
}

AppRouter.prototype.routes = {
  '': 'friendIndex',
  'hamble': 'hamble'
}
