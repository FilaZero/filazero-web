define(['handlebars',
	'jquery','underscore',
	'backbone',
	'text!manager/templates/headerManager.html',
	'manager/views/registerClientView',
	'manager/views/listClientView',
	'bootstrap',
	'cbpHorizontalSlide',
	'modernizr']
,function(Handlebars,$,_,Backbone,HeaderManagerTemplate,registerClientView,listClientView){
	'use strict';
	var HeaderManagerView = Backbone.View.extend({
		el:'#header',
		template: Handlebars.compile(HeaderManagerTemplate),
		initialize:function() {
			console.log('Initializing HeaderManager View'); 
			this.render();
		},
		events: {
			'click #register-clients' : 'registerClient',
			'click #add-client' : 'addClient',
			'click #list-clients': 'listClients' 
		},
		registerClient : function(event){
			new registerClientView();
		},
		listClients: function(event) {
			new listClientView();
		},
		render: function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return HeaderManagerView;
});