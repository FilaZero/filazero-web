define(['backbone',
		'admin/views/headerAdminView',
		'admin/collections/estabCollection'
],function (Backbone,HeaderAdminView,EstabelishCollection) {
	var AppAdminViews = Backbone.View.extend({
        initialize: function() {
        	EstabelishCollection.fetch();
			new HeaderAdminView();        	    
        }
    });
    return AppAdminViews;
});