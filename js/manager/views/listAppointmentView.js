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
      'click #btnCancelar': 'modalDelete',
      'click #btn-confirm-cancelar': 'deleteConfirm',
      'click #btnConfirm': 'Confirm'
    },
    Confirm:function(e){
      var model = AppointmentsCollection.get(e.currentTarget.attributes[1].value);
      console.log(model.get("PK_Consulta"));
      $.ajax({
        url:"manager/consulta",
        type:"PUT",
          data: JSON.stringify({
          PK_Consulta: model.get("PK_Consulta")
        }),
        contentType:"application/json",
        dataType:"json",
        statusCode: {
          403: function() {
            console.log("ERROR");
          },
          200: function(){
            console.log("OK");
          }
          }
        });
    },
    modalConfirm:function(e){
      this.$("#confirme").modal();
      this.$("#btn-update").attr('appointmentId',e.currentTarget.attributes[1].value); 
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
          $tbody.append('<td><p><button id="btnConfirm" idAppointment='+model.cid+' class="btn btn-success btn-xs" data-title="Confirm"><span class="glyphicon glyphicon-ok"></span></button></p></td>');
          $tbody.append('<td><p><button id="btnCancelar"  idAppointment='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-remove"></span></button></p></td>');
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