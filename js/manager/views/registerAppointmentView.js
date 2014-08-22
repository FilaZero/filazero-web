define(['handlebars','jquery','underscore','backbone','text!manager/templates/registerAppointment.html','jqueryValidate','manager/collections/appointmentCollection','bootstrap'],function(Handlebars,$,_,Backbone,registerAppointmentTemplate,jqueryValidate,AppointmentsCollection){
  'use strict';
  var registerAppointmentView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(registerAppointmentTemplate),
    initialize:function() {
      console.log('Initializing RegisterAppointment View'); 
      this.render();

      //DOM
      this.$CPF = this.$("#CPF");
      this.$CRM = this.$("#CRM");
      this.$Data = this.$("#Data");
      this.$Turno = this.$("#Turno");
      //this.existCPF(this.$PK_Consulta,this.$CPF,this.$CRM,this.$Data,this.$Turno);
    },
    events: {
      'click #add-appointment' : 'addAppointment'
    },
    /*existCPF:function($PK_Consulta,$CPF,$CRM,$Data,$Turno) {
      $PK_Consulta.blur(function(){ 
        AppointmentsCollection.each(function(model) {
          if(model.get("PK_Consulta") == $PK_Consulta.val()){        
            $CPF.val(model.get("CPF"));
            $CRM.val(model.get("CRM"));
            $Data.val(model.get("Data"));
            $Turno.val(model.get("Turno"));
          }
        });
      });
      
    },*/
    addAppointment: function(e){
      AppointmentsCollection.create({
                   PK_Consulta: "",
                   CPF: this.$CPF.val(),
                   CRM: this.$CRM.val(),
                   Data: this.$Data.val(),
                   Turno: this.$Turno.val()}); 
      this.$("#modal-delete").modal();
      this.$CPF.val("");
      this.$CRM.val("");
      this.$Data.val("");
      this.$Turno.val("");
      AppointmentsCollection.fetch();
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerAppointmentView;
});