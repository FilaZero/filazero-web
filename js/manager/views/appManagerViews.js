define(['backbone',
		'manager/views/headerManagerView',
		'manager/collections/clientCollection',
		'manager/collections/doctorCollection'
],function (Backbone,HeaderManagerView,ClientsCollection,DoctorsCollection) {
	var AppManagerViews = Backbone.View.extend({
        initialize: function() {
			ClientsCollection.fetch();
			DoctorsCollection.fetch();
			new HeaderManagerView();        	    
        }
    });
    return AppManagerViews;
});