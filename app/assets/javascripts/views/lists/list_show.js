Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  newCardTemplate: JST["cards/new"],
  className: "col-xs-4",
  
  events: {
    "click button#new-card-btn" : "newCard",
    "submit form#new-card-form" : "submitNewCard",
    "sortstop" : "updateCardRanks"
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
    this.addSubview(".cards", cardShowView) 
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
    $(event.target).parent().parent().html(this.newCardTemplate({
      list: this.model
    }));
  },
  
  updateCardRanks: function(event, ui){
    var list = this.model;
    var data = $(event.target).sortable('toArray');
    data.forEach( function(id){
      var id = parseInt(id);
      list.cards().fetch(id)
      console.log(list.cards())
      debugger
      // this.model
    })
    console.log(data)
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

