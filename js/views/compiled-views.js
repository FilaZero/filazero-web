define(['views/headerView','views/homeView','views/aboutusView','views/joinusView', 'views/footerView'],
	function (HeaderView,HomeView,AboutusView,JoinusView, FooterView) {
	return {
		headerView :HeaderView,
		homeView: HomeView,
		aboutusView : AboutusView,
		joinusView: JoinusView,
		footerView: FooterView

	}
});