Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  newCardTemplate: JST["cards/new"],
  className: "col-xs-4",
  
  initialize: function(){
    this.model.cards().each(this.addCard.bind(this));
  },
  
  events: {
    "click button#new-card" : "newCard",
    "submit" : "submitNewCard",
  },
  
  addCard: function(card){
    var cardShowView = new Trellino.Views.CardShow({ model: card });
    this.addSubview("#cards", cardShowView) 
  },
  
  render: function(){
    var view = this;

    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent)
    
    this.attachSubviews();
    
    return this;
  },
  
  
  newCard: function(){ 
    $(".new-card").html(this.newCardTemplate({
      list: this.model
    }));
  },
  
  submitNewCard: function(event){
    event.preventDefault();
    
    var params = $("form").serializeJSON().card;
    var lastRank = this.model.cards().length;
    var newCard = new Trellino.Models.Card(params);  
    newCard.set({"rank": lastRank + 1});
    var list = this.model;
    
    newCard.save({}, {
      success: function(){ 
        alert("success")
        this.addCard(newCard);
      }
    });
    
    this.render();
  },
})

