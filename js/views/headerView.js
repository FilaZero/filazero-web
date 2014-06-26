define(['jquery','underscore','backbone','views/compiled-templates'],function($,_,Backbone,CompileTemplates){
	'use strict';
	var HeaderView = Backbone.View.extend({
		el: '#header',
		template: CompileTemplates.HeaderTemplate,
		initialize:function() {
			console.log('Initializing Header View'); 
			this.render();
		},
		events: {
			"click .logar" : "login",
			"click .contato": "contato"
		}, 

		login: function (event) {
			event.preventDefault();
			$('#loginModal').modal('show');
		},

		contato: function (event) {
			event.preventDefault();
			$('#contactModal').modal('show');
		},

		render: function (){
			this.$el.html(this.template({title : 'FilaZero',
									logar : 'Entrar',
									about: 'Quem somos',
									join: 'Junte-se',
									contact: 'Contato',
									}));
			return this;
		}
	});
	return HeaderView;
});