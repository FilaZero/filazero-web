define(['handlebars','jquery','underscore','backbone','text!manager/templates/listDoctor.html','manager/collections/doctorCollection','bootstrap'],function(Handlebars,$,_,Backbone,listDoctorTemplate,DoctorsCollection){
  'use strict';
  var listDoctorView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(listDoctorTemplate),
    initialize:function() {
      this.render();
      console.log('Initializing ListDoctor View');      
      
      //DOM
      this.$CRM = this.$("#CRM");
      this.$Nome = this.$("#Nome");
      this.$Descricao = this.$("#Descricao");
      this.$Especialidade = this.$("#Especialidade");
      this.$tbody = this.$('#mytable #tbody');
      this.setDoctors(this.$tbody);
    },
    events: {
      'click #btn-delete-doctor': 'modalDelete',
      'click #btn-confirm-doctor': 'deleteConfirm',
      'click #btn-edit': 'edit',
      'click #btn-update': 'updateConfirm',
    },
    edit:function(e){
      this.$("#edit-doctor").modal();
      var model = DoctorsCollection.get(e.currentTarget.attributes[2].value);
      console.log(model.get("CRM"));
      this.$CRM.val(model.get("CRM"));
      this.$Nome.val(model.get("Nome"));
      this.$Descricao.val(model.get("Descricao"));
      this.$Especialidade.val(model.get("Especialidade"));
      this.$('#btn-update').attr('crmMedico',e.currentTarget.attributes[2].value);
    },
    updateConfirm:function(e){
      var modelUpdate = DoctorsCollection.get(e.currentTarget.attributes[4].value);
      modelUpdate.set({id: this.$CRM.val(),CRM: this.$CRM.val(), Nome: this.$Nome.val(), Descricao: this.$Descricao.val(), Especialidade: this.$Especialidade.val()});
      modelUpdate.save({},{url:'manager/medico/'+ modelUpdate.get('id')});
      this.$("#edit-doctor").modal("hide");
    },
    modalDelete:function(e){
      this.$("#deleteDoctor").modal();
      this.$("#btn-confirm-doctor").attr('doctorId',e.currentTarget.attributes[2].value); 
    },
    deleteConfirm:function(e) {
      var idForDelete =  this.$("#btn-confirm-doctor").attr('doctorId');
      var modelDelete = DoctorsCollection.get(idForDelete);
      modelDelete.set({id: modelDelete.get("CRM")});
      modelDelete.destroy();
      this.$("#deleteDoctor").modal("hide");
    },
    setDoctors:function($tbody){
        DoctorsCollection.each(function(model) {
          $tbody.append('<tr>')
          $tbody.append('<td>'+model.get("CRM")+ '</td>');
          $tbody.append('<td>'+model.get("Nome")+ '</td>');
          $tbody.append('<td>'+model.get("Especialidade")+ '</td>');
          $tbody.append('<td>'+model.get("Descricao")+ '</td>');
          $tbody.append('<td><p><button id ="btn-edit"  class="btn btn-primary btn-xs" idDoctor='+model.cid+' data-title="Edit" data-toggle="modal" data-target="#edit" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
          $tbody.append(' <td><p><button id = "btn-delete-doctor" class="btn btn-danger btn-xs" idDoctor='+model.cid+' data-title="Delete" data-toggle="modal" data-target="#delete" data-placement="top" rel="tooltip"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $tbody.append('</tr>');
        });  
    },
   
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return listDoctorView;
});