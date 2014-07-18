define(['backbone',
		'views/headerView',
		'views/homeView',
		'views/aboutusView',
		'views/joinusView',
		'views/footerView'
],function (Backbone,HeaderView,HomeView,AboutusView,JoinusView,FooterView) {
	var AppView = Backbone.View.extend({
        
        initialize: function() {
			new HeaderView();
			new HomeView();
			new AboutusView();
			new JoinusView();
			new FooterView();        	    
        }

    });
    return AppView;
});