Trellino.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  render: function(){
    var renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
})