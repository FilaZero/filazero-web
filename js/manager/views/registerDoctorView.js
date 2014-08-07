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
      this.existCRM(this.$CRM,this.$Nome,this.$Descricao);
    },
    events: {
      'click #add-doctor' : 'addDoctor'
    },
    existCRM:function($CRM,$Nome,$Descricao) {
      $CRM.blur(function(){ 
        DoctorsCollection.each(function(model) {
          if(model.get("CRM") == $CRM.val()){        
            $Nome.val(model.get("Nome"));
            $Descricao.val(model.get("Descricao"));
          }
        });
      });
      
    },
    addDoctor : function(event){
      DoctorsCollection.create({CRM: this.$CRM.val(),
                   Nome: this.$Nome.val(),
                   Descricao: this.$Descricao.val()}); 
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerDoctorView;
});