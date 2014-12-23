
var Car = function (loc) {
	this.loc = loc;
};

Car.prototype.move = function() {
	this.loc++;
};


var Van = function(loc) {
	Car.call(this,loc);
};