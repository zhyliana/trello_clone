Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  newBoardTemplate: JST["boards/new"],
  boardTemplate: JST["boards/form"],
  newMemeberTemplate: JST["boards/new_member"],
  className: "index",
  
  events: {
    "click button#new-board" : "newBoard",
    "submit #new-board-form": "submitNewBoard",
    "click button#new-member" : "newMember",
    "submit #new-member-form" : "submitNewMember",
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
  
  newBoard: function(){
    $(".new-board").html(this.newBoardTemplate());
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
  
  newMember: function(event){
    $("#members").html(this.newMemeberTemplate())
  },
  
  submitNewMember: function(event){
    event.preventDefault();
    var boardID = $(event.currentTarget).parent().parent().parent().parent().data('board-id');
    var params = $("form").serializeJSON().board;
    var board = Trellino.Collections.boards.get(parseInt(boardID));
    board.save(params, {
      success: function(){
        Trellino.Model.Board.members.add(newMember);
        Backbone.history.navigate("", {trigger: true});
      }
    })
  }
});