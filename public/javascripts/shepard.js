var socket = io.connect('//:80');

socket.emit('alive','Shepard');

socket.on('message',function(data) {
    console.log(data);
    $('#events').append('<p>'+data+'</p>');
});

$('#wolf1').click(function() {
    console.log("Triggered Wolf Track 1");
    socket.emit('instruction-for-wolf','Track 1');
});

$('#wolf2').click(function() {
    console.log("Triggered Wolf Track 2");
    socket.emit('instruction-for-wolf','Track 2');
});

$('#wolf3').click(function() {
    console.log("Triggered Wolf Track 3");
    socket.emit('instruction-for-wolf','Track 2');
});

$('#flock1').click(function() {
    console.log("Triggered Flock Track 1");
    socket.emit('instruction-for-flock','Track 1');
});

$('#flock2').click(function() {
    console.log("Triggered Flock Track 2");
    socket.emit('instruction-for-flock','Track 2');
});

$('#flock3').click(function() {
    console.log("Triggered Flock Track 3");
    socket.emit('instruction-for-flock','Track 3');
});
