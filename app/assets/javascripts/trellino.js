window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    new Trellino.Routers.AppRouter();
    //tells backbone to start listening for any changes in location
    Backbone.history.start();
  }
};

$(Trellino.initialize);
