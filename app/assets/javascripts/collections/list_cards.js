Trellino.Collections.ListCards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  
  url: function(){
    return "/api/list/" + this.get("list_id") + "/cards";
  },
  
  comparator: function(list) {
    return list.get("rank");
  },
  
  initialize: function(models, options) { 
    this.list = options.list;
  }
});