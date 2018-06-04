// Get the Data from the Json file
$.getJSON('audio/config.json', (data,status) => {
    $.each(data['listener1'],(key,tracks) => {
        var dd = "<button data-id='listener1' onclick='sendEvent(this)' data-track='"+tracks.trackname+"' type='button' class='btn btn-outline-danger'>"+tracks.trackname+"</button>"
        $('#listener1tracks').append(dd);
    });

    $.each(data['listener2'],(key,tracks) => {
        var dd = "<button data-id='listener2' onclick='sendEvent(this)' data-track='"+tracks.trackname+"' type='button' class='btn btn-outline-primary'>"+tracks.trackname+"</button>"
        $('#listener2tracks').append(dd);
    });

}).done(function() {
    console.log("Got Tracks!!");
})

// Connect to default socket
var socket = io.connect();
socket.emit('alive','Controller');

// On message add a log
socket.on('message',function(data) {
    $('#events').append('<p>'+data+'</p>');
});

// Function embeded into the buttons
// Figures out where to send events to 
function sendEvent(element) {
    var track = $(element).data('track');
    var towho = $(element).data('id');
    
    socket.emit('instruction-for-'+towho,track);
}