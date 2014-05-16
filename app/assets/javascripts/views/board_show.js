Trellino.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],
  className: "board",
  
  render: function(){
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    return this;
  },
})