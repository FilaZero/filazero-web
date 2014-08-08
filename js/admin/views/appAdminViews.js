define(['backbone',
		'admin/views/headerAdminView'
],function (Backbone,HeaderAdminView) {
	var AppAdminViews = Backbone.View.extend({
        initialize: function() {
			new HeaderAdminView();        	    
        }
    });
    return AppAdminViews;
});