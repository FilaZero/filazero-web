define([
    'jquery',
    'backbone',
    'manager/views/appManager',
    'admin/views/appAdmin',
    'views/app'
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
            
        }
    });

    return Routers;
});