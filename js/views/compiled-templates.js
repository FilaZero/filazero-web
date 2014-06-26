define(['handlebars','text!templates/header.html','text!templates/login.html','text!templates/contact.html','text!templates/home.html','text!templates/aboutus.html','text!templates/joinus.html','text!templates/footer.html'],
 function (Handlebars,HeaderTemplateFile,LoginTemplateFile,ContactTemplateFile,HomeTemplateFile,AboutusTemplateFile,JoinusTemplateFile,FooterTemplateFile) {
	return {
    HeaderTemplate: Handlebars.compile(HeaderTemplateFile),
    LoginTemplate: Handlebars.compile(LoginTemplateFile),
    ContactTemplate: Handlebars.compile(ContactTemplateFile),
    HomeTemplate: Handlebars.compile(HomeTemplateFile),
    AboutusTemplate: Handlebars.compile(AboutusTemplateFile),
    FooterTemplate: Handlebars.compile(FooterTemplateFile),
    JoinusTemplate: Handlebars.compile(JoinusTemplateFile)

  }

});