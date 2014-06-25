define(['jquery','underscore','backbone','handlebars','views/compiled-templates'],function($,_,Backbone,Handlebars,CompiledTemplates){
	'use strict';
	var ContactView = Backbone.View.extend({
		el: '#content',
		template: CompiledTemplates.ContactTemplate,
		initialize:function() {
			console.log('Initializing Contact View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({title: 'Contato',
									message : 'Deixe seus dados que entraremos em contato com você!',
									button_submit : 'Enviar',
									button_cancel: 'Cancelar'
									}));
			return this;
		}
	});
	return ContactView;
});