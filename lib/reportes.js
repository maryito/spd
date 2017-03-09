Reportes = new Mongo.Collection('reportes')


Schemas = {};
Schemas.situacion = new SimpleSchema({
  "horas": {
    label: "¿Cuantas horas utilizo?",
     type: Number,
   },
   "personal": {
     label: "¿Cuanto personal necesito?",
      type: Number,
      min:0,
      max: 10
    },
})
// _id:{
//     type: String,
//     regEx: SimpleSchema.RegEx.Id,
//     autoform: { readonly: true }
// },
Schemas.reportes = new SimpleSchema({
 "pregunta": {
   label: 'Situacion a Reportar',
   type: String,
    autoform: {
      afFieldInput: {
        firstOption: '(Seleccione la situacion)',
        options: [
          { label: 'Falta de Mano de Obra', value: 1 },
          { label: 'Falta o falla del equipo', value: 2 },
          { label: 'Falta de Materiales o Demora en la Entrega', value: 3 },
          { label: 'Problemas con Subcontratistas', value: 4 },
          { label: 'Falta de Combustible', value: 5 },
          { label: 'Falta de Agrimensura', value: 6 },
          { label: 'Falta de Planos', value: 7 },
          { label: 'En espera de Prueba de Laboratorio', value: 8 },
          { label: 'Mala programación', value:9 },
          { label: 'Problemas Movilizando Material y Personal', value: 10 },
        ],
      },
    },
  },
  horas: {
    label: "Horas no laboras",
    type: Number,
    min:0,
    max:20,
  }

})


Meteor.methods({
  "tareas.dep": (id,dep) => {
    check(id,String);
    // console.log(dep);

    let temp = Tareas.findOne(id,{fields: { avance: 1}});
    // console.log(temp);

    if (temp.avance === 100) {
      return { completo: true };
    }

    let data =""
    let estado =false;
    let estado2 =false;
    if (dep[0]) {
      const rep = Tareas.find({item: {$in: dep } },{fields: {porcentaje: 1, nombre: 1, avance: 1}}).fetch()
      // console.log("data", rep);
      data = []
      _.each( rep, (x) => {
        if (x.avance === 100) {
          console.log("dependencia resuelta");
          estado2 =true
        }else {
          data.push("Debe realizar La Actividad de "+x.nombre+"  primero. ya que esta depende de ella.");
          estado2 = false
        }
      })
    }else{
      estado =true
    }

    if(estado || estado2){
      return {ok: true, resp: id };
    }else if (data && !estado2) {
      return {ok: false, resp: data };
    }else{
      return Meteor.Error(100, "algo paso");
    }

  } ,
  'resportes.enviar': function(id, data){
    check(data, Schemas.situacion);
    check(id, String);

    console.log("Guardando informes");
    console.log(data);
    if (Meteor.userId()) {
      Reportes.insert({
        actividad: Tareas.findOne(id,{fields: { nombre: 1}}),
        horas: data.horas,
        personal: data.personal,
        creadoBy: Meteor.userId(),
        fecha: new Date()
      })
      Tareas.update({_id:id}, {$set:{ avance: 100, horas: data.horas, estado: true
      }});

      return true;
    }

  }
  ,'resportes.situacion': function(id, data){
    check(data, Schemas.reportes);
    check(id, String);

    console.log("Guardando informes");
    console.log(data);
    if (Meteor.userId()) {
      Reportes.insert({
        actividad: Tareas.findOne(id,{fields: { nombre: 1}}),
        horas: -data.horas,
        situacion: Reportes.findOne({ numero: data.pregunta}),
        creadoBy: Meteor.userId(),
        fecha: new Date()
      })
      Tareas.update({_id:id}, {$set:{ horas: -data.horas
      }});

      return true;
    }

  }
});
