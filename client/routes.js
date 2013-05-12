Meteor.Router.add({
    '/admin': function() {
    	if (Meteor.user() && Meteor.user().profile
    		&& Meteor.user().profile.role == "teacher" ) {
    		return 'admin'
    	} 

    	return 'main'
    },
    '/privacy': 'privacy',
    '/quiz': 'quiz',
    '/404': 'notfound',
    '*': 'home', 
});