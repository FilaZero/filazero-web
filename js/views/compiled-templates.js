define(['handlebars','text!templates/header.html','text!templates/login.html','text!templates/contact.html','text!templates/aboutus.html','text!templates/footer.html','text!templates/junte-se.html'],
 function (Handlebars,HeaderTemplateFile,LoginTemplateFile,ContactTemplateFile,AboutusTemplateFile,FooterTemplateFile, JunteseTemplateFile) {
	return {
    HeaderTemplate: Handlebars.compile(HeaderTemplateFile),
    LoginTemplate: Handlebars.compile(LoginTemplateFile),
    ContactTemplate: Handlebars.compile(ContactTemplateFile),
    AboutusTemplate: Handlebars.compile(AboutusTemplateFile),
    FooterTemplate: Handlebars.compile(FooterTemplateFile),
    JunteseTemplate: Handlebars.compile(JunteseTemplateFile)

  }

});