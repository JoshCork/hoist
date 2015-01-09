
var UIObject = function() {
    //console.log("in UIObject");
}

UIObject.prototype.intersects =  function(obj, mouse) {
        // console.log("in intersects");
        var t = 5; // this is the tolerance limit.
        var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width; // is the mouse's x value between the objects x + width value (given a tollerance)
        var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height; // is the mouse's y value between the objects y + height value (given a tollerance)
        
        if (xIntersect && yIntersect) {
        console.log("xIntersect = " + xIntersect);
        console.log("yIntersect = " + yIntersect);
        }
        return xIntersect && yIntersect;
    }

UIObject.prototype.updateStats = function() {
        // console.log("in updateStats"); 
        // console.log("this: " + this );
        // console.log("canvas.mouse: " + ctx.mouse);
        if (this.intersects(this, ctx.mouse)) {
            this.hovered = true;
            if (ctx.mouse.clicked) {
                this.clicked = true;
            }
        } else { 
            this.hovered = false;
        }

        if (!ctx.mouse.down) {
            this.clicked = false;
        }
    }

var StartBoard = function() {
	// this object will be the background for new games.  It will contain some 
	// text (instructions) for the users and visually contain the players that they can 
	// choose from. 
	
	this.btnCatGirl = new PlayerButton("CatGirl", 0,tileHeight,'images/char-cat-girl.png');
	this.btnLilBoy = new PlayerButton("lilBoy", tileWidth,tileHeight,'images/char-boy.png');
	this.btnHorns = new PlayerButton("Horns", tileWidth*2,tileHeight,'images/char-horn-girl.png');
	this.btnPinky = new PlayerButton("Pinky", tileWidth*3,tileHeight,'images/char-pink-girl.png');
	this.btnPrin = new PlayerButton("Prin", tileWidth*4,tileHeight,'images/char-princess-girl.png');

	this.allPlayerBtns = [this.btnCatGirl,this.btnLilBoy,this.btnHorns,this.btnPinky,this.btnPrin];

}

StartBoard.prototype = Object.create(UIObject.prototype);
StartBoard.prototype.constructor = StartBoard;

StartBoard.prototype.render = function() {
	// this.btnCatGirl.render();
	// this.btnLilBoy.render();
	// this.btnHorns.render();
	// this.btnPinky.render();
	// this.btnPrin.render();	

	this.allPlayerBtns.forEach(function(button) {
            button.render();
        });
}

StartBoard.prototype.update = function() {
	// update the player based on which character is picked. 
	this.allPlayerBtns.forEach(function(button) {
            button.update();
        });
}

var PlayerButton = function(text, x, y, spriteImage ) {
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 170;
    this.clicked = false;
    this.hovered = false;
    this.text = text;
    this.sprite = spriteImage;
}

PlayerButton.prototype = Object.create(UIObject.prototype);
PlayerButton.prototype.constructor = PlayerButton;

PlayerButton.prototype.render = function() {    
    //set color
    if (this.hovered) {
        ctx.fillStyle = "blue";
    } else {
        ctx.fillStyle = "red";
    }

    //render button
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // text options
    var fontSize = 20;
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.font = fontSize + "pt Impact";     

    // text position
    var textSize = ctx.measureText(this.text);
    var textX = this.x + (this.width / 2) /*+ (textSize.width / 2)*/;
    var textY = this.y + (this.height / 4) + (fontSize / 2);

    // render the sprite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // render the text
    ctx.fillText(this.text, textX, textY);
}

PlayerButton.prototype.update = function() {
    var wasNotClicked = !this.clicked;
    this.updateStats();   

    if (this.clicked && wasNotClicked) {
        if(!_.isUndefined(this.handler)) {
            this.handler();
        }
    }
}