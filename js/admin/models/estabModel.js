define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';
	var Estab = Backbone.Model.extend({
		defaults: {
			CNES : "",
			Nome: "",
			Descricao:"",
			Numero:""
		},
		
		initialize : function() {
			console.log("Created");
		}

	});
	return Estab;
});