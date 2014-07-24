define([
    'jquery',
    'backbone',
    'manager/views/appManager'
], function ($, Backbone,appManager) {
    var Routers = Backbone.Router.extend({
        routes: {
            'manager': 'manager',
            'manager/logout': 'logout'
        },
        initialize: function() {
            console.log("routers criadas")
        },
        manager : function(){
            new appManager();	
        },
        logout: function() {
            console.log("VINIIIIIIIII")
        }
    });

    return Routers;
});