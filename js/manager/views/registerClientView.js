define(['handlebars','jquery','underscore','backbone','text!manager/templates/registerClient.html','jqueryValidate','manager/collections/clientCollection','bootstrap'],function(Handlebars,$,_,Backbone,registerClientTemplate,jqueryValidate,ClientsCollection){
  'use strict';
  var registerClientView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(registerClientTemplate),
    initialize:function() {
      console.log('Initializing RegisterClient View'); 
      this.render();

      //DOM
      this.$CPF = this.$("#CPF");
      this.$Nome = this.$("#Nome");
      this.$Sexo = this.$("#Sexo");
      this.$Email = this.$("#Email");
      this.$Telefone = this.$("#Telefone");
      this.existCPF(this.$CPF,this.$Nome,this.$Sexo,this.$Email,this.$Telefone);
    },
    events: {
      'click #add-client' : 'addClient'
    },
    existCPF:function($CPF,$Nome,$Sexo,$Email,$Telefone) {
      $CPF.blur(function(){ 
        ClientsCollection.each(function(model) {
          if(model.get("CPF") == $CPF.val()){        
            $Nome.val(model.get("Nome"));
            $Sexo.val(model.get("Sexo"));
            $Email.val(model.get("Email"));
            $Telefone.val(model.get("Telefone"));
          }
        });
      });
      
    },
    addClient: function(e){
      ClientsCollection.create({CPF: this.$CPF.val(),
                   Nome: this.$Nome.val(),
                   Sexo: this.$Sexo.val(),
                   Email: this.$Email.val(),
                   Telefone: this.$Telefone.val()}); 
      this.$("#modal-delete").modal();
      this.$CPF.val("");
      this.$Nome.val("");
      this.$Sexo.val("");
      this.$Email.val("");
      this.$Telefone.val("");
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerClientView;
});