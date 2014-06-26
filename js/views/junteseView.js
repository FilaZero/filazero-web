define(['jquery','underscore','backbone','views/compiled-templates'],function($,_,Backbone,CompiledTemplates){
	'use strict';
	var JunteseView = Backbone.View.extend({
		el:"#middle",
		template: CompiledTemplates.JunteseTemplate,
		initialize:function() {
			console.log('Initializing Junte-se View'); 
			this.render();
		},
		render : function (){
			this.$el.html(this.template({message : 'Você é empresário e quer saber mais como funciona o FilaZero?',
									confirmation : 'Junte-se a nós!',
									img: '../bower_components/filazero/assets/ipad-hand.png'
									}));
			return this;
		}
	});
	return JunteseView;
});