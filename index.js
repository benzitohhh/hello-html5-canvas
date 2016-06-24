function draw(){
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.fillRect(30, 5, 1, 30);

    ctx.beginPath();

    // 2 pixel line
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 100);

    // single pixel line
    ctx.moveTo(100.5, 50);
    ctx.lineTo(100.5, 100);

    ctx.stroke();

  }
}

draw();
