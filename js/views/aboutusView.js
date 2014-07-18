define(['handlebars','jquery','underscore','backbone','text!templates/aboutus.html'], function(Handlebars,$,_,Backbone,AboutusTemplate) {
	'use strict';
	var AboutusView = Backbone.View.extend({
		el: '#content #below',
		template: Handlebars.compile(AboutusTemplate),
		initialize:function() {
			console.log('Initializing Aboutus View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({
									title: 'Time de Desenvolvimento',
									subtitle: 'FilaZero',
									developer_one: 'Franco Neto',
									describe_developer_one: 'Aluno da Universidade Federal da Paraíba, 23 anos.',
									email_developer_one: 'malito:franco.neto@dce.ufpb.br',
									facebook_developer_one: 'http://www.facebook.com/franco.neto.75',
									picture_one: '../bower_components/filazero/assets/img/franco.jpg',
									developer_two: 'Renan Soares',
									describe_developer_two: 'Aluno da Universidade Federal da Paraíba, 22 anos.',
									email_developer_two: 'malito:renan.soares@dce.ufpb.br',
									facebook_developer_two: 'http://www.facebook.com/renansoaresdeandrade',
									picture_two: '../bower_components/filazero/assets/img/renan.jpg',
									developer_three: 'Erickson Silva',
									describe_developer_three: 'Aluno da Universidade Federal da Paraíba, 22 anos.',
									email_developer_three: 'malito:erickson.oliveira@dce.ufpb.br',
									facebook_developer_three: 'http://www.facebook.com/ericksonsilva0',
									picture_three: '../bower_components/filazero/assets/img/erickson.jpg',
									developer_four: 'Franclis Galdino',
									describe_developer_four: 'Aluno da Universidade Federal da Paraíba, 21 anos.',
									email_developer_four: 'malito:franclis.silva@dce.ufpb.br',
									facebook_developer_four: 'http://www.facebook.com/junior.galdino.74',
									picture_four: '../bower_components/filazero/assets/img/franclis.jpg'
									}));
			return this;
		}
	});
	return AboutusView;
});