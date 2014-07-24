define(['handlebars',
		'jquery',
		'underscore',
		'backbone',
		'text!manager/templates/appManager.html',
		'manager/views/appManagerViews'
],function(Handlebars,$,_,Backbone,AppManagerTemplate,AppManagerViews) {
	'use strict';
	var AppManagerView = Backbone.View.extend({
		el: '#app-filazero',
		template: Handlebars.compile(AppManagerTemplate),
		initialize:function() { 
			this.render();
			new AppManagerViews();
		},
		render : function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return AppManagerView;
});