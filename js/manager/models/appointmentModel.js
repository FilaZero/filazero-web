define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';
	var Appointment = Backbone.Model.extend({
		defaults: {
			PK_Consulta:"",
			CPF:"",
			NomeCliente:"",
			CRM:"",
			NomeMedico: "",
			Data:"",
			Turno:""
		},
		
		initialize : function() {
			console.log("Created");
		}

	});
	return Appointment;
});