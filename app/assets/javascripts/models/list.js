Trellino.Models.List = Backbone.CompositeView.extend({
  urlRoot: "api/lists",
  
  //   urlRoot: function(){
  //   return "api/boards/" + this.board_id + "/lists";
  // },
  
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
      this.cards().set(jsonResp.cards);
      delete jsonResp.lists;
    }

    return jsonResp;
  }
});