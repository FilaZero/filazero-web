define(['jquery','underscore','backbone','handlebars','views/compiled-templates'],function($,_,Backbone,Handlebars,CompiledTemplates){
	'use strict';
	var ContactView = Backbone.View.extend({
		el: '#header',
		template: CompiledTemplates.ContactTemplate,
		initialize:function() {
			console.log('Initializing Contact View'); 
			this.render();
		},
		render : function (){
			this.$el.html(template({title : 'Contato',
									button_submit : 'Enviar',
									button_cancel: 'Cancelar'
									}));
			return this;
		}
	});
	return ContactView;
});