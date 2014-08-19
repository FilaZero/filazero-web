define(['handlebars','jquery','underscore','backbone','text!manager/templates/registerDoctor.html','jqueryValidate','manager/collections/doctorCollection','bootstrap'],function(Handlebars,$,_,Backbone,registerDoctorTemplate,jqueryValidate,DoctorsCollection){
  'use strict';
  var registerDoctorView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(registerDoctorTemplate),
    initialize:function() {
      DoctorsCollection.fetch();
      console.log('Initializing RegisterDoctor View'); 
      this.render();

      //DOM
      this.$CRM = this.$("#CRM");
      this.$Nome = this.$("#Nome");
      this.$Descricao = this.$("#Descricao");
      this.$Especialidade = this.$("#Especialidade");
      this.existCRM(this.$CRM,this.$Nome,this.$Descricao,this.$Especialidade);
    },
    events: {
      'click #add-doctor' : 'addDoctor'
    },
    existCRM:function($CRM,$Nome,$Descricao,$Especialidade) {
      $CRM.blur(function(){ 
        DoctorsCollection.each(function(model) {
          if(model.get("CRM") == $CRM.val()){        
            $Nome.val(model.get("Nome"));
            $Descricao.val(model.get("Descricao"));
            $Especialidade.val(model.get("Especialidade"));
          }
        });
      });
      
    },
    addDoctor : function(event){
      DoctorsCollection.create({CRM: this.$CRM.val(),
                   Nome: this.$Nome.val(),
                   Descricao: this.$Descricao.val(),
                   Especialidade: this.$Especialidade.val()}); 
      this.$("#modal-delete-doctor").modal();
      this.$CRM.val("");
      this.$Nome.val("");
      this.$Descricao.val("");
      this.$Especialidade.val("");
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerDoctorView;
});