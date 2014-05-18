Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function(){
    return this.board.url() + "/lists";
  },
  
  initialize: function(models, options) { 
    debugger
    this.board = options.board;
  }
});

window.Trellino.Collections.lists = new Trellino.Collections.BoardLists();