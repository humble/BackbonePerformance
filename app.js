function init() {
  let $rootEl = $('#app');
  new AppRouter({ $rootEl });
  Backbone.history.start({
    pushState: false,
    root: 'Users/irenefoelschow/BackboneExperiment/index.html'
  });
}

init();