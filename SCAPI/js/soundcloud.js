
$(function () {
	SC.initialize({client_id: '28b05a26f8f8bec9d27bea7c938337ff'});
	getTracks();
	var timer = setInterval(getTracks, 100000);
})

function getTracks() {
	$('ul').html('');
	SC.get('/tracks')
	.then(function (response) {
		console.log(response);
		response.forEach(function (track) {
			$('ul').append('<li>' + track.created_at + ' - <a data-id="' + track.id + '" href="#">' + track.title + '</a></li>');
		});
		$('li a').on('click', function () {
			loadTrack($(this).attr('data-id'));
		});
		console.log(response[0].artwork_url);
		// $('.art-display').css('background-image', 'url(' + response[0].artwork_url + ')');
	});
}

function loadTrack(trackId) {
	var stream;
	SC.get('/tracks/' + trackId).then(function (resource) {
		if (resource.artwork_url) {
			$('.art-display').css('background-image', 'url(' + resource.artwork_url + ')');
		}
	});
	// console.log(SC.get('/tracks/' + trackId + '/artwork_url'));
	SC.stream('/tracks/' + trackId).then(function(player){
		stream = player;
		stream.play();
	});
	console.log('Track loaded:' + trackId);
	return stream;
}
