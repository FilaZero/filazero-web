define(['jquery','underscore','backbone','views/compiled-templates'],function ($,_,Backbone,CompiledTemplates) {
	'use strict';
	var AboutusView = Backbone.View.extend({
		el: '#content #below',
		template: CompiledTemplates.AboutusTemplate,
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
									picture_one: '../bower_components/filazero/assets/franco.jpg',
									developer_two: 'Renan Soares',
									describe_developer_two: 'Aluno da Universidade Federal da Paraíba, 22 anos.',
									picture_two: '../bower_components/filazero/assets/renan.jpg',
									developer_three: 'Erickson Silva',
									describe_developer_three: 'Aluno da Universidade Federal da Paraíba, 22 anos.',
									picture_three: '../bower_components/filazero/assets/erickson.jpg',
									developer_for: 'Franclis Galdino',
									describe_developer_for: 'Aluno da Universidade Federal da Paraíba, 21 anos.',
									picture_for: '../bower_components/filazero/assets/franclis.jpg'
									}));
			return this;
		}
	});
	return AboutusView;
});