define(['underscore','backbone'],function ( _ ,Backbone){
	'use strict';

	var Costumer = Backbone.Model.extend({
		url:'/clientes',
		defaults: {
			cpf : "",
			login:"",
			senha:"",
			nome: "",
			email:"",
			telefone:"(00)0000-0000",
			sexo:"",
			rua:"",
			bairro:"",
			cidade:"",
			estado:"",
			numero:"",
			permissao: "Negada"
		}
		initialize : function() {
			console.log("Created");
		}

	});
	return Costumer;
});