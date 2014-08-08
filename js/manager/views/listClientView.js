define(['handlebars','jquery','underscore','backbone','text!manager/templates/listClient.html','manager/collections/clientCollection','bootstrap'],function(Handlebars,$,_,Backbone,listClientTemplate,ClientsCollection){
  'use strict';
  var listClientView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listClientTemplate),

    initialize:function() {
      this.render();
      console.log('Initializing ListClient View');

      //Dom
      this.$tbody = this.$('#mytable #tbody');
      this.setClients(this.$tbody);
    },
    events: {
      'click #btn-delete': 'modalDelete',
      'click #btn-confirm': 'deleteConfirm'
    },
    modalDelete:function(e){
      this.$("#delete").modal();
      this.$("#btn-confirm").attr('clientId',e.currentTarget.attributes[1].value); 
    },
    deleteConfirm:function(e) {
      e.preventDefault();
      var idForDelete =  this.$("#btn-confirm").attr('clientId');
      var modelDelete = ClientsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("CPF")});
      console.log(modelDelete.get("id"));
      modelDelete.destroy({
        success: function(model, response) {
          console.log("Sucess");
        },
        error: function(model, response) {
          console.log("Erro");
        }
      });
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
          $tbody.append('<td><p><button class="btn btn-primary btn-xs" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append('<td><p><button id="btn-delete"  idClient='+model.cid+' class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return listClientView;
});