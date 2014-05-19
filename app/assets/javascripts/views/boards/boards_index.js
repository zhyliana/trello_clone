Trellino.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  newBoardTemplate: JST["boards/new"],
  className: "index",
  
  events: {
    "click button#new-board" : "newBoard",
    // "click #new-member-submit" : "submitNewBoard",
    "submit form#new-board-form": "submitNewBoard",
  },

  initialize: function(options){
    this.listenTo(
      this.collection, 
      "sync", 
      this.render
    );
    this.listenTo(
      this.collection,
      "add",
      this.addBoardCompView
    );
    
   this.collection.each(function(board){
     this.addBoardCompView(board);
     // this.addBoardCompView.bind(this)(board);
   });    
  },
  
  addBoardCompView: function(board){
    var boardCompView = new Trellino.Views.BoardCompView({ model: board });
    this.addSubview("#boards", boardCompView)
  },
  
  render: function(){
    var renderedContent = this.template({
      boards: this.collection
    });  
    this.$el.html(renderedContent);   
    this.attachSubviews();   
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
  
});