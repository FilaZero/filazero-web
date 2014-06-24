'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery-2.1.1',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		bootstrap : '../bower_components/bootstrap/js/bootstrap',
		text: '../bower_components/requirejs-text/text',
		handlebars : '../bower_components/handlebars/handlebars-v1.3.0'
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
		bootstrap: ['jquery']
	}
});

require([
	'backbone',
	'views/headerView',
	'routers/routers'
], function (Backbone, headerView,Routers) {
	new Routers();
	Backbone.history.start();
	new headerView();
});