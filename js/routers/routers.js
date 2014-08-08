define([
    'jquery',
    'backbone',
    'manager/views/appManager',
    'admin/views/appAdmin'
], function ($, Backbone,appManager,appAdmin) {
    var Routers = Backbone.Router.extend({
        routes: {
            'manager': 'manager',
            'manager/logout': 'logout',
            'admin': 'admin',
            'admin/logout': 'logout'
        },
        initialize: function() {
            console.log("routers criadas")
        },
        manager : function(){
            new appManager();	
        },
        admin : function(){
            new appAdmin();	
        },
        logout: function() {
            console.log("VINIIIIIIIII")
        }
    });

    return Routers;
});