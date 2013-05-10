Meteor.Router.add({
    '/admin': function() {
    	if (Meteor.user() && Meteor.user().profile
    		&& Meteor.user().profile.role == "teacher" ) {
    		return 'admin'
    	} 

    	return 'main'
    },
    '/profile': 'profile',
    '/quiz': 'quiz',
    '/404': 'notfound',
    '*': 'home', 
});