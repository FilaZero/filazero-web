define(['handlebars',
	'jquery','underscore',
	'backbone',
	'text!manager/templates/headerManager.html',
	'manager/views/queueView',
	'manager/views/registerClientView',
	'manager/views/listClientView',
	'manager/views/registerDoctorView',
	'manager/views/listDoctorView',
	'bootstrap',
	'cbpHorizontalSlide',
	'modernizr']
,function(Handlebars,$,_,Backbone,HeaderManagerTemplate,queueView,registerClientView,listClientView, registerDoctorView,listDoctorView){
	'use strict';
	var HeaderManagerView = Backbone.View.extend({
		el:'#header',
		template: Handlebars.compile(HeaderManagerTemplate),
		initialize:function() {
			console.log('Initializing HeaderManager View'); 
			this.render();
		},
		events: {
			'click #view-queue' : 'queue',			
			'click #register-clients' : 'registerClient',
			'click #add-client' : 'addClient',
			'click #list-clients': 'listClients',
			'click #register-doctors' : 'registerDoctor',
			'click #add-doctor' : 'addDoctor',
			'click #list-doctors': 'listDoctors'
		},
		queue : function(event){
			new queueView();
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