Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  newboardTemplate: JST["boards/new"],
  boardTemplate: JST["boards/form"],
  className: "index",
  
  events: {
    "click button#new-board" : "newBoard",
    "submit": "submitNewBoard",
    "click button#destroy" : "destroy"
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

    var view = this;
    Trellino.Collections.boards.each(function(board){
      var boardsShow = view.boardTemplate({
        board: board
      });
      
      $("#boards").append(boardsShow);
    })
    
    return this;
  },
  
  destroy: function(){
    alert("destroooy!");
    debugger
    // this.model.destroy;
  },
  
  newBoard: function(){
    $(".new-board").html(this.newboardTemplate());
  },
   
  submitNewBoard: function(event){
    event.preventDefault();

    var params = $("form").serializeJSON().board;
    var newBoard = new Trellino.Models.Board(params);
    newBoard.save({}, {
      success: function(){
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("#/boards/" + newBoard.id, {trigger: true});
      }
    });
  },
});