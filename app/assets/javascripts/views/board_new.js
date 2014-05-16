Trellino.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  className: ".new-board",
  
  events: {
    "submit form": "submit"
  },
  
  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function(event){
    event.preventDefault();
  
    var params = $(event.currentTarget).serializeJSON()["board"];
    var newBoard = new Trellino.Models.Board(params);

    newBoard.save({}, {
      success: function(){
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }, 
})