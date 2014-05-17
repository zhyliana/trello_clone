Trellino.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],
  listTemplate: JST["lists/new"],
  className: "board",
  
  events: {
    "click button#new-list" : "newList",
    "submit" : "submitNewList"
  },
  
  initialize: function(option){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync add remove", this.render)
  },
  
  render: function(){
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.model.lists().each(function(list){
      var listShow = new Trellino.Views.ListShow({
        model: list
      });
      
      this.$("#lists").append(listShow.render().$el);
    })
    
    return this;
  },
  
  
  newList: function(){
    $(".new-list").append(this.listTemplate({
      board: this.model
    }));
  },
  
  submitNewList: function(event){
    event.preventDefault();
    
    var params = $("form").serializeJSON()["list"];
    var newList = new Trellino.Models.List(params);
    debugger
    newList.save({}, {
      success: function(){
        this.model.lists().add(newList);
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },
  
  
})