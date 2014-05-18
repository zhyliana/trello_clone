Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function(){
    return "api/boards/" + this.board_id + "/lists";
  },
  
  cards: function () {
        debugger
    if (!this._cards) {
      this._cards = new Trellino.Collections.ListCards([], {
        list: this
      });
    }

    return this._cards;
  },
  
  parse: function (jsonResp) {
    if (jsonResp.cards) {
      this.cards().set(jsonResp.cards);
      delete jsonResp.lists;
    }

    return jsonResp;
  }
});