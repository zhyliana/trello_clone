Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function(){
    return this.board.url() + "/" + this.board_id + "/lists";
  },
  
  initialize: function (models, options) { 
    this.board = options.board;
  }
});

window.Trellino.Collections.lists = new Trellino.Collections.BoardLists();