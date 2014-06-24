define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';

	var Client = Backbone.Model.extend({
		defaults: {
			permissao : "Negada"
		}
		initialize : function() {
			console.log("Created");
		}

	});
});