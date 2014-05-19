window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    new Trellino.Routers.AppRouter();
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },
    
  addSubview: function(selector, subview){
    this.subviews(selector).push(subview);
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
  }
});

$(function() {
  Trellino.initialize();
});
