define(['handlebars',
		'jquery',
		'underscore',
		'backbone',
		'text!admin/templates/appAdmin.html',
		'admin/views/appAdminViews'
],function(Handlebars,$,_,Backbone,AppAdminTemplate,AppAdminViews) {
	'use strict';
	var AppAdminView = Backbone.View.extend({
		el: '#app-filazero',
		template: Handlebars.compile(AppAdminTemplate),
		initialize:function() { 
			this.render();
			new AppAdminViews();
		},
		render : function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return AppAdminView;
});