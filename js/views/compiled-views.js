define(['views/headerView','views/loginView','views/contactView','views/homeView','views/aboutusView','views/joinusView', 'views/footerView'],
	function (HeaderView,LoginView,ContactView,HomeView,AboutusView,JoinusView, FooterView) {
	return {
		headerView :HeaderView,
		loginView :LoginView,
		contactView : ContactView,
		homeView: HomeView,
		aboutusView : AboutusView,
		joinusView: JoinusView,
		footerView: FooterView

	}
});