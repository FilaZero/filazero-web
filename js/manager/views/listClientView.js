define(['handlebars','jquery','underscore','backbone','text!manager/templates/listClient.html','manager/collections/clientCollection','bootstrap'],function(Handlebars,$,_,Backbone,listClientTemplate,ClientsCollection){
  'use strict';
  var listClientView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listClientTemplate),

    initialize:function() {
      this.render();
      console.log('Initializing ListClient View');

      //Dom
       //DOM
      this.$CPF = this.$("#CPF");
      this.$Nome = this.$("#Nome");
      this.$Sexo = this.$("#Sexo");
      this.$Email = this.$("#Email");
      this.$Telefone = this.$("#Telefone");
      this.$tbody = this.$('#mytable #tbody');
      this.setClients(this.$tbody);
    },
    events: {
      'click #btn-delete': 'modalDelete',
      'click #btn-confirm': 'deleteConfirm',
      'click #btn-edit': 'editConfirm',
      'click #btn-update': 'updateConfirm',
    },
    editConfirm:function(e){
      this.$("#edit").modal();
      var model = ClientsCollection.get(e.currentTarget.attributes[1].value);
      this.$CPF.val(model.get("CPF"));
      this.$Nome.val(model.get("Nome"));
      this.$Sexo.val(model.get("Sexo"));
      this.$Email.val(model.get("Email"));
      this.$Telefone.val(model.get("Telefone"));
      this.$('#btn-update').attr('idCliente',e.currentTarget.attributes[1].value);
    },
    updateConfirm:function(e){
      var modelUpdate = ClientsCollection.get(e.currentTarget.attributes[4].value);
      console.log(modelUpdate);
      modelUpdate.set({id: this.$CPF.val(), CPF: this.$CPF.val(), Nome: this.$Nome.val(), Sexo: this.$Sexo.val(), Email: this.$Email.val(), Telefone: this.$Telefone.val()});
      modelUpdate.save({},{url:'manager/paciente/'+ modelUpdate.get('id')});
    },
    modalDelete:function(e){
      this.$("#delete").modal();
      this.$("#btn-confirm").attr('clientId',e.currentTarget.attributes[1].value); 
    },
    deleteConfirm:function(e) {
      console.log("entrou");
      var idForDelete =  this.$("#btn-confirm").attr('clientId');
      var modelDelete = ClientsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("CPF")});
      modelDelete.destroy();
      this.$("#delete").modal("hide");
    },
    setClients:function($tbody){
        ClientsCollection.each(function(model) {
          $tbody.append('<tr>');
          $tbody.append('<td>'+model.get("CPF")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Sexo")+ '</td>');
          $tbody.append('<td>'+model.get("Email")+ '</td>');
          $tbody.append('<td>'+model.get("Telefone")+ '</td>');
          $tbody.append('<td><p><button id="btn-edit" idClient='+model.cid+' class="btn btn-primary btn-xs" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append('<td><p><button id="btn-delete"  idClient='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$("#delete").modal("hide");
      this.$el.html(this.template);
      return this;
    }
  });
  return listClientView;
});