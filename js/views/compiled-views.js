define(['views/headerView','views/loginView','views/contactView','views/aboutusView','views/junteseView', 'views/footerView'],
	function (HeaderView,LoginView,ContactView,AboutusView,JunteseView, FooterView) {
	return {
		headerView :HeaderView,
		loginView :LoginView,
		contactView : ContactView,
		aboutusView : AboutusView,
		junteseView: JunteseView,
		footerView: FooterView

	}
});