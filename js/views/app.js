define(['handlebars',
		'jquery',
		'underscore',
		'backbone',
		'collections/clientCollection',
		'text!templates/app.html',
		'views/appViews'
],function(Handlebars,$,_,Backbone,Clients,AppTemplate,AppViews) {
	'use strict';
	var AppView = Backbone.View.extend({
		el: '#app-filazero',
		template: Handlebars.compile(AppTemplate),
		initialize:function() { 
			var clientes = Clients.fetch();
			console.log(clientes);
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