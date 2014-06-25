'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery-2.1.1',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		text: '../bower_components/requirejs-text/text',
		bootstrap: '../bower_components/bootstrap/js/bootstrap',
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
		
		'bootstrap':['jquery']
	}
});

require([
	'backbone',
	'views/headerView',
	'routers/routers'
], function (Backbone, headerView,Routers) {
	var app = new Routers();
	Backbone.history.start({root: ""});

});