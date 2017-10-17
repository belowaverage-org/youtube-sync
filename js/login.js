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
		var form = $(iframe[0].contentDocument);
		form.find('#li').click(function() {
			$.ajax({
				global: false,
				url: 'https://api.belowaverage.org/v1/AUTH/',
				method: 'POST',
				data: {
					username: form.find('input[name=username]').val(),
					password: form.find('input[name=password]').val()
				},
				success: function(token) {
					loader.args.token = token;
					setTimeout(function() {
						win.close();
					}, 100);
				},
				error: function() {
					setTimeout(function() {
						iframe[0].contentWindow.fadeOff();
						var count = 0;
						var offset = 0;
						var negate = false;
						var interval = 0;
						while(count++ < 110) {
							setTimeout(function() {
								if(interval++ == 10) {
									interval = 0;
									negate = !negate;
								}
								if(negate) {
									offset++;
								} else {
									offset--;
								}
								win.center('', offset, 0);
							}, count * 8);
						}
					}, 3000);
				}
			});
		});
	});
};