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

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(selector, subview){
    this.subviews(selector).push(subviews);
    
    this.attachSubview(selector, subview.render());
  },
  
  attachSubview: function(selector, subview){
    this.$(selector).append(subview.$el);
    
    subview.delegateEvents();
  },
  
  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },
  
  remove: function(){
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function(subviews){
      _(subviews).each(function(subview){
        subview.remove();
      });
    });
  },
  
  removeSubview: function(selector){
    this._subviews = this._subviews[selector] || {};
    
    if(!selector){
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },
  
  subviews: function (selector) {
      this._subviews = this._subviews || {};

      if (!selector) {
        return this._subviews;
      } else {
        this._subviews[selector] = this._subviews[selector] || [];
        return this._subviews[selector];
      }
    }
});

$(Trellino.initialize);
