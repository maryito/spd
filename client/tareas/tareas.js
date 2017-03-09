Template.tareas.helpers({
  listaTareas: function(){
      return Tareas.find()
  },
});


Template.tareas.events({
  "click button": function(event, template){
    event.preventDefault();
    let dep = this.dependencia
    // console.log(dep);
    Meteor.call("tareas.dep",this._id, dep, function(error, result){
      if(error){
        console.log("error", error);
      }
      if (result.completo) {
        sAlert.info("Felicidades Actividad ya realizada. ");
      }
      if(result.ok){
        // console.log(result);

        Router.go('reportes',{'_id':result.resp })
      }else {
        const d =result.resp
        _.each( d, (i) => {
          sAlert.warning(i);
        })
      }
    });
  }
});
// Template.tareaItem.events({
//   "click button": function(event, template){
//     event.preventDefault();
//     alert("proximamente")
//
//   }
// });
