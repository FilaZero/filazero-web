define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';
	var Doctor = Backbone.Model.extend({
		defaults: {
			CRM : "",
			Nome: "",
			Descricao:"",
			Especialidade: ""
		},
		
		initialize : function() {
			console.log("Created");
		}

	});
	return Doctor;
});