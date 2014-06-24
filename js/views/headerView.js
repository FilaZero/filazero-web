define(['jquery','underscore','backbone','handlebars','views/compiled-templates'],function($,_,Backbone,Handlebars,CompileTemplates){
	'use strict';
	var HeaderView = Backbone.View.extend({
		el : '#header',
		template: CompileTemplates.HeaderTemplate,
		initialize:function() {
			console.log('Initializing Header View'); 
			this.render();
		},
		render: function (){
			this.$el.html(this.template({title : 'FilaZero',
									logar : 'Entrar',
									about: 'Quem somos',
									contact: 'Contato'
									}));
			return this;
		}
	});
	return HeaderView;
});