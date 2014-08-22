define(['backbone',
		'manager/views/headerManagerView',
		'manager/collections/queueCollection',
		'manager/collections/clientCollection',
		'manager/collections/doctorCollection'
],function (Backbone,HeaderManagerView,QueuesCollection,ClientsCollection,DoctorsCollection) {
	var AppManagerViews = Backbone.View.extend({
        initialize: function() {
 			QueuesCollection.fetch();
			ClientsCollection.fetch();
			DoctorsCollection.fetch();
			new HeaderManagerView();        	    
        }
    });
    return AppManagerViews;
});