Trellino.Views.BoardCompView = Backbone.CompositeView.extend({
  boardTemplate: JST["boards/index_comp"],
  className: 'col-xs-4',
  newMemeberTemplate: JST["boards/new_member"],
  
  events: {
    "click button#new-member" : "newMember",
    "submit #new-member-form" : "submitNewMember",
  },
  
  render: function(){
    var content = this.boardTemplate({
      board: this.model
    })
    this.$el.html(content);
    return this;
  },
  
  newMember: function(event){
    $("#members").html(this.newMemeberTemplate())
  },
  
  submitNewMember: function(event){
    event.preventDefault();
    var params = $("form").serializeJSON().board;
    var board = this.model;
    var view = this;
    board.save(params, {
      success: function(){
        alert("success")
        view.render();
        // Backbone.history.navigate("", {trigger: true});
      },
      error: function(){
        alert("User Not Found")
      }
    })
  },
});
