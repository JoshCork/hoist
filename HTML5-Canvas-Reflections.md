
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