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
      this.existCNES(this.$CNES,this.$Nome,this.$Descricao,this.$Numero);
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
            $Numero.val(model.get("Numero"));
          }
        });
      });
      
    },
    addEstab : function(event){
      EstabsCollection.create({CNES: this.$CNES.val(),
                   Nome: this.$Nome.val(),
                   Descricao: this.$Descricao.val(),
                   Numero: this.$Numero.val()}); 
    },
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return registerEstabView;
});