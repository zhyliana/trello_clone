Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    //when you go to this page : invoke this function
    "" : "boardsIndex",
    "boards/:id" : "boardShow"
  },
  
  boardsIndex: function(){
    var indexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });
    
    Trellino.Collections.boards.fetch();
    this._swapView(indexView);
  },
  
  boardShow: function(id){
    var board = Trellino.Collections.boards.getOrFetch(id);
    board.fetch();
    
    board.lists().each(function(list){
      list.fetch();
    });

    var showView = new Trellino.Views.ShowBoard({
      model: board,
      lists: lists,
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

