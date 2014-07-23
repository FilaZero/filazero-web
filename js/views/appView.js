define(['handlebars',
		'jquery',
		'underscore',
		'backbone',
		'text!templates/app.html',
		'views/app-filazero'
],function(Handlebars,$,_,Backbone,AppTemplate,AppViews) {
	'use strict';
	var AppView = Backbone.View.extend({
		el: '#app-filazero',
		template: Handlebars.compile(AppTemplate),
		initialize:function() {
			console.log('Initializing App View'); 
			new AppViews();
			this.render();
			
		},
		render : function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return AppView;
});