define(['handlebars',
  'jquery',
  'underscore',
  'backbone',
  'text!manager/templates/listAppointment.html',
  'manager/collections/appointmentCollection',
  'manager/collections/queueCollection',
  'bootstrap'],
  function(Handlebars,$,_,Backbone,listAppointmentTemplate,AppointmentsCollection,QueuesCollection){
  'use strict';
  var listAppointmentView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listAppointmentTemplate),

    initialize:function() {
      this.render();       
      console.log('Initializing ListAppointment View');



      this.$PK_Consulta = this.$("PK_Consulta");
      this.$CPF = this.$("#CPF");
      this.$CRM = this.$("#CRM");
      this.$Data = this.$("#Data");
      this.$Turno = this.$("#Turno");
      this.$tbody = this.$('#mytable #tbody');
      this.setAppointments(this.$tbody);
    },
    events: {
      'click #btnCancel': 'modalCancel',
      'click #btn-cancel-consulta': 'cancel',
      'click #btnConfirm': 'modalConfirm',
      'click #btn-confirm-consulta': 'confirm', 
      
    },
    modalConfirm:function(e){
      this.$("#confirm").modal();
      this.$("#btn-confirm-consulta").attr('appointmentId',e.currentTarget.attributes[1].value); 
    },
    confirm:function(e){     
      var idForConfirm =  this.$("#btn-confirm-consulta").attr('appointmentId');
      var model = AppointmentsCollection.get(idForConfirm);
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
        this.$("#confirm").modal("hide");
        QueuesCollection.fetch(); //atualiza a fila
        AppointmentsCollection.fetch();
    },
    modalCancel:function(e){
      this.$("#cancel").modal();
      this.$("#btn-cancel-consulta").attr('appointmentId', e.currentTarget.attributes[1].value); 
    },
    cancel:function(e) {
      var idForDelete =  this.$("#btn-cancel-consulta").attr('appointmentId');
      var modelDelete = AppointmentsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("PK_Consulta")});
      modelDelete.destroy();
      this.$("#cancel").modal("hide");
      QueuesCollection.fetch();
    },
    setAppointments:function($tbody){
        AppointmentsCollection.each(function(model) {
          $tbody.append('<tr>');
          $tbody.append('<td>'+model.get("NomeCliente")+ '</td>');
          $tbody.append('<td>'+model.get("NomeMedico")+ '</td>');
          $tbody.append('<td>'+model.get("Data")+ '</td>');
          $tbody.append('<td>'+model.get("Turno")+ '</td>');
          $tbody.append('<td>'+model.get("Status")+ '</td>');
          $tbody.append('<td><p><button id="btnConfirm" appointmentId='+model.cid+' class="btn btn-success btn-xs" data-title="Confirm"><span class="glyphicon glyphicon-ok"></span></button></p></td>');
          $tbody.append('<td><p><button id="btnCancel"  appointmentId='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-remove"></span></button></p></td>');
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