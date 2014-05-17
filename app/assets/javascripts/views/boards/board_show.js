Trellino.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],
  className: "board",
  
  initialize: function(option){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync add remove", this.render)
  },
  
  render: function(){
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.model.lists().each(function(list){
      var listShow = new Trellino.Views.ListShow({
        model: list
      });
      
      this.$("#lists").append(listShow.render().$el);
    })
    
    return this;
  },
})