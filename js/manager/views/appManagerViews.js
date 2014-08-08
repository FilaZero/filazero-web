define(['backbone',
		'manager/views/headerManagerView',
		'manager/collections/clientCollection'
],function (Backbone,HeaderManagerView,ClientsCollection) {
	var AppManagerViews = Backbone.View.extend({
        initialize: function() {
			ClientsCollection.fetch();
			new HeaderManagerView();        	    
        }
    });
    return AppManagerViews;
});