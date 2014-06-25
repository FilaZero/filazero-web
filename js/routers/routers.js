define(['backbone','views/compiled-views','bootstrap'],function (Backbone,CompiledViews) {
	'use strict';
	var AppRouters = Backbone.Router.extend({
		routes: {
        	""                                  : "home",
        	"login"                             : "login",
        	"contato"							: "contact"
        },

		initialize: function () {
			console.log("initialezing routers");
		},
		home: function(){
			new CompiledViews.headerView();
		},
		login: function(){
			new CompiledViews.loginView();
			$('#loginModal').modal('show');
		},
		contact: function(){
			new CompiledViews.contactView();
			$('#contactModal').modal('show');	
		},

	});	
	return AppRouters;
});