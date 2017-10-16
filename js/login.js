var win = loader.args.win;
var creds = loader.args.credentials;
var login = creds.login;
login.open = function() {
	login.window = new explorer.window()
	.title('YouTube Sync - Login')
	.icon(loader.folder+'../img/icon.png')
	.resize(405, 550)
	.center()
	.closeWith(win)
	.controls([]);
	var frame = $('<iframe style="border:0px;position:absolute;top:0px;left:0px;width:100%;height:100%;" src="'+loader.args.settings.login_url+'"></iframe>')
	.appendTo(login.window.body);
	frame.on('load', function() {
		var form = $(frame[0].contentDocument);
		form.find('#li').click(function() {
			
		});
	});
}

if(creds.token == '') {
	login.open();
}