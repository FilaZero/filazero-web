define(['jquery','underscore','backbone','views/compiled-templates'],function ($,_,Backbone,CompiledTemplates) {
	'use strict';
	var FooterView = Backbone.View.extend({
		el: '#footer',
		template: CompiledTemplates.FooterTemplate,
		initialize:function() {
			console.log('Initializing Footer View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({
									text: '© Copyright 2014 - FilaZero'
									}));
			return this;
		}
	});
	return FooterView;
});