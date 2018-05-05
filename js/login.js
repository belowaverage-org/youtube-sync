loader.args.login.open = function() {
	var opened = true;
	loader.args.login.win = new explorer.window()
	.title('YouTube Sync - Authentication')
	.icon(loader.folder+'../img/icon.png')
	.resize(420, 620)
	.center()
	.controls([]);
	var win = loader.args.login.win;
	var iframe = $('<iframe style="border:0px;position:absolute;top:0px;left:0px;width:100%;height:100%;" src="'+loader.args.settings.login_url+'"></iframe>')
	.appendTo(win.body);
	win.on.close = function() {
		if(opened) {
			setTimeout(loader.args.main, 300);
			opened = false;
		}
	};
	iframe.on('load', function() {
		iframe[0].contentWindow.postMessage();
	});
};