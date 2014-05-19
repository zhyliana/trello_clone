Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/list/" + this.list_id + "/cards",
  // urlRoot: "/api/cards",  
});