var menuBar = {
	
};
loader.args.queue.open = function() {
	loader.args.queue.win = new explorer.window()
	.title('YouTube Sync - Queue')
	.icon(loader.folder+'../img/icon.png')
	.resize(200, 360)
	.center('', 264, -100)
	.controls([]);
	var win = loader.args.queue.win;
	win.menuBar(menuBar);
}