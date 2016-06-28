var MAX_SQUARES = 200;

var MAX_WIDTH = 1000;
var MIN_WIDTH = 30;

var MAX_HEIGHT = 750;
var MIN_HEIGHT = 30;

var MIN_INDENT = 3;
var MAX_INDENT = 60;

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

function _draw(i, ctx, indent, num_squares, width, color_scale) {
  if (i >= num_squares) {
    return;
  }

  // fill/stroke
  ctx.strokeRect(0, 0, width, width);
  ctx.fillStyle = color_scale(i);
  ctx.fillRect(0, 0, width, width);

  // Get next values
  var next_angle = get_next_angle(width, indent);
  var next_width = get_next_width(width, indent);

  // translate to rotation centre and stroke
  ctx.translate(indent, 0);
  ctx.rotate(next_angle);

  _draw(i+1, ctx, indent, num_squares, next_width, color_scale);
}

function draw(ctx, start_x, start_y, indent, initial_width, start_angle, num_squares, color_scale) {
  ctx.save();
  ctx.translate(start_x, start_y);
  ctx.rotate(start_angle);
  _draw(0, ctx, indent, num_squares, initial_width, color_scale);
  ctx.restore();
}

var indent = get_random_int(MIN_INDENT, MAX_INDENT);
var initial_width = get_random_int(MIN_WIDTH, MAX_WIDTH);
// var initial_width = MAX_WIDTH;
var end_width = get_random_int(MIN_WIDTH, initial_width);
//var initial_angle = Math.random() * Math.PI / 2;
var initial_angle = Math.PI / 4 - Math.random() * Math.PI / 2;

// var start_x = get_random_int(0, MAX_WIDTH);
// var start_y = get_random_int(0, MAX_HEIGHT / 2);

var start_x = 0;
var start_y = 0;

var num_squares = get_num_squares(initial_width, end_width, indent);

// colour gradient
var color_scale = d3.scale.linear()
      .domain([0, num_squares - 1])
      .range(["red", "yellow"]);

var ctx = document.getElementById('canvas').getContext('2d');

draw(ctx, start_x, start_y, indent, initial_width, initial_angle, num_squares, color_scale);
