Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    //when you go to this page : invoke this function
    "" : "boardsIndex",
    "boards/new" : "boardsNew",
    "boards/:id" : "boardShow"
  },
  
  boardsIndex: function(){
    var indexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });
    
    Trellino.Collections.boards.fetch();
    this._swapView(indexView);
  },
  
  boardsNew: function(){
    var newView = new Trellino.Views.NewBoard();  
    this._swapView(newView);
  },
  
  boardShow: function(id){
    var board = Trellino.Collections.boards.getOrFetch(id);
    board.fetch();
    
    var showView = new Trellino.Views.ShowBoard({
      model: board
    })
    
    this._swapView(showView);
  },
  
  _swapView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    $('#content').html(view.render().$el);
  }
  
});