var start = document.getElementById('start');
var join =  document.getElementById('join');
var user =  document.getElementById('userId');
var input = document.getElementById('input');
var audio = document.getElementById('audio');
var pause = document.getElementById('pause');

start.addEventListener('click', onStartClick);
join.addEventListener('click', onJoinClick);
pause.addEventListener('click', onPauseClick);

var stream = null;
var peer = new Peer({key: '3xmff0kggpb65hfr'});

peer.on('error', function(e){
	console.log(e);
});
peer.on('close', function(){
	console.log('peer closed')
});
peer.on('open', function(id) {
	user.innerHTML = 'My ID: '+ id;
	console.log('open stream');
});
peer.on('call', function(call) {
  // Answer the call, providing our mediaStream
  if (stream !== null) {
  	call.answer(stream);
  }
  
});

function onStartClick() {
	console.log('start click');
	audio.play();
	stream = audio.captureStream();
}

function onJoinClick() {
	if (!input.value) {
		alert('Type peer ID');
		return;
	}

	var audioCtx = new AudioContext();
	var dest = audioCtx.createMediaStreamDestination();

	var call = peer.call(input.value,  dest.stream);
	call.on('stream', function(s){
		audio.srcObject = s;
	    audio.play();
	});
}

function onPauseClick() {
	if (audio.paused) {
        audio.play();
        pause.textContent = "Pause";
    }
    else {
        audio.pause();
        pause.textContent = "Play";
    }
}