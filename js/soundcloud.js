
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
			$('ul').append('<li>' + track.created_at + ' - ' + track.title + '</li>');
		})
	});
}
