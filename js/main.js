'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery-2.1.1',
		jqueryValidate:  '../bower_components/jquery/validator/jquery.validate',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		text: '../bower_components/requirejs-text/text',
		bootstrap: '../bower_components/bootstrap/js/bootstrap',
		handlebars : '../bower_components/handlebars/handlebars-v1.3.0',
		cbpHorizontalSlide: '/bower_components/manager/js/cbpHorizontalSlideOutMenu.min',
		modernizr : '/bower_components/manager/js/modernizr.custom'
	},
	shim : {
		underscore: {
            exports: '_'
        },
        handlebars:{
        	exports: 'Handlebars'
        },
		backbone: {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		bootstrap:['jquery'],
		jqueryValidate:['jquery']
	}
});

require([
	'backbone',
	'routers/routers',
	'views/app'
], function (Backbone,Routers,App) {
	new App();
	new Routers();
	Backbone.history.start();
	
});