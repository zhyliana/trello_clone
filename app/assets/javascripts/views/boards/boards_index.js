Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  boardTemplate: JST["boards/new"],
  className: "row",
  
  events: {
    "click button#new-board" : "newBoard",
    "submit": "submitNewBoard"
  },

  initialize: function(options){
    this.listenTo(
      this.collection, 
      "sync add", 
      this.render
    );
  },
  
  render: function(){
    var renderedContent = this.template({
      boards: this.collection
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  newBoard: function(){
    $(".new-board").append(this.boardTemplate());
  },
   
  submitNewBoard: function(event){
    event.preventDefault();
    alert("submitBoard")
    var params = $(event.currentTarget).serializeJSON()["board"];
    var newBoard = new Trellino.Models.Board(params);
    debugger
    newBoard.save({}, {
      success: function(){
        alert("success")
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("#/boards/"+ newBoard.id, {trigger: true});
      }
    });
  },
});