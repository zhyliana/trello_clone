Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function(){
    return this.board.url() + "/" + this.board.id + "/lists";
  },
  
  initialize: function (models, options) { 
    this.board = options.board;
  }
});