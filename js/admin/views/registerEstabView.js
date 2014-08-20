define(['handlebars','jquery','underscore','backbone','text!admin/templates/registerEstab.html','jqueryValidate','admin/collections/estabCollection','bootstrap'],function(Handlebars,$,_,Backbone,registerEstabTemplate,jqueryValidate,EstabsCollection){
  'use strict';
  var registerEstabView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(registerEstabTemplate),
    initialize:function() {
      EstabsCollection.fetch();
      console.log('Initializing RegisterEstab View'); 
      this.render();

      //DOM
      this.$CNES = this.$("#CNES");
      this.$Nome = this.$("#Nome");
      this.$Descricao = this.$("#Descricao");
      this.$Numero = this.$("#Numero");
      this.$Rua = this.$("#Rua");
      this.$Bairro = this.$("#Bairro");
      this.$Cidade = this.$("#Cidade");
      this.$Estado = this.$("#Estado");

      this.existCNES(this.$CNES,this.$Nome,this.$Descricao,this.$Rua,this.$Numero,this.$Bairro,this.$Cidade,this.$Estado);
    },
    events: {
      'click #add-estab' : 'addEstab'
    },
    existCNES:function($CNES,$Nome,$Descricao,$Numero) {
      $CNES.blur(function(){ 
        EstabsCollection.each(function(model) {
          if(model.get("CNES") == $CNES.val()){        
            $Nome.val(model.get("Nome"));
            $Descricao.val(model.get("Descricao"));
            $Rua.val(model.get("Rua"));
            $Numero.val(model.get("Numero"));
            $Bairro.val(model.get("Bairro"));
            $Cidade.val(model.get("Cidade"));
            $Estado.val(model.get("Estado"));
          }
        });
      });
      
    },
    addEstab : function(event){
      EstabsCollection.create({CNES: this.$CNES.val(),
                   Nome: this.$Nome.val(),
                   Descricao: this.$Descricao.val(),
                   Rua: this.$Rua.val(),
                   Numero: this.$Numero.val(),
                   Bairro: this.$Bairro.val(),
                   Cidade: this.$Cidade.val(),
                   Estado: this.$Estado.val()}); 
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerEstabView;
});