var socket = io.connect('https://rocky-sierra-32695.herokuapp.com:5000');

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

$('#sheep1').click(function() {
    console.log("Triggered Sheep Track 1");
    socket.emit('instruction-for-sheep','Track 1');
});

$('#sheep2').click(function() {
    console.log("Triggered Sheep Track 2");
    socket.emit('instruction-for-sheep','Track 2');
});

$('#sheep3').click(function() {
    console.log("Triggered Sheep Track 3");
    socket.emit('instruction-for-sheep','Track 3');
});