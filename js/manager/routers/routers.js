define([
    'jquery',
    'backbone',
    'views/managerView'
], function ($, Backbone,Header) {
    var Routers = Backbone.Router.extend({
        routes: {
            'manager': 'manager'
        },
        manager : function(){
        	console.log("Manager");
        	new Header();	
        }
    });

    return Routers;
});