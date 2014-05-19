Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function(){
    return "/api/board/" + this.get("board_id") + "/lists";
  },
  
  initialize: function(models, options) { 

    this.board = options.board;
  }
});
