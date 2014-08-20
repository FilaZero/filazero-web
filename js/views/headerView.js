define(['handlebars','jquery','underscore','backbone','text!templates/header.html','jqueryValidate','bootstrap'],function(Handlebars,$,_,Backbone,HeaderTemplate,jqueryValidate){
	'use strict';
	var HeaderView = Backbone.View.extend({
		el: '#header',
		template: Handlebars.compile(HeaderTemplate),
		initialize:function() {
			console.log('Initializing Header View'); 
			this.render();
			this.loginFormValidate();
		},
		events: {
			"click .logar" : "loginModal",
			"click .contato": "contato",
			"click #bnt-login": "authentic",
		}, 

		loginModal: function (event) {
			event.preventDefault();
			//Limpar campos
			$( "#loginForm" ).validate().resetForm();
			$('#login-username').val("");
			$('#login-password').val("");
			//Mostrar modal
			$('#loginModal').modal();
			
		},

		authentic: function(event) {
			event.preventDefault();
			console.log();
			if(!$('#loginForm').valid())return;
			$.ajax({
				url:"login/adm",
				type:"POST",
  				data: JSON.stringify({
					login:$('#login-username').val(),
					senha:$('#login-password').val()
 				}),
 				contentType:"application/json",
 				dataType:"json",
 				statusCode: {
    				200: function() {
    					window.location.replace("manager");
    				},
    				202: function(dado) {
    					window.location.replace("admin");
      					//console.log(dado);
    				},
    				403: function(dado){
    					alert("Login inválido. Tente novamente!");
    					//console.log(dado);
    				}	
  				}
    		});
		},
		loginFormValidate:function () {
			$('#loginForm').validate({
				rules:{
					username:{required: true, minlength: 4},
					password:{required: true,minlength: 4}
				},
				messages:{ 
					username:{required: "Digite seu login",minlength:"O login deve conter no minímo 4"},
					password:{required: "Digite sua senha",minlength:"A senha deve conter no minímo 4"}
				}
			});
		},
		contato: function (event) {
			event.preventDefault();
			$('#contactModal').modal('show');
		},

		render: function (){
			this.$el.html(this.template({title_app : 'FilaZero',
									logar : 'Entrar',
									home: 'Home',
									about: 'Quem somos',
									join: 'Junte-se',
									contact: 'Contato',
									title_login: 'Login',
									message_login : 'Para acessar sua conta, entre com os dados do seu cadastro.',
									button_submit_login : 'Entrar',
									button_password_forget: 'Esqueci minha senha',
									title_contact: 'Contato',
									message_contact : 'Deixe seus dados que entraremos em contato com você!',
									button_submit_contact : 'Enviar',
									button_cancel: 'Cancelar' 
									}));
			return this;
		}
	});
	return HeaderView;
});