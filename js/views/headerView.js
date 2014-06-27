define(['jquery','underscore','backbone','views/compiled-templates','jqueryValidate'],function($,_,Backbone,CompileTemplates,jqueryValidate){
	'use strict';
	var HeaderView = Backbone.View.extend({
		el: '#header',
		template: CompileTemplates.HeaderTemplate,
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
			$('#loginModal').modal('show');
			
		},

		authentic: function(event) {
			event.preventDefault();
			if(!$('#loginForm').valid())return;
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