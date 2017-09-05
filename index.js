// POINT
function Point(x,y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return (`(${this.x}, ${this.y})`)
}

function Side(length) {
  this.length = length
}

// SHAPE
function Shape() {
}

Shape.prototype.addToPlane = function (x, y) {
  this.position = new Point(x,y)
}

Shape.prototype.move = function (x,y) {
  this.position = new Point(x,y)
}


// CIRCLE
function Circle(radius) {
  Shape.call(this)
  this.radius = radius
}

Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.constructor = Circle

Circle.prototype.diameter = function() {
  return(this.radius * 2);
}

Circle.prototype.area = function () {
  return (Math.PI * this.radius ** 2)
}

Circle.prototype.circumference = function () {
  return (2 * Math.PI * this.radius)
}

// POLYGON
function Polygon(sides) {  // sides is an array
  Shape.call(this)
  this.sides = sides
}

Polygon.prototype = Object.create(Shape.prototype)
Polygon.prototype.constructor = Polygon

Polygon.prototype.perimeter = function () {
  var perimeter = 0
  for (var i = 0; i <this.sides.length; i++) {
    perimeter += this.sides[i].length
  }
  return perimeter
}

Polygon.prototype.numberOfSides = function () {
  return this.sides.length
}

// QUADRILATERAL
function Quadrilateral(l1, l2, l3, l4) {
    Polygon.call(this, [new Side(l1), new Side(l2), new Side(l3), new Side(l4)])
}

Quadrilateral.prototype = Object.create(Polygon.prototype)
Quadrilateral.prototype.constructor = Quadrilateral

// TRIANGLE
function Triangle(l1,l2,l3) {
  Polygon.call(this, [new Side(l1), new Side(l2), new Side(l3)])
}

Triangle.prototype = Object.create(Polygon.prototype)
Triangle.prototype.constructor = Triangle

// RECTANGLE
function Rectangle(width, height) {
  Quadrilateral.call(this, width, width, height, height)
  this.width = width
  this.height = height
}

Rectangle.prototype = Object.create(Quadrilateral.prototype)
Rectangle.prototype.constructor = Rectangle

Rectangle.prototype.area = function () {
  return this.width * this.height
}

// SQUARE
function Square(side) {
  Rectangle.call(this, side, side)
  this.side = side
}

Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.constructor = Square

Square.prototype.listProperties = function() {
  var properties = "";
  for (var property in this) {
    if (this.hasOwnProperty(property)) {
      properties += "this." + property + this[property];
    }
  }
  return(properties);
}