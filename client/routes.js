Meteor.Router.add({
    '/admin': function() {
    	if (Meteor.user() && Meteor.user().profile
    		&& Meteor.user().profile.role == "teacher" ) {
    		return 'admin'
    	} 

    	return 'main'
    },
    '/404': 'notfound',
    '/privacy': 'privacy',
    '/interview': 'interview',
    '/terms': 'terms',
    '/tutor': 'tutor',
    '/demo/:docname': function(docname) {
        Session.set('docname', docname);
        return 'demo';
    },
    '*': 'home', 
});