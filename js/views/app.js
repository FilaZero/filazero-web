define(['handlebars',
		'jquery',
		'underscore',
		'backbone',
		'text!templates/app.html',
		'views/appViews'
],function(Handlebars,$,_,Backbone,AppTemplate,AppViews) {
	'use strict';
	var AppView = Backbone.View.extend({
		el: '#app-filazero',
		template: Handlebars.compile(AppTemplate),
		initialize:function() {
			console.log('Initializing Footer View'); 
			this.render();
			new AppViews();
		},
		render : function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return AppView;
});