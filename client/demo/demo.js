Template.demo.afterLoad = function() {
	$(document).ready(function() {

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

		var docName = Session.get("docname");

		if (!docName) {
			docName = randomDocName();
		 	Session.set("docname", docName);
		}

		//// Initialize Firebase.
		var firepadRef = new Firebase('https://coderang.firebaseio.com/' + docName);
		var messagesRef = new Firebase('https://coderang.firebaseio.com/' + docName + '/messages');

		//// Create CodeMirror (with lineWrapping on).
		var codeMirror = CodeMirror(document.getElementById('firepad'), { 
		  lineWrapping: true,
		  lineNumbers: true,
		  mode: 'python',
		  theme: 'neat'
		});

		// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
		var userId = Math.floor(Math.random() * 9999999999).toString();

		//// Create Firepad (with rich text features and our desired userId).
		var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
		  {userId: userId});

		//// Create FirepadUserList (with our desired userId).
		var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
		    document.getElementById('userlist'), userId);



		var tb = new TBStart('28217822', 'videoChat');
		tb.startVideo();

		resultCallback = function(result) {
		  if (result) {
		    if (result[-1] !== '\n') {
		      result = result + '\n';
		    }
		    jqconsole.commandResult(result, 'answer');
		  }
		  else {
		    jqconsole.commandResult();
		  }

		  var prevPrompt = $('.jquery-console-prompt-box:nth-last-child(2)');
		  if ( prevPrompt ) {
		    if ( ! $('.jquery-console-prompt-box:nth-last-child(2) .jquery-console-prompt').text()) {
		      prevPrompt.remove();
		    }
		  }

		  return;
		}

		errorCallback = function(error) {
		  if (typeof error === 'object') {
		    error = error.message;
		  }
		  if (error[-1] !== '\n') {
		    error = error + '\n';
		  }
		  jqconsole.commandResult(String(error), 'error');
		  return;
		}
		
		outputCallback = function(output, cls) {
		  if (output) {
		    jqconsole.commandResult(output, 'answer');
		    JSREPL.$this.trigger('output', [output]);
		    return void 0;
		  }
		}
		
		inputCallback = function(callback) {
		  jqconsole.Input(function(result) {
		    try {
		      callback(result);
		      return JSREPL.$this.trigger('input', [result]);
		    } catch (e) {
		      return errorCallback(e);
		    }
		  });
		  return void 0;
		}

		progressCallback = function(percentage) {
		      return;
		}

		timeoutCallback = function() {
		  return;
		}

		window.jsrepl = new JSREPL({  
		    input: inputCallback,  
		    output: outputCallback,  
		    result: resultCallback,  
		    error: errorCallback,  
		    progress: progressCallback,  
		    timeout: {  
		      time: 30000,  
		      callback: timeoutCallback  
		    }
		});

		//// Initialize contents.
		firepad.on('ready', function() {
		  firepad.setText('Loading Python...');

		  jsrepl.loadLanguage('python', function(){
		    firepad.codeMirror_.setOption('mode','python');
		    firepad.setText('# Python editor!\n\nclass Person:\n    def __init__(self, name):\n        self.name = name\n\ndef say_hello(name):\n    print \"Hello %s!\" % name\n\nm = Person(\"World\")\n\nsay_hello(m.name)');
		  });
		});

		/* Initialize console */
		window.jqconsole = $('.console').console({
		 promptLabel: ' > ',
		 commandHandle:function(line){
		  jsrepl.eval(String(line));
		  return;
		 },
		 cols: 40,
		 completeHandle:function(prefix){
		 },
		 animateScroll:true,
		 promptHistory:true,
		})


		  $('#messageInput').keypress(function(e) {
		    if (e.keyCode == 13) {
		      var name = $('.firepad-userlist-name-input').val();
		      var text = $('#messageInput').val();
		      messagesRef.push({name: name, text: text});
		      $('#messageInput').val('');
		    }
		  });

		  // Add a callback that is triggered for each chat message.
		  messagesRef.limit(10).on('child_added', function (snapshot) {
		    var message = snapshot.val();
		    $('<div/>').text(message.text).prepend($('<em/>')
		      .text(message.name+': ')).appendTo($('.messages'));
		    $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight;
		  });

		  var ctlDiv = $('<div class="controls"></div>');
		  var select = $('<div id="select">Change Language</div>');
		  var run = $('<div id="run">Run...</div>');

		  ctlDiv.append(select);
		  ctlDiv.append(run);

		  $('.firepad').append(ctlDiv);

		  $('#select').click(function(e) {
		    $('#language-modal').modal();
		  });

		  $('#run').click(function(e) {
		    jqconsole.reset();
		    var input = firepad.codeMirror_.doc.getValue();
		    jsrepl.eval(input);
		  });

		  $('#python').click(function(e) {
		    firepad.setText('Loading Python...');
		    $.modal.close();

		    jsrepl.loadLanguage('python', function(){
		      firepad.codeMirror_.setOption('mode','python');
		      
		      firepad.setText('# Python editor!\n\nclass Person:\n    def __init__(self, name):\n        self.name = name\n\ndef say_hello(name):\n    print \"Hello %s!\" % name\n\nm = Person(\"Adrian\")\n\nsay_hello(m.name)');
		    });
		  });

		  $('#ruby').click(function(e) {
		    firepad.setText('Loading Ruby...');
		    $.modal.close();

		    jsrepl.loadLanguage('ruby', function(){
		      firepad.codeMirror_.setOption('mode','ruby');
		      
		      firepad.setText('# Ruby editor!\n\nclass Person\n    attr_accessor :name\n\n    def initialize(name)\n        self.name = name\n    end\nend\n\ndef say_hello(name)\n    \"Hello %s!\" % name\nend\n\nm = Person.new(\"Charles\")\n\nsay_hello(m.name)');
		    });
		    
		  });

		  $('#lua').click(function(e) {
		    firepad.setText('Loading Lua...');
		    $.modal.close();

		    jsrepl.loadLanguage('lua', function(){
		      firepad.codeMirror_.setOption('mode','lua');
		      firepad.setText('-- Lua editor!\n\nVector = {}\n\nfunction Vector:new(x, y, z)\n  local object = { x = x, y = y, z = z }\n  setmetatable(object, { __index = Vector })\n  return object\nend\n\nfunction Vector:magnitude()\n  return math.sqrt(self.x^2 + self.y^2 + self.z^2)\nend\n\nvec = Vector:new(0, 1, 0)\n\nprint(vec:magnitude())\nprint(vec.x)');
		    });
		  });

		  $('#scheme').click(function(e) {
		    /*
		    jsrepl.loadLanguage('scheme');
		    firepad.codeMirror_.setOption('mode','scheme');
		    
		    firepad.setText('; Scheme editor!\n\n(let ((hello0 (lambda() (display \"Hello world\")(newline))))\n  (hello0))');

		    $.modal.close();*/
		    alert('Coming soon!');
		  });

		  $('#javascript').click(function(e) {
		    /*
		    jsrepl.loadLanguage('javascript');
		    firepad.codeMirror_.setOption('mode','javascript');

		    firepad.setText('// JavaScript editor!\n\nvar message='Hello world!';');

		    $.modal.close();
		    */
		    alert('Coming soon!');

		  });

		  $('#coffeescript').click(function(e) {
		    /*
		    jsrepl.loadLanguage('coffeescript');
		    firepad.codeMirror_.setOption('mode','coffeescript');
		    
		    firepad.setText('// CoffeeScript editor!\n\n message = \"Hello world!\"');

		    $.modal.close();
		    */
		    alert('Coming soon!');

		  });

	});

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-40647192-1', 'coderang.com');
	ga('send', 'pageview');

}