define(['jquery','underscore','backbone','views/compiled-templates'],function($,_,Backbone,CompiledTemplates){
	'use strict';
	var JoinusView = Backbone.View.extend({
		el:"#middle",
		template: CompiledTemplates.JoinusTemplate,
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