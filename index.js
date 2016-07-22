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

function get_num_squares(start_width, end_width, indent) {
  var angle = 0;
  var width = start_width;

  var num_squares = 0;
  while (width >= end_width && num_squares <= MAX_SQUARES) {
    num_squares++;
    angle = get_next_angle(width, indent);
    width = get_next_width(width, indent);
  }

  return num_squares;
}

function get_random_int(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

var MAX_SQUARES = 200;

var MAX_WIDTH = 1000;
var MIN_WIDTH = 30;

var MIN_INDENT = 3;
var MAX_INDENT = 60;

var INDENT = get_random_int(MIN_INDENT, MAX_INDENT);
var INITIAL_WIDTH =  get_random_int(MIN_WIDTH, MAX_WIDTH); // MAX_WIDTH;
var END_WIDTH = get_random_int(MIN_WIDTH, INITIAL_WIDTH);

var num_squares = get_num_squares(INITIAL_WIDTH, END_WIDTH, INDENT);

// colour gradient
var color_scale = d3.scale.linear()
      .domain([0, num_squares - 1])
      .range(["red", "yellow"]);

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  var width = INITIAL_WIDTH;
  var angle = 0;

  for(var i = 0; i < num_squares; i++) {
    // fill/stroke
    ctx.strokeRect(0, 0, width, width);
    ctx.fillStyle = color_scale(i);
    ctx.fillRect(0, 0, width, width);

    // Get next values
    angle = get_next_angle(width, INDENT);
    width = get_next_width(width, INDENT);

    // translate to rotation centre and stroke
    ctx.translate(INDENT, 0);
    ctx.rotate(angle);
  }


}
