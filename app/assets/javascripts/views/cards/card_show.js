Trellino.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  className: "panel card",
  
  attributes: function(){
    return { id: this.model.get("id")}
  },
  
  render: function(){
    var renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },

})