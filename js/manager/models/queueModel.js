define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';
	var Queue = Backbone.Model.extend({
		defaults: {
			PK_Fila:"",
			PK_Consulta:"",
			Data:"",
			NomeMedico:"",
			NomeCliente:"",
			QuantidadeAntes:"",
			TempoEstimado:""
		},
		
		initialize : function() {
			console.log("Created");
		}

	});
	return Queue;
});