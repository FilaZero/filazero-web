define(['handlebars',
	'jquery','underscore',
	'backbone',
	'text!manager/templates/headerManager.html',
	'manager/views/registerClientView',
	'manager/views/listClientView',
	'manager/views/registerDoctorView',
	'manager/views/listDoctorView',
	'bootstrap',
	'cbpHorizontalSlide',
	'modernizr']
,function(Handlebars,$,_,Backbone,HeaderManagerTemplate,registerClientView,listClientView, registerDoctorView,listDoctorView){
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
			'click #list-clients': 'listClients',
			'click #register-doctors' : 'registerDoctor',
			'click #add-doctor' : 'addDoctor',
			'click #list-doctors': 'listDoctors'
		},
		registerClient : function(event){
			new registerClientView();
		},
		listClients: function(event) {
			new listClientView();
		},
		registerDoctor : function(event){
			new registerDoctorView();
		},
		listDoctors: function(event) {
			new listDoctorView();
		},
		render: function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return HeaderManagerView;
});