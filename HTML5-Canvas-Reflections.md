
## 12/22/2014 - "your DONE"
Instructor's notes on gaming:

	Here <http://www.html5gamedevelopment.com/html5-game-tutorials/2013-12-developing-html5-games-1hr-video-presentation> is a great video about developing a HTML5 game. You can also check out /r/gamedev <https://reddit.com/r/gamedev> for more resources.

	This is no formal final project at this time for this course but don't let that get you down. I'm sure you already have one or two ideas that you want to work on. And if you don't, what are you waiting for? Go build something and most importantly, BE awesome.

## 12/22/2014 - Instructor Notes on The Game Loop / Processing User Input

Playing a video in a canvas using requestAnimationFrame is just one of the many interactive things you can do.

To create more complex applications, we have to think more about not only the things we are displaying to the user on-screen but also any input (keyboard, mouse, audio) the user might generate that we need to process.

The game loop is a sequence of events that run continuously while an app or game is being used. requestAnimationFrame handles most of the heavy lifting in that it ensures that your app runs as close to 60 frames per second as possible while the app is being actively viewed.

Assuming we have already creating the functions we plan to call, a fleshed out game loop could look something like this.

	function draw() {
	    // request to execute this function at the next earliest convenience
	    requestAnimationFrame(draw);
	    processInput();
	    moveObjectsAndEnemies();
	    drawAllTheThings();
	}
	Processing Keyboard Input

While it isn't too difficult to process keyboard presses by hand, I rather stand on the shoulders of giants and use open source projects that have perfected a library serving the thing I want to do. One such library is Kibo.

Kibo allows you to reference keys by their common names('a', '3', 'up') instead of their keycodes greatly simplifying your code. You can also attach events to pressing or releasing a key as well as modifier keys or wildcards.

	var k = new Kibo();
	k.down(['up', 'w'], function() {
	    // Do something cool on the canvas
	});

	k.up(['enter', 'q'], function() {
	    // Do other stuff.
	});

Processing Mouse Input

Like many other DOM elements, the canvas can accept click and mousedown events. We do however have to do a little work to figure out where exactly in the canvas the user has clicked. Mouse click events return clientX and clientY positions that are global to the browser window. Every element knows where it is positioned relative to the browsers (0,0) position (offsetLeft and offsetTop).

To get the canvas-relative of a click, you need to subtract the offsetLeft and offsetTop values from clientX and clientY. Check out the example code below.

	var c = document.querySelector("canvas");

	function handleMouseClick(evt) {
	        x = evt.clientX - c.offsetLeft;
	        y = evt.clientY - c.offsetTop;
	        console.log("x,y:"+x+","+y);
	}
	c.addEventListener("click", handleMouseClick, false);

## 12/22/2014 - Links from video tutorial

Some good links for learning annimation ons screen. 

	1. http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	2. http://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm
	3. https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
	4. Kibo.js - a JavaScript library for processing keyboard input. https://github.com/marquete/kibo


## 12/20/2014 - From Pixels to Animation

ImageData Object
- width: width of the source image in pixels
- height: height of the source image in pexels
- data: array containing the red, green, blue, and alpha values for each pixel.

The data Property: one long string of each pixels values.  You can retrieve or modify the values using the following:
- createImageData: initializes a blank image object that you can modify
- getImageData: retrieve data from a back end canvas
- putImageData: will store data to a back end canvas

## 12/20/2014 - Notes from black and white film (so i can use them later)

nstructor Notes

Don't worry if you can't follow all the code in these links right now. Try to look at them from a high level and don't worry about the syntax too much.

Tanner Helland outlines a bunch of different algorithms for computing grayscale here in pseudocode and Visual Basic. Mozilla has a great tutorial on using how to do a green screen effect.

'here': http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
'green screen effect': https://developer.mozilla.org/en-US/docs/Web/HTML/Manipulating_video_using_canvas

The visual effects and resources that we didn't create in code are listed below

Attributions

City Background

Title: What Happened on Twenty-Third Street, New York City (1901)
Director: Edwin S. Porter
Production Company: Edwin S. Porter
Sponsor: Edison Mfg. Co.
https://archive.org/details/What_Happened_1901

Train Background

Title: Freight Train (1898)
Producer: The Edison Manufacturing Co. and Thomas A. Edison, Inc.
https://archive.org/details/EdisonMotionPicturesCollectionPartOne1891-1898
https://archive.org/download/EdisonMotionPicturesCollectionPartOne1891-1898/1898Freight_train.mpg

Music

Title: Old Fasioned Auto Piano.wav
Producer: Razzvio
http://www.freesound.org/people/Razzvio/sounds/79572/

Title Card Design

Name: Silent Movie The End Title Card HD
Creator: Farrin N. Abbott / CopyCatFilms

Filters and Effects

Night Vision Scope

Creator: Andrew Kramer / Video Copilot http://www.videocopilot.net/blog/2012/11/new-tutorial-simulated-scopes/

## 12/19/2014 - save() and restore()

Every canvas objects contains a stack of drawing states. Stacks are data structures that only let you push new items at one end. When you retrieve an item, it's the last item that was pushed or Last In-First Out(LIFO).

Let's see how this would work in code. Let's say you wanted to draw a couple rectangles in different colors. For this small example, we could get away with reassigning the fillStyle each time instead of using save and restore.

	var c = document.querySelector("#c");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "blue";
	ctx.fillRect(0,0,50,50);

	ctx.fillStyle = "green"
	ctx.fillRect(100,100,10,10);

	ctx.fillStyle = "blue";
	ctx.fillRect(200,10,20,20);

This is better.

	var c = document.querySelector("#c");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "blue";
	ctx.fillRect(0,0,50,50);

	// Save state with blue fill
	ctx.save();
	ctx.fillStyle = "green";
	ctx.fillRect(100,100,10,10);
	// Restore to blue fill
	ctx.restore();

	ctx.fillRect(200,10,20,20);

The canvas state can store:

The current transformation matrix (rotation, scaling, translation)
	strokeStyle
	fillStyle
	font
	globalAlpha
	lineWidth
	lineCap
	lineJoin
	miterLimit
	shadowOffsetX
	shadowOffsetY
	shadowBlur
	shadowColor
	globalCompositeOperation
	textAlign
	textBaseline
	The current clipping region