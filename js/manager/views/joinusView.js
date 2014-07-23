define(['handlebars','jquery','underscore','backbone','text!templates/joinus.html'],function(Handlebars,$,_,Backbone,JoinusTemplate){
	'use strict';
	var JoinusView = Backbone.View.extend({
		el:"#middle",
		template: Handlebars.compile(JoinusTemplate),
		initialize:function() {
			console.log('Initializing Joinsus View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({message : 'Você é empresário e quer saber mais como funciona o FilaZero?',
									confirmation : 'Junte-se a nós!',
									img: '../bower_components/filazero/assets/img/ipad-hand.png'
									}));
			return this;
		}
	});
	return JoinusView;
});