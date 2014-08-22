define(['backbone',
		'manager/views/headerManagerView',
		'manager/collections/queueCollection',
		'manager/collections/clientCollection',
		'manager/collections/doctorCollection',
		'manager/collections/appointmentCollection'
],function (Backbone,HeaderManagerView,QueuesCollection,ClientsCollection,DoctorsCollection,AppointmentsCollection) {
	var AppManagerViews = Backbone.View.extend({
        initialize: function() {
 			QueuesCollection.fetch();
			ClientsCollection.fetch();
			DoctorsCollection.fetch();
			AppointmentsCollection.fetch();
			new HeaderManagerView();        	    
        }
    });
    return AppManagerViews;
});