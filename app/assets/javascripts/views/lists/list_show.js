Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  className: "col-xs-4",
  
  render: function(){
    var view = this;

    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent)
    
    this.attachSubviews();

    // this.model.cards().each(function(card){
    //   var cardShow = new Trellino.Views.CardShow({
    //     model: card
    //   });
    //   
    //   this.$("#cards").prepend(cardShow.render().$el);
    // })
    
    return this;
  },
})

