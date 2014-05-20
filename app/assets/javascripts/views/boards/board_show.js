Trellino.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  listTemplate: JST["lists/new"],
  className: "board",
  
  events: {
    "click button#new-list" : "newList",
    "submit" : "submitNewList",
    "click button#destroy" : "destroy"
  },
  
  initialize: function(option){
    this.listenTo(this.model, "sync add remove", this.render);      
    this.listenTo(this.model.lists(), "sync add", this.addList);   
    this.model.lists().each(this.addList.bind(this));
  },
  
  addList: function(list){
    var listShowView =  new Trellino.Views.ListShow({ model: list });   
    this.addSubview(".lists", listShowView);
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model
    });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.$(".cards").sortable({
      axis: "y",
      containment: "parent",
      cursor: "move",
      cursorAt: { top: 5 },
      tolerance: "pointer",
      opacity: 0.75,
      revert: true,
      
      update: function(event, ui) {
        var data = $(this).sortable('toArray');
        data.forEach( function(id){
          Trellino.Collections.ListCards.
        })
        debugger
      }
      //       update: function(event, ui){
      //   var data = $(this).sortable('serialize');
      // }
    });
    
    this.$(".lists").sortable({
      // containment: "parent",
      // cursor: "grab",
      cursor: "move",
      cursorAt: { top: 5 },
      tolerance: "pointer",
      opacity: 0.75,
      revert: true,

    });
    
    
    return this;
  },
  
  newList: function(){ 
    $(".new-list").html(this.listTemplate({
      board: this.model
    }));
  },
  
  submitNewList: function(event){
    event.preventDefault();
    
    var params = $("form").serializeJSON().list;
    var lastRank = this.model.lists().length;
    var newList = new Trellino.Models.List(params);  
    newList.set({"rank": lastRank + 1});

    var view = this;
    newList.save({}, {
      success: function(){ 
        view.addList(newList);
      }
    });
    
    this.render();
  },
  
  
  destroy: function(event){
    event.preventDefault(); 
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true})
  },
   
})