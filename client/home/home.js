Template.home.events({
	'click div#interview': function(evt) {
		Meteor.Router.to('/interview')
	},
	
	'click div#tutor': function(evt) {
		Meteor.Router.to('/tutor')
	},

	'click a.demo-btn': function(evt) {

		var randomDocName = function(length) {
			var chars, x;
			if (length == null) {
		   		length = 10;
			}
		  	
		  	chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=';
		  	var name = [];
		  	for (x = 0; x < length; x++) {
		   		name.push(chars[Math.floor(Math.random() * chars.length)]);
		  	}
		  
		  return name.join('');
		};

		window.location = '/demo/' + randomDocName();
	},

});