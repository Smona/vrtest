$(function () {
	SC.initialize({client_id: '28b05a26f8f8bec9d27bea7c938337ff'});
	getTracks();
	var timer = setInterval(getTracks, 100000);
})

function getTracks() {
	$('ul').html('');
	SC.get('/tracks')
	.then(function (response) {
		response.forEach(function (track) {
			$('ul').append('<li>' + track.created_at + ' - <a data-id="' + track.id + '" href="#">' + track.title + '</a></li>');
		});
		$('li a').on('click', function () {
			loadTrack($(this).attr('data-id'));
		});
	});
}

function loadTrack(trackId) {
	var stream;
	var playPause = $('#btn-playpause');
	// Play track
	SC.stream('/tracks/' + trackId).then(function(player){
		stream = player;
		stream.on('play', function () {playPause.removeClass('paused');});
		stream.on('pause', function () {playPause.addClass('paused');});
		// Arm player buttons
		playPause.off();
		playPause.on('click', function () {
			if (playPause.hasClass('paused')) {
				stream.play();
			} else {
				stream.pause();
			}
		})
		stream.play();
	});
	// Load track information
	SC.get('/tracks/' + trackId).then(function (resource) {
		// Load Text information
		$('#song-info-title').text(resource.title);
		$('#song-info-artist').text(resource.user.username);
		// Load artwork
		if (resource.artwork_url) {
			$('.art-display').css('background-image', 'url(' + resource.artwork_url.replace('-large', '-crop') + ')');
		}
	});
	console.log('Track loaded:' + trackId);
	// return stream;
}
