var settings = {};
var queue = {};
var token = '';
var login = {};
var player = {};
var jqFrame = {};
var youtube = {};
var main = function() {};
var win = {};
var isFullScreen = false;
main = function() {
	queue.open();
	win = new explorer.window()
	.title('YouTube Sync - Playback')
	.icon(loader.folder+'img/icon.png')
	.resize(500, 360)
	.center('', -100, -100);
	win.on.close = function() {
		login.win.close();
		queue.win.close();
	}
	function toggleFullScreen() {
		win.toggleMax();
		if(win.is.maximized) {
			explorer.toggleFullScreen(true);
		} else {
			explorer.toggleFullScreen(false);
		}
	}
	function changeVideo(id) {
		player.source({
			type: 'video',
			sources: [{
				src: id,
				type: 'youtube'
			}]
		});
	}
	function updateQuality() {
		win.mBar[2].context[0].context = [];
		$.each(youtube.getAvailableQualityLevels(), function() {
			var quality = this;
			var icon = icon = '';
			if(youtube.getPlaybackQuality() == quality) {
				icon = loader.folder+'img/bull.png';
			}
			win.mBar[2].context[0].context.push({
				title: quality,
				icon: icon,
				callback: function() {
					youtube.setPlaybackQuality(quality);
					$.each(win.mBar[2].context[0].context, function() {
						if(this.title == quality) {
							this.icon = loader.folder+'img/bull.png';
						} else {
							this.icon = '';
						}
					});
				}
			});
			
		});
	}
	win.front();
	win.mBar = [
		{
			title: 'File',
			context: [
				{
					title: 'Exit',
					callback: function() {
						win.close();
					}
				}, {
					title: 'Test',
					callback: function() {
						changeVideo('IBfQXYe0-Lc');
					}
				}
			]
		}, {
			title: 'View',
			context: [
				{
					title: 'Show queue...',
					icon: loader.folder+'img/que.png',
					callback: function() {
						if(queue.win.is.closed) {
							queue.open();
						} else {
							queue.win.toggleMin();
						}
					}
				}, {
					title: 'Show logs...',
					icon: loader.folder+'img/logs.png',
					callback: function() {
						if(sat.is.closed) {
							openSat();
						} else {
							sat.toggleMin();
						}
					}
				}
			]
		}, {
			title: 'Playback',
			context: [
				{
					title: 'Quality',
					context: [
						{
							title: 'Video must be playing first...'
						}	
					]
				}, {}, {
					title: 'Fullscreen...',
					icon: loader.folder+'img/full.png',
					callback: function() {
						toggleFullScreen();
					}
				}, {}, {
					title: 'Play/Pause',
					icon: loader.folder+'img/plpa.png',
					callback: function() {
						if(player.isPaused()) {
							player.play();
						} else {
							player.pause();
						}
					}
				}, {
					title: 'Next',
					icon: loader.folder+'img/next.png',
					callback: function() {}
				}, {
					title: 'Previous',
					icon: loader.folder+'img/prev.png',
					callback: function() {}
				}, {
					title: 'Stop',
					icon: loader.folder+'img/stop.png',
					callback: function() {}
				}, {}, {
					title: 'Mute/Unmute',
					icon: loader.folder+'img/umut.png',
					callback: function() {
						player.toggleMute();
						if(player.isMuted()) {
							win.mBar[2].context[9].icon = loader.folder+'img/mute.png';
						} else {
							win.mBar[2].context[9].icon = loader.folder+'img/umut.png';
						}
					}
				}
			]
		}, {
			title: 'Channel',
			context: [
				{
					title: 'Change channel...',
					icon: loader.folder+'img/chan.png',
					callback: function() {}
				}, {
					title: 'Hide channel',
					icon: loader.folder+'img/hide.png',
					callback: function() {}
				}
			]
		}, {
			title: 'About',
			context: [
				{
					title: 'About YouTube Sync...',
					icon: loader.folder+'img/icon.png',
					callback: function() {}
				}, {}, {
					title: 'About Webdows...',
					callback: function() {}
				}, {
					title: 'About Below Average...',
					callback: function() {}
				}
			]
		}
	]
	win.menuBar(win.mBar);
	win.body.html(`
		<style>
			.window[windowid=`+win.id+`] iframe {
				width:100%;
				height:100%;
				position:absolute;
				border:0px;
			}
			.window[windowid=`+win.id+`] .body {
				background-image:url('`+loader.folder+`img/loa1.png');
				background-position:50% 50%;
				background-repeat:no-repeat;
				background-size:100px;
				background-color:black;
			}
			.window[windowid=`+win.id+`] .body::before {
				content:'';
				display:block;
				position:absolute;
				width:100px;
				background-image:url('`+loader.folder+`img/loa2.png');
				background-size:100% 100%;
				height:100px;
				top:calc(50% - 50px);
				left:calc(50% - 50px);
				animation:spin 1s infinite linear;
			}
			@keyframes spin {
				from {
					transform:rotate(0deg);
				} to {
					transform:rotate(360deg);
				}
			}
		</style>
	`);
	win.body.find('*:not(style)').remove();
	var iframe = $('<iframe src="'+loader.folder+'plyr/plyr.html"></iframe>').appendTo(win.body);
	iframe.on('load', function() { //Player Setup
		jqFrame = iframe.contents();
		player = iframe[0].contentWindow.player;
		youtube = player.getEmbed();
		window.player = iframe[0].contentWindow.player;
		jqFrame.find('button[data-plyr=fullscreen]').click(function(e) {
			toggleFullScreen();
		});
		player.on('ready', function() {
			var firstFire = true;
			youtube = player.getEmbed();
			player.play();
			player.on('playing', function(e) {
				if(firstFire) {
					player.stop();
					updateQuality();
					firstFire = false;
				}
			});
		});
	});
}
$.getJSON(loader.folder+'config.json', function(data) {
	settings = data;
	system.loader(loader.folder+'js/login.js', {
		settings: settings,
		token: token,
		win: win,
		main: main,
		login: login
	}, function() {
		if(token == '') {
			login.open();
		}
	});
});
system.loader(loader.folder+'js/queue.js', {queue: queue, win: win});