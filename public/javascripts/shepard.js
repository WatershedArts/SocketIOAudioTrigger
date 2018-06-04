var trackIDs = [];



$.getJSON('audio/config.json', (data,status) => {
    console.log(data);
    $.each(data['wolf'],(key,tracks) => {
        var dd = "<button data-id='wolf' onclick='sendEvent(this)' data-track='"+tracks.trackname+"' type='button' class='btn btn-outline-danger wolf'>"+tracks.trackname+"</button>"
        $('#wolftracks').append(dd);
    });

    $.each(data['flock'],(key,tracks) => {
        var dd = "<button data-id='flock' onclick='sendEvent(this)' data-track='"+tracks.trackname+"' type='button' class='btn btn-outline-primary flock'>"+tracks.trackname+"</button>"
        $('#flocktracks').append(dd);
    });

}).done(function() {
    console.log(trackIDs)
})

var socket = io.connect();

socket.emit('alive','Shepard');

socket.on('message',function(data) {
    console.log(data);
    $('#events').append('<p>'+data+'</p>');
});

function sendEvent(element) {
    var track = $(element).data('track');
    var towho = $(element).data('id');
    console.log('instruction-for-'+towho,track);
    socket.emit('instruction-for-'+towho,track);
}


// $('#wolf1').click(function() {
//     console.log("Triggered Wolf Track 1");
//     socket.emit('instruction-for-wolf','Track 1');
// });
//
// $('#wolf2').click(function() {
//     console.log("Triggered Wolf Track 2");
//     socket.emit('instruction-for-wolf','Track 2');
// });
//
// $('#wolf3').click(function() {
//     console.log("Triggered Wolf Track 3");
//     socket.emit('instruction-for-wolf','Track 2');
// });
//
// $('#flock1').click(function() {
//     console.log("Triggered Flock Track 1");
//     socket.emit('instruction-for-flock','Violet');
// });
//
// $('#flock2').click(function() {
//     console.log("Triggered Flock Track 2");
//     socket.emit('instruction-for-flock','Track 2');
// });
//
// $('#flock3').click(function() {
//     console.log("Triggered Flock Track 3");
//     socket.emit('instruction-for-flock','Track 3');
// });
