define(['handlebars','jquery','underscore','backbone','text!admin/templates/listEstab.html','admin/collections/estabCollection','bootstrap'],function(Handlebars,$,_,Backbone,listEstabTemplate,EstabsCollection){
  'use strict';
  var listEstabView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listEstabTemplate),

    initialize:function() {
      this.render();
      console.log('Initializing ListEstab View');

      //Dom
       //DOM
      this.$CNES = this.$("#CNES");
      this.$Nome = this.$("#Nome");
      this.$Descricao = this.$("#Descricao");
      this.$Numero = this.$("#Numero");
      this.$Rua = this.$("#Rua");
      this.$Bairro = this.$("#Bairro");
      this.$Cidade = this.$("#Cidade");
      this.$Estado = this.$("#Estado");
      this.$tbody = this.$('#mytable #tbody');
      this.setEstabs(this.$tbody);
    },
    events: {
      'click #btn-delete': 'modalDelete',
      'click #btn-confirm': 'deleteConfirm',
      'click #btn-edit': 'editConfirm',
      'click #btn-update': 'updateConfirm',
    },
    editConfirm:function(e){
      this.$("#edit").modal();
      var model = EstabsCollection.get(e.currentTarget.attributes[1].value);
      this.$CNES.val(model.get("CNES"));
      this.$Nome.val(model.get("Nome"));
      this.$Descricao.val(model.get("Descricao"));
      this.$Rua.val(model.get("Rua"));
      this.$Numero.val(model.get("Numero"));
      this.$Bairro.val(model.get("Bairro"));
      this.$Cidade.val(model.get("Cidade"));
      this.$Estado.val(model.get("Estado"));
      this.$('#btn-update').attr('idEstab',e.currentTarget.attributes[1].value);
    },
    updateConfirm:function(e){
      var modelUpdate = EstabsCollection.get(e.currentTarget.attributes[4].value);
      console.log(modelUpdate);
      modelUpdate.set({id: this.$CNES.val(), CNES: this.$CNES.val(), Nome: this.$Nome.val(), Descricao: this.$Descricao.val(), Rua: this.$Rua.val(), Numero: this.$Numero.val(), Bairro: this.$Bairro.val(), Cidade: this.$Cidade.val(), Estado: this.$Estado.val()});
      modelUpdate.save({},{url:'adm/estabelecimento/'+ modelUpdate.get('id')});
      this.$("#edit").modal("hide");
    },
    modalDelete:function(e){
      this.$("#delete").modal();
      this.$("#btn-confirm").attr('estabId',e.currentTarget.attributes[1].value); 
    },
    deleteConfirm:function(e) {
      var idForDelete = this.$("#btn-confirm").attr('estabId');
      var modelDelete = EstabsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("CNES")});
      modelDelete.destroy();
      this.$("#delete").modal("hide");
    },
    setEstabs:function($tbody){
        EstabsCollection.each(function(model) {
          $tbody.append('<tr>');
          $tbody.append('<td>'+model.get("CNES")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Descricao")+ '</td>');
          $tbody.append('<td>'+model.get("Rua")+ '</td>');
          $tbody.append('<td>'+model.get("Numero")+ '</td>');
          $tbody.append('<td>'+model.get("Bairro")+ '</td>');
          $tbody.append('<td>'+model.get("Cidade")+ '</td>');
          $tbody.append('<td>'+model.get("Estado")+ '</td>');
          $tbody.append('<td><p><button id="btn-edit" idEstab='+model.cid+' class="btn btn-primary btn-xs" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append('<td><p><button id="btn-delete"  idEstab='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$("#delete").modal("hide");
      this.$el.html(this.template);
      return this;
    }
  });
  return listEstabView;
});