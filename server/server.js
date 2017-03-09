Meteor.publish("tareas", function(){
  return Tareas.find();
});

Meteor.publish("reportes", function(){
  return Reportes.find();
});
