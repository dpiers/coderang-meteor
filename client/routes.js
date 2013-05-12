Meteor.Router.add({
    '/admin': function() {
    	if (Meteor.user() && Meteor.user().profile
    		&& Meteor.user().profile.role == "teacher" ) {
    		return 'admin'
    	} 

    	return 'main'
    },
    '/privacy': 'privacy',
    '/interview': 'interview',
    '/404': 'notfound',
    '/terms': 'terms',
    '/tutor': 'tutor',
    '*': 'home', 
});