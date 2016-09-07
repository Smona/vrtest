
$(function () {
	SC.initialize({client_id: '28b05a26f8f8bec9d27bea7c938337ff'});
	getTracks();
	var timer = setInterval(getTracks, 10000);
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

function loadTrack(track) {
	console.log('Track loaded:' + track);
	var stream;
	SC.stream('/tracks/' + track).then(function(player){
		stream = player;
		stream.play();
	});
	return stream;
}
