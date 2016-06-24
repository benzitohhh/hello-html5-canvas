function as_degree(rad) {
  return 360 / (2 * Math.PI) * rad;
}

function get_next_angle(width, indent) {
  var opp = width - indent;
  return Math.PI - Math.atan(opp / indent) - (Math.PI / 2);
}

function get_next_width(width, indent) {
  var opp = width - indent;
  return Math.sqrt(opp * opp + indent * indent);
}

var INDENT = 10;
var INITIAL_WIDTH = 150;
var NUM_SQUARES = 100;

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  var width = INITIAL_WIDTH;
  var angle = 0;

  // draw first rect
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, INITIAL_WIDTH, INITIAL_WIDTH);

  for(var i = 0; i < NUM_SQUARES; i++) {
    // Get next values
    angle = get_next_angle(width, INDENT);
    width = get_next_width(width, INDENT);

    if (angle > Math.PI / 8) {
      break;
    }

    // translate to rotation centre and stroke
    ctx.translate(INDENT, 0);
    ctx.rotate(angle);
    ctx.strokeRect(0, 0, width, width);
  }


}
