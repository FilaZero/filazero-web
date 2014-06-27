define(['handlebars','text!templates/header.html','text!templates/home.html','text!templates/aboutus.html','text!templates/joinus.html','text!templates/footer.html'],
 function (Handlebars,HeaderTemplateFile,HomeTemplateFile,AboutusTemplateFile,JoinusTemplateFile,FooterTemplateFile) {
	return {
    HeaderTemplate: Handlebars.compile(HeaderTemplateFile),
    HomeTemplate: Handlebars.compile(HomeTemplateFile),
    AboutusTemplate: Handlebars.compile(AboutusTemplateFile),
    FooterTemplate: Handlebars.compile(FooterTemplateFile),
    JoinusTemplate: Handlebars.compile(JoinusTemplateFile)

  }

});