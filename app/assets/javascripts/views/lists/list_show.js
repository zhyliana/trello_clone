Trellino.Views.ListShow = Backbone.View.extend({
  template: JST["lists/show"],
  className: "col-xs-4",
  
  render: function(){
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent)
    
    return this;
  },
})


