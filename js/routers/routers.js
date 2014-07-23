define([
    'jquery',
    'backbone',
    'manager/views/headerManagerView'
], function ($, Backbone,headerManagerView) {
    var Routers = Backbone.Router.extend({
        routes: {
            'manager': 'manager'
        },
        manager : function(){
        	console.log("NNETOOOOOOOOOOOOOOOOOO")	
        }
    });

    return Routers;
});