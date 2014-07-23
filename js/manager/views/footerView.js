define(['handlebars','jquery','underscore','backbone','text!templates/footer.html'],function(Handlebars,$,_,Backbone,FooterTemplate) {
	'use strict';
	var FooterView = Backbone.View.extend({
		el: '#footer',
		template: Handlebars.compile(FooterTemplate),
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