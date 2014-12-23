## 12/14/2014 - OOJS - 

### subclasses - oof this was hard

 - *be careful* - Van.prototype = new Car(); --> this is incorrect but was widely accepted as the right way to do it.  It will show up as a BKM on many reputable sites. 

 - building out a subclass quiz: this was difficult. Here's my swag at code: 

 	var Car = function(loc){
	    this.loc = loc;
	};
	Car.prototype.move = function(){
	    this.loc++;
	};

	var Van = function(loc){
	    var obj = Object.create(Car.prototype);
		this.loc = loc;
	    this.move = obj.move;
	};

	Van.prototype.grab = function() {
	    console.log('I have no idea what grab is supposed to do');
	};

	var zed = new Car(3);
	zed.move();

	var amy = new Van(9);
	amy.move();
	amy.grab();
	console.log('AmyLocaiton: ' + amy.loc);

 - However after reviewing the answer set this is what it should have looked lke:

 	var Car = function(loc) {
 		thi.loc = loc;
 	};

 	Car.prototype.move = function () {
 		this.loc++;
 	};

 	var Van = function(loc) {
 		Car.call(this,loc);
 	};

 	Van.prototype = Object.create(Car.prototype);
 	Van.prototype.constructor = Van; // this makes up for the one we overwrote above.  W/out this it would fall through to Car which is not correct... especially since we want Van to have it's own Methods first.  
 	Van.prototype.grab = function() {/*.......*/};

### Pseudoclassical Patters - for classes in javascript
The pattern is named this way because it attempts to replicate classes in true OO languages. 

### Prototypal Classes
- you can use a built in methods container (buiilt into the javascript language) called 'prototype' to store these m ethods.  so in our example in the lesson was taking Car.mehtod.move and changing that to Car.prototype.move --> it's just a naming convention.  
- There is one benefit beyond just being something the language added in for conveinence.  You can use a special method .constructor to understand which object was the constructor so in the example below with cars.  amy.constructor would point back to the object/Class 'Car'.

### Functional Classes

"The class builds the object that it's going to augment. The decorator accepts the object that it's going to augment as an input."

It's conventional to name a class with a capital letter.  Like a poper noun. 

### Object Decorator Pattern
- It's common to use an adjective to name it.
Her'es how I refactored the code;
	
		// Refactor the carlike function in a way
		// that allows you to use the method calling 
		// syntax with "dot access" as we do below.
		var carlike = function(obj, loc) {
		    obj.loc = loc;
		    obj.move = function() {
		      this.loc++;
		    };
		    
		    return obj;
		};

		/////
		// Here we want to call move with "dot access"
		var amy = carlike({}, 1);
		amy.move();
		console.log( 'Amy location: ' + amy.loc);
		var ben = carlike({}, 9);
		ben.move();

Here is the instructor's solution:
	
	var carLike = function(obj, loc) {
		obj.loc = loc;
		obj.move = move;
		return obj;
	};

	var move = function() {
		this.loc++;
	};

So he referenced the modified move function where as I built it into the carlike function itself.  I feel silly for having done so. :( -- OOPS!  Never mind.... that was part of the next quiz... i had already done so!  (and now changed back in a later lesson - to save on memory so a new instance of that function is not created every time.)

**Interesting, these are the unit tests for the above:**

		describe("TEST: A new carlike object should have a move method.", function() {
		  it("\nA new carlike can move: ", function() {
		      expect(carlike({}, 1)).to.respondTo('move');
		  });
		});

		describe("TEST: amy should have moved from 1 to 2.", function() {
		  it("\nAmy moved from 1 to 2: ", function() {
		    amy.loc.should.be.equal(2);
		  });
		});

		describe("TEST: ben should have moved from 9 to 10.", function() {
		  it("\nBen moved from 9 to 10: ", function() {
		    ben.loc.should.be.equal(10);
		  });
		});

### Prototype Chains
Makes one object behave as if it has all the properties of the other object.  By delegating.

### 'this' keyword
- fn.call( r,x,y ) : This allows you to override the assignment of what that function is bound to. In this case I'm binding it to the parameter 'r' (because fn only takes two parameters... x and y).

the keyword 'this' allows you to write a function once and then use that as a method on a bunch of other objects.

## 12/12/2014 - OOJS - First Day, first entry
- I'm excited.  This hack reactory guy seems pretty good. 
**Lexical Scope** - Global variables are the easiest because they can be accessed from anywhere. 

Variables defined inside a function that are not declared (using the var keyword) are automatically added to the global scope, not the scope of the function that you are in. 