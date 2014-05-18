Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  lists: function () {    
    this._lists = this._lists ||
      new Trellino.Collections.BoardLists([], { board: this });
      
      
    // if (!this._lists) {
    //   this._lists = new Trellino.Collections.BoardLists([], {
    //     board: this
    //   });
    // }

    return this._lists;
  },
  
  parse: function (jsonResp) {
    if (jsonResp.lists) {
      this.lists().set(jsonResp.lists, { parse: true });
      delete jsonResp.lists;
    }

    return jsonResp;
  }
});
