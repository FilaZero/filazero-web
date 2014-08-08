define(['handlebars','jquery','underscore','backbone','text!admin/templates/listEstab.html','admin/collections/estabCollection','bootstrap'],function(Handlebars,$,_,Backbone,listEstabTemplate,EstabsCollection){
  'use strict';
  var listEstabView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listEstabTemplate),
    initialize:function() {
      EstabsCollection.fetch();
      console.log('Initializing ListEstab View'); 
      this.render();

      //Dom
      this.$tbody = this.$('#mytable #tbody');
      this.setEstabs(this.$tbody);
    },
    setEstabs:function($tbody){
        EstabsCollection.each(function(model) {
          $tbody.append('<tr>')
          $tbody.append('<td>'+model.get("CNES")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Descricao")+ '</td>');
          $tbody.append('<td>'+model.get("Numero")+ '</td>');
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
  return listEstabView;
});