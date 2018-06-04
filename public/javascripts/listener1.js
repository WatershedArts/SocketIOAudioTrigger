var trackIDs = [];

$.getJSON('audio/config.json', (data,status) => {
    console.log(data);
    $.each(data['listener1'],(key,tracks) => {
        var dd = '<audio id="'+tracks.trackname+'" preload="auto" controls="controls">' +
          '<source src="'+tracks.trackpath+'" type="audio/mp3"/>' +
        '</audio>';
        $('#track').append(dd);
        trackIDs.push(tracks.trackname);
    });
}).done(function() {
    console.log(trackIDs)
})

var socket = io.connect();

socket.emit('alive','Listener 1');
socket.on('message',function(data) {
    console.log(data);
});

socket.on('listener1',function(data) {
    console.log("Received Instruction: " +data);

    trackIDs.forEach(trackname => {
        if (data == trackname) {
            var aud = document.getElementById(trackname);
            aud.load();
            aud.currentTime = 0;
            aud.play();
        }
    })

    $('#events').prepend('<li>Played '+data+'</li>');
});
