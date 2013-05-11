if (Meteor.isClient) {
  Template.home.greeting = function () {
    return "Welcome to coderang.";
  };

  Template.home.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
     Meteor._def_template("_loginButtonsLoggedInDropdown",Handlebars.json_ast_to_func(["<div class=\"nav pull-right\">\n    <ul class=\"nav pull-right\">\n      <li id=\"login-dropdown-list\" class=\"dropdown\">\n        <a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">",["{",[[0,"displayName"]]],"<strong class=\"caret\"></strong></a>\n        <div class=\"dropdown-menu\">   \n          ",["#",[[0,"if"],[0,"inMessageOnlyFlow"]],["\n            ",[">","_loginButtonsMessages"],"\n          "],["\n            ",["#",[[0,"if"],[0,"inChangePasswordFlow"]],["\n              ",[">","_loginButtonsChangePassword"],"\n            "],["\n              ",[">","_loginButtonsLoggedInDropdownActions"],"\n            "]],"\n          "]],"\n        </div>\n      </li>\n    </ul>\n  </div>"]));
     Meteor._def_template("_loginButtonsLoggedOutDropdown",Handlebars.json_ast_to_func(["<div class=\"nav pull-right\">\n    <ul class=\"nav pull-right\">\n      <li id=\"login-dropdown-list\" class=\"dropdown\">\n        <a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">Sign In / Up <strong class=\"caret\"></strong></a>\n        <div class=\"dropdown-menu\">   \n          ",[">","_loginButtonsLoggedOutAllServices"],"\n        </div>\n      </li>\n    </ul>\n  </div>"]));

  });
}
