define(['backbone','views/compiled-views'],function (Backbone,CompiledViews) {
	'use strict';
	var AppRouters = Backbone.Router.extend({
		routes: {
        ""                                  : "home",
        "login"                             : "login",
        "contact"							: "contact"
        },

		initialize: function () {
			console.log("initialezing routers");
		},

		login: function(){
			console.log("initialezing login");
			new CompiledViews.loginView();
		},
		contact: function(){
			console.log("initialezing contact");
			new CompiledViews.contactView();	
		},

	});	
	return AppRouters;
});