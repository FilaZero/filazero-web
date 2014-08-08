define(['handlebars',
	'jquery','underscore',
	'backbone',
	'text!admin/templates/headerAdmin.html',
	'admin/views/registerEstabView',
	'admin/views/listEstabView',
	'bootstrap',
	'cbpHorizontalSlide',
	'modernizr']
,function(Handlebars,$,_,Backbone,HeaderAdminTemplate,registerEstabView,listEstabView){
	'use strict';
	var HeaderAdminView = Backbone.View.extend({
		el:'#header',
		template: Handlebars.compile(HeaderAdminTemplate),
		initialize:function() {
			console.log('Initializing HeaderAdmin View'); 
			this.render();
		},
		events: {
			'click #register-estabs' : 'registerEstab',
			'click #add-estab' : 'addEstab',
			'click #list-estabs': 'listEstabs'
		},
		registerEstab : function(event){
			new registerEstabView();
		},
		listEstabs: function(event) {
			new listEstabView();
		},
		render: function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return HeaderAdminView;
});