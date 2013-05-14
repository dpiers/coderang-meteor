Template.home.events({
	'click div#interview': function(evt) {
		Meteor.Router.to('/interview')
	},
	
	'click div#tutor': function(evt) {
		Meteor.Router.to('/tutor')
	},

	'click a.demo-btn': function(evt) {
		Meteor.Router.to('/demo')
	},

});