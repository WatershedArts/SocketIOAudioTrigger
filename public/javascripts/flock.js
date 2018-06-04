var socket = io.connect();

socket.emit('alive','Flock');

socket.on('message',function(data) {
    console.log(data);
});

socket.on('flock',function(data) {
    console.log("Received Instruction: " +data);
    if(data == "Track 1") {
        var aud = document.getElementById('track1');
        aud.load();
        aud.currentTime = 0;
        aud.play();
    }
    else if(data == "Track 2") {
        var aud = document.getElementById('track2');
        aud.load();
        aud.currentTime = 0;
        aud.play();
    }
    else if(data == "Track 3") {
        var aud = document.getElementById('track3');
        aud.load();
        aud.currentTime = 0;
        aud.play();
    }

    $('#events').prepend('<li>'+data+'</li>');
});
