define(['backbone','views/compiled-views','bootstrap'],function (Backbone,CompiledViews) {
	'use strict';
	var AppRouters = Backbone.Router.extend({
		routes: {
        	""                                  : "home",
        	"login"								: "login",
        	"contato"							: "contact"
        },

		initialize: function () {
			console.log("initialezing routers");
			new CompiledViews.headerView();
			$('#header').append(new CompiledViews.loginView().$el.html());
			$('#header').append(new CompiledViews.contactView().$el.html());
			new CompiledViews.aboutusView();
			new CompiledViews.junteseView();
		},
		login: function(){
			console.log("initialezing login");
			$('#loginModal').modal('show');
		},
		contact: function(){
			$('#contactModal').modal('show');	
		}

	});	
	return AppRouters;
});