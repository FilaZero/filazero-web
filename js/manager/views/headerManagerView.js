define(['handlebars',
	'jquery','underscore',
	'backbone',
	'text!manager/templates/headerManager.html',
	'manager/views/queueView',
	'manager/views/registerClientView',
	'manager/views/listClientView',
	'manager/views/registerDoctorView',
	'manager/views/listDoctorView',
	'manager/views/registerAppointmentView',
	'manager/views/listAppointmentView',	
	'bootstrap',
	'cbpHorizontalSlide',
	'modernizr']
,function(Handlebars,$,_,Backbone,HeaderManagerTemplate,queueView,registerClientView,listClientView, registerDoctorView,listDoctorView, registerAppointmentView,listAppointmentView){
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
			'click #list-doctors': 'listDoctors',
			'click #register-appointments' : 'registerAppointments',
			'click #list-appointments': 'listAppointments'
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
		registerAppointments : function(event){
			new registerAppointmentView();
		},
		listAppointments: function(event) {
			new listAppointmentView();
		},		
		render: function (){
			this.$el.html(this.template);
			return this;
		}
	});
	return HeaderManagerView;
});