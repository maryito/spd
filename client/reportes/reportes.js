Template.reportes.onCreated( () => {
  Session.set('mostrar',false)
  Session.set("reportar", false)
  Session.set("situacion", false)
})
Template.reportes.helpers({
  listaReporte: function(){
      return Reportes.find()
  },
  value: () => { return { _id: Session.get('reporteId') } },

  mostraPre: () => { return Session.get('mostrar')},
  situacion: () => { return Session.get('situacion')},
  reportar: () => { return Session.get('reportar')},
});
Template.reportes.events({
  "click .btnSi": function(event){
    event.preventDefault();
    Session.set('mostrar',true)
    Session.set("situacion", true)

  },
  "click .btnNo": function(event){
    event.preventDefault();
    Session.set('mostrar',true)
    Session.set("reportar", true)

  }
});
// "click button": function(event, template){
//   event.preventDefault();
//   alert("proximamente")
//
// }
AutoForm.hooks({
  reportesForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      // console.log(insertDoc, this.docId);

      if ( insertDoc){
        Meteor.call("resportes.enviar",this.docId, insertDoc, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
            alert("Reporte enviado con exito")
            Router.go('home')
          }
        });
        this.done();
      } else {
        this.done(new Error("Formulario fallido"));
      }
      // this.done();
      return false;
    }
  },
  preguntasForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      console.log(insertDoc, this.docId);

      if ( insertDoc && insertDoc.horas > 0 ){
        Meteor.call("resportes.situacion",this.docId, insertDoc, function(error, result){
          if(error){
            console.log("error", error);
            sAlert.error("ups ocurrion un error: 500");
          }
          if(result){
            sAlert.info("Reporte enviado con exito");

            Router.go('home')
          }
        });
        this.done();
      } else {
        this.done(new Error("Formulario fallido"));
        sAlert.warning("Falta datos en el formulario.  Por favor verifique!");
      }
      this.done();
      return false;
    }
  }

});
