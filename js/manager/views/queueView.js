define(['handlebars','jquery','underscore','backbone','text!manager/templates/queue.html','manager/collections/queueCollection','bootstrap'],function(Handlebars,$,_,Backbone,queueTemplate,QueuesCollection){
  'use strict';
  var queueView = Backbone.View.extend({
    el:'#content',
    template: Handlebars.compile(queueTemplate),
    initialize:function() {
      this.render();
      console.log('Initializing Queue View');      
      
      //DOM
      this.$PK_Fila = this.$("#PK_Fila");
      this.$PK_Consulta = this.$("#PK_Consulta");
      this.$Data = this.$("#Data");
      this.$NomeMedico = this.$("#NomeMedico");
      this.$NomeCliente = this.$("#NomeCliente");
      this.$QuantidadeAntes = this.$("#QuantidadeAntes");
      this.$TempoEstimado = this.$("#TempoEstimado");
      this.$tbody = this.$('#queue');
      this.setQueues(this.$tbody);
    },
    events: {
      'click #btn-ok-patient': 'updateOk',
      'click #btn-reload-patient': 'updateReload',
      'click #btn-remove-patient': 'updateRemove',
    },
    updateOk:function(e){
      var modelUpdate = QueuesCollection.get(e.currentTarget.attributes[2].value);
      modelUpdate.set({id: modelUpdate.get("PK_Fila"), Status:"Concluido"});
      modelUpdate.save({},{url:'manager/fila/'});

    },
    updateReload:function(e){
      var modelUpdate = QueuesCollection.get(e.currentTarget.attributes[2].value);
      console.log(modelUpdate.get("PK_Fila"));
      modelUpdate.set({id: modelUpdate.get("PK_Fila"), Status:"FimFila"});
      console.log(modelUpdate);
      modelUpdate.save({},{url:'manager/fila/'});

    },
    updateRemove:function(e){
      var modelUpdate = QueuesCollection.get(e.currentTarget.attributes[2].value);
      console.log(modelUpdate.get("PK_Fila"));
      modelUpdate.set({id: modelUpdate.get("PK_Fila"), Status:"Cancelado"});
      console.log(modelUpdate);
      modelUpdate.save({},{url:'manager/fila/'});

    },    
    setQueues:function($tbody){
        QueuesCollection.each(function(model) {
          $tbody.append('<li class="list-group-item"><div class="row"><div class="col-xs-2 col-md-1"><button class="btn btn-default btn-circle btn-lg">'+model.get("QuantidadeAntes")+'</button></div><div class="col-xs-10 col-md-11"><div>'+model.get("NomeCliente")+'<div class="mic-info">Consulta marcada em '+model.get("Data")+'</div></div><div class="comment-text">Tempo estimado: '+model.get("TempoEstimado")+'</div> <div class="action"> <button id="btn-ok-patient" type="button" idQueue='+model.cid+' class="btn btn-success btn-xs" title="Atendido - Liberar"> <span class="glyphicon glyphicon-ok"> </span></button> <button id="btn-reload-patient" type="button" idQueue='+model.cid+' class="btn btn-primary btn-xs" title="Ausente - Ir para o final da fila"> <span class="glyphicon glyphicon-refresh"></span></button> <button id="btn-remove-patient" type="button" idQueue='+model.cid+' class="btn btn-danger btn-xs" title="Indisponível - Remover da fila"> <span class="glyphicon glyphicon-trash"></span></button> </div> </div> </div> </li> </ul><br>');
        });  
    },
   
    render: function (){
      this.$el.html(this.template);
      return this;
    }
  });
  return queueView;
});