
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  waitOn: function () {
     Meteor.subscribe('tareas');
     return
  },
});
Router.route('/', { name: 'home' });
Router.route('/reportes/:_id', {
  name: 'reportes',
  data: function (){
    Session.set("reporteId",this.params._id);
    return Tareas.findOne(this.params._id)},
  waitOn: function() {
    Meteor.subscribe("reportes");
  }
 });
 Router.route('/administrador', {
   name: "administrador",
   data:()=> {
    Tareas.find({ item: null })
   }
 })

 const requireLogin = function () {
   if (!Meteor.user()) {
     if (Meteor.loggingIn()) {
       this.render(this.loadingTemplate);
     } else {
       this.render('notFound');
     }
   } else {
       this.next();
   }
 };
 Router.onBeforeAction(requireLogin, { only: ['administrador', 'reportes'] });
