define(['handlebars','jquery','underscore','backbone','text!manager/templates/listDoctor.html','manager/collections/doctorCollection','bootstrap'],function(Handlebars,$,_,Backbone,listDoctorTemplate,DoctorsCollection){
  'use strict';
  var listDoctorView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listDoctorTemplate),
    initialize:function() {
      this.render();
      console.log('Initializing ListDoctor View');      
      //Dom
      this.$tbody = this.$('#mytable #tbody');
      this.setDoctors(this.$tbody);
    },
    events: {
      'click #btn-delete-doctor': 'modalDelete',
      'click #btn-confirm-doctor': 'deleteConfirm'
    },
    modalDelete:function(e){
      this.$("#deleteDoctor").modal();
      this.$("#btn-confirm-doctor").attr('doctorId',e.currentTarget.attributes[2].value); 
    },
    deleteConfirm:function(e) {
      var idForDelete =  this.$("#btn-confirm-doctor").attr('doctorId');
      var modelDelete = DoctorsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("CRM")});
      modelDelete.destroy();
      this.$("#deleteDoctor").modal("hide");
    },
    setDoctors:function($tbody){
        DoctorsCollection.each(function(model) {
          $tbody.append('<tr>')
          $tbody.append('<td>'+model.get("CRM")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Especialidade")+ '</td>');
          $tbody.append('<td>'+model.get("Descricao")+ '</td>');
          $tbody.append('<td><p><button  class="btn btn-primary btn-xs" idDoctor='+model.cid+' data-title="Edit" data-toggle="modal" data-target="#edit" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append(' <td><p><button id = "btn-delete-doctor" class="btn btn-danger btn-xs" idDoctor='+model.cid+' data-title="Delete" data-toggle="modal" data-target="#delete" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
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