define(['handlebars','jquery','underscore','backbone','text!manager/templates/listDoctor.html','manager/collections/doctorCollection','bootstrap'],function(Handlebars,$,_,Backbone,listDoctorTemplate,DoctorsCollection){
  'use strict';
  var listDoctorView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listDoctorTemplate),
    initialize:function() {
      DoctorsCollection.fetch();
      console.log('Initializing ListDoctor View'); 
      this.render();

      //Dom
      this.$tbody = this.$('#mytable #tbody');
      this.setDoctors(this.$tbody);
    },
    setDoctors:function($tbody){
        DoctorsCollection.each(function(model) {
          $tbody.append('<tr>')
          $tbody.append('<td>'+model.get("CRM")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Descricao")+ '</td>');
          $tbody.append('<td><p><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append(' <td><p><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return listDoctorView;
});