define(['handlebars','jquery','underscore','backbone','text!manager/templates/listAppointment.html','manager/collections/appointmentCollection','bootstrap'],function(Handlebars,$,_,Backbone,listAppointmentTemplate,AppointmentsCollection){
  'use strict';
  var listAppointmentView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listAppointmentTemplate),

    initialize:function() {
      this.render();
      console.log('Initializing ListAppointment View');

      //Dom
       //DOM
      this.$PK_Consulta = this.$("PK_Consulta");
      this.$CPF = this.$("#CPF");
      this.$CRM = this.$("#CRM");
      this.$Data = this.$("#Data");
      this.$Turno = this.$("#Turno");
      this.$tbody = this.$('#mytable #tbody');
      this.setAppointments(this.$tbody);
    },
    events: {
      'click #btn-delete': 'modalDelete',
      'click #btn-confirm': 'deleteConfirm',
      'click #btn-edit': 'modalConfirm',
      'click #btn-update': 'updateConfirm',
    },
    editConfirm:function(e){
      this.$("#edit").modal();
      var model = AppointmentsCollection.get(e.currentTarget.attributes[1].value);
      this.$PK_Consulta.val(model.get("PK_Consulta"));
      this.$CPF.val(model.get("CPF"));
      this.$CRM.val(model.get("CRM"));      
      this.$Data.val(model.get("Data"));
      this.$Turno.val(model.get("Turno"));
      this.$('#btn-update').attr('idConsulta',e.currentTarget.attributes[1].value);
    },
    modalConfirm:function(e){
      this.$("#confirme").modal();
      this.$("#btn-update").attr('appointmentId',e.currentTarget.attributes[1].value); 
    },
    updateConfirm:function(e){      
      var modelUpdate = AppointmentsCollection.get(e.currentTarget.attributes[4].value);
      modelUpdate.set({id: this.$PK_Consulta.val()});
      modelUpdate.save({},{url:'manager/consulta/'+ modelUpdate.get('id')});
      this.$("#edit").modal("hide");
    },
    modalDelete:function(e){
      this.$("#delete").modal();
      this.$("#btn-confirm").attr('appointmentId',e.currentTarget.attributes[1].value); 
    },
    deleteConfirm:function(e) {
      var idForDelete =  this.$("#btn-confirm").attr('appointmentId');
      var modelDelete = AppointmentsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("PK_Consulta")});
      modelDelete.destroy();
      this.$("#delete").modal("hide");
    },
    setAppointments:function($tbody){
        AppointmentsCollection.each(function(model) {
          $tbody.append('<tr>');
          $tbody.append('<td>'+model.get("NomeCliente")+ '</td>');
          $tbody.append('<td>'+model.get("NomeMedico")+ '</td>');
          $tbody.append('<td>'+model.get("Data")+ '</td>');
          $tbody.append('<td>'+model.get("Turno")+ '</td>');
          $tbody.append('<td><p><button id="btn-edit" idAppointment='+model.cid+' class="btn btn-primary btn-xs" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append('<td><p><button id="btn-delete"  idAppointment='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$("#delete").modal("hide");
      this.$el.html(this.template);
      return this;
    }
  });
  return listAppointmentView;
});