define(['handlebars','jquery','underscore','backbone','text!templates/home.html'],function(Handlebars,$,_,Backbone,HomeTemplate){
	'use strict';
	var HomeView = Backbone.View.extend({
		el:"#top",
		template: Handlebars.compile(HomeTemplate),
		initialize:function() {
			console.log('Initializing Home Manager View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({
										title_main:'Aplicativo FilaZero',
										subtitle_main: 'Quais são os benefícios?',
										describe_main: 'Saiba quais são os benefícios de usar o aplicativo FilaZero e o que você empresário oferecerar para seus clientes.',
										img_one: "../bower_components/filazero/assets/img/ser01.png",
										title_one: '1 - Economize Tempo',
										describe_one:'Com FilaZero você economiza tempo. Não espere mais em filas de consultórios. Acompanhe em tempo real o tempo que falta para seu atendimento.',
										img_two:  "../bower_components/filazero/assets/img/ser02.png",
										title_two: '2 - Acompanhe a Fila',
										describe_two:'Acompanhe sua posição na fila, após marcar uma consulta e saiba em tempo real o andamento dessa fila. Acompanhe pelo seu smartphone.',
										img_three: "../bower_components/filazero/assets/img/ser03.svg",
										title_three:'3 - Marcar Consutas',
										describe_three: 'Marque suas consultas pelo smartphone. Você não precisa mais ter que ir até o estabelecimento ou pode marcar por telefone.'   	
			}));
			return this;
		}
	});
	return HomeView;
});