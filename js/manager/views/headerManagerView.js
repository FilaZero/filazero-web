define(['handlebars','jquery','underscore','backbone','text!manager/templates/headerManager.html','jqueryValidate','bootstrap'],function(Handlebars,$,_,Backbone,HeaderManagerTemplate,jqueryValidate){
	'use strict';
	var HeaderManagerView = Backbone.View.extend({
		el: '#header',
		template: Handlebars.compile(HeaderManagerTemplate),
		initialize:function() {
			console.log('Initializing HeaderManager View'); 
			
			
			this.render();
		},

		render: function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return HeaderManagerView;
});