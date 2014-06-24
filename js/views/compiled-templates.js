define(['handlebars','text!templates/header.html','text!templates/login.html','text!templates/contact.html'], function (Handlebars,HeaderTemplateFile,LoginTemplateFile,ContactTemplateFile) {
	return {
    HeaderTemplate: Handlebars.compile(HeaderTemplateFile),
    LoginTemplate: Handlebars.compile(LoginTemplateFile),
    ContactTemplate: Handlebars.compile(ContactTemplateFile)
  }

});