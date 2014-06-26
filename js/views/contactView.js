define(['jquery','underscore','backbone','views/compiled-templates'],function($,_,Backbone,CompiledTemplates){
	'use strict';
	var ContactView = Backbone.View.extend({
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