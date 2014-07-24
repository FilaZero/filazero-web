define(['handlebars','jquery','underscore','backbone','text!manager/templates/registerClient.html','jqueryValidate','collections/clientCollection','bootstrap'],function(Handlebars,$,_,Backbone,registerClientTemplate,jqueryValidate,ClientsCollection){
  'use strict';
  var registerClientView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(registerClientTemplate),
    initialize:function() {
      ClientsCollection.fetch();
      console.log('Initializing RegisterClient View'); 
      this.render();

      //DOM
      this.$CPF = this.$("#CPF");
      this.$Nome = this.$("#Nome");
      this.$Sexo = this.$("#Sexo");
      this.$Email = this.$("#Email");
      this.$Telefone = this.$("#Telefone");
      this.$("#CPF").blur(function(){
          alert("O input perdeu o foco.");
      });
    },
    events: {
      'click #add-client' : 'addClient'
    },
    addClient : function(event){
      ClientsCollection.create({CPF: this.$CPF.val(),
                   Nome: this.$Nome.val(),
                   Sexo: this.$Sexo.val(),
                   Email: this.$Email.val(),
                   Telefone: this.$Telefone.val()}); 
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerClientView;
});