var start = document.getElementById('start');
var join =  document.getElementById('join');
var user =  document.getElementById('userId');
var input = document.getElementById('input');
var audio = document.getElementById('audio');
var load = document.getElementById('load');
var pause = document.getElementById('pause');

start.addEventListener('click', onStartClick);
join.addEventListener('click', onJoinClick);
load.addEventListener('click', onLoadClick);
pause.addEventListener('click', onPauseClick);

var stream = null;
//var peer = new Peer({key: '3xmff0kggpb65hfr'});
var peer = new Peer({host:'howler-api.herokuapp.com', secure:true, port:443, key: 'peerjs', debug: 3});

function onLoadClick() {
	audio.pause();
	var file=document.createElement('input');
    file.type="file";
    file.style.display = 'none';
    document.body.appendChild(file);

    file.click();

    file.onchange = function() {
    	audio.src = URL.createObjectURL(this.files[0]);

    	onStartClick();
    };
}

function onStartClick() {
	console.log('start click');
	audio.play();
	stream = audio.captureStream();
	peer.on('open', function(id) {
	  user.innerHTML = 'My ID: '+ id;
	  console.log('open stream');

	  stream = audio.captureStream();
	  audio.play();
	});

	peer.on('call', function(call) {
	  // Answer the call, providing our mediaStream
	  call.answer(stream);
	});
}

function onJoinClick() {
	if (!input.value) {
		alert('Type peer ID');
		return;
	}

	var audioCtx = new AudioContext();
	var dest = audioCtx.createMediaStreamDestination();

	var call = peer.call(input.value,  dest.stream);

	peer.on('stream', function(stream) {
	  audio.srcObject = stream;
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
