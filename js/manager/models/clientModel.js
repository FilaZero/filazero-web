define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';
	var Client = Backbone.Model.extend({
		defaults: {
			CPF : "",
			Nome: "",
			Sexo:"",
			Email:"",
			Telefone:"(00)0000-0000"
		},
		
		initialize : function() {
			console.log("Created");
		}

	});
	return Client;
});