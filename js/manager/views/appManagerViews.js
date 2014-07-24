define(['backbone',
		'manager/views/headerManagerView'
],function (Backbone,HeaderManagerView) {
	var AppManagerViews = Backbone.View.extend({
        initialize: function() {
			new HeaderManagerView();        	    
        }
    });
    return AppManagerViews;
});