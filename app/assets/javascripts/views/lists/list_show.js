Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  className: "col-xs-4",
  
  initialize: function(){
    this.model.cards().each(this.addCard.bind(this));
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
})

