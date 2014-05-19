Trellino.Models.List = Backbone.Model.extend({

  urlRoot: function(){
    return "/api/boards/" + this.get("board_id") + "/lists";
  },
  
  cards: function () {
    if (!this._cards) {
      this._cards = new Trellino.Collections.ListCards([], {
        list: this
      });
    }

    return this._cards;
  },
  
  parse: function (jsonResp) {
    if (jsonResp.cards) {

      this.cards().set(jsonResp.cards, { parse: true });
      delete jsonResp.lists;
    }

    return jsonResp;
  }
});