Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  newCardTemplate: JST["cards/new"],
  className: "col-xs-4",
  
  events: {
    "click button#new-card" : "newCard",
    "submit form#new-card-form" : "submitNewCard",
  },
  
  initialize: function(){
    this.listenTo(this.model, "sync add remove", this.render);
    this.listenTo(
      this.model.cards(),
      "sync add",
      this.addCard
    ); 
   
   this.model.cards().each(this.addCard.bind(this));
  },
  
  addCard: function(card){
    var cardShowView = new Trellino.Views.CardShow({ model: card });
    this.addSubview("#cards", cardShowView) 
  },
  
  render: function(){
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent)  
    this.attachSubviews();
    
    return this;
  },
  
  
  newCard: function(){ 
    debugger
    $(event.target).parent().parent().parent().html(this.newCardTemplate({
      list: this.model
    }));
  },
  
  submitNewCard: function(event){
    event.preventDefault();
    
    var params = $("#new-card-form").serializeJSON().card;
    var lastRank = this.model.cards().length;
    var newCard = new Trellino.Models.Card(params);  
    newCard.set({"rank": lastRank + 1});
    
    var view = this;
    
    newCard.save({}, {
      success: function(){ 
        view.addCard(newCard);
      }
    });
    
    this.render();
  },
})

