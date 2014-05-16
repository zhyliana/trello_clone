Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  className: ".boards-index",
  
  // events: {
  //   "click a#new-board" : "newBoard"
  // },
  
  
  initialize: function(options){
    //[hey you...].listenTo( [when this...], [...does this...], [...you do that] )
    
    this.listenTo(
      this.collection, 
      "sync add", 
      this.render
    );
  },
  
  render: function(){
    var renderedContent = this.template({
      boards: this.collection
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  // newBoard: function(){
  //   alert("new board")
  //   
  //   $("#content").append(new Trellino.Views.NewBoard())
  // }
});