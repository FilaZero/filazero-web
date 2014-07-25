define(['handlebars','jquery','underscore','backbone','text!manager/templates/listClient.html','manager/collections/clientCollection','bootstrap'],function(Handlebars,$,_,Backbone,listClientTemplate,ClientsCollection){
  'use strict';
  var listClientView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listClientTemplate),
    initialize:function() {
      ClientsCollection.fetch();
      console.log('Initializing ListClient View'); 
      this.render();

      //Dom
      this.$tbody = this.$('#mytable #tbody');
      this.setClients(this.$tbody);
    },
    setClients:function($tbody){
        ClientsCollection.each(function(model) {
          $tbody.append('<tr>')
          $tbody.append('<td>'+model.get("CPF")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Sexo")+ '</td>');
          $tbody.append('<td>'+model.get("Email")+ '</td>');
          $tbody.append('<td>'+model.get("Telefone")+ '</td>');
          $tbody.append('<td><p><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append(' <td><p><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
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