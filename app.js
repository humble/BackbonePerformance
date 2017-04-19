function init() {
  let $rootEl = $('#app');
  new AppRouter({ $rootEl });

  let historyOptions = { pushState: false };
  const rootUrl = window.location.href.split('///');
  if (rootUrl.length > 1) historyOptions.root = rootUrl[1];
  Backbone.history.start(historyOptions);
}

init();