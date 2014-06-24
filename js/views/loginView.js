define(['jquery','underscore','backbone','handlebars','views/compiled-templates'],function($,_,Backbone,Handlebars,CompiledTemplates){
	'use strict';
	var LoginView = Backbone.View.extend({
		el: '#header',
		template: CompiledTemplates.LoginTemplate,
		initialize:function() {
			console.log('Initializing Login View'); 
			this.render();
		},
		render : function (){
			this.$el.html(template({message : 'Para acessar sua conta, entre com os dados do seu cadastro.',
									button_submit : 'Enviar',
									button_password_forget: 'Esqueci minha senha'
									}));
			return this;
		}
	});
	return LoginView;
});