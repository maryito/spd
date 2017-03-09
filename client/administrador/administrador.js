
Template.administrador.helpers({
  tareas: function(){
    return Tareas.find({},{fields: {tareas: 1}}).count()
  },
  consultas: () => {
      x = Tareas.find({ item: null })
      console.log( x.nommbre);
      console.log( x.porcentaje);
      Session.set("1", x.nombre )
      return x
      //
      // label.put( x.nombre)
      // value.put( x.porcentaje)

  }
});

const  data = {
  labels: ['tarea #1','tarea #2','tarea #3','tarea #4'],
  series: [
    [5,10,6,12],
    [7,2,12,9]
  ]
};
const options = {
  width: 300,
  height: 300,
}

Template.administrador.rendered = () => {
  let hola = [];
  let valor1 = [];
  let valor2 = [];
  let c =2;
  const label = Tareas.find({ item: null }).fetch()
  _.each( label, (x) => {
    hola.push(x.nombre)
    let xl = 2*c*5;
    let xl2 = 2*c+1*3;
    valor1.push(xl)
    valor2.push(xl2)
    c =+ 2;
  })

  new Chartist.Bar('.ct-chart',{
    // labels: ['Lunes','Martes','Miercoles','Jueves','Viernes'],
    labels: hola,
    series: [valor1, valor2],
    // series: [
    //   [1,4,6,2,7],
    //   [10,45,60,25,71]
    // ]
  });
  new Chartist.Line('#chart1',data,options);
  // new Chartist.Line('#chart1',{
  //   labels: hola,
  //   series: [valor1, valor2],
  // });

}
