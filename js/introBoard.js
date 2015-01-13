
var UIObject = function() {
    //console.log("in UIObject");
}

UIObject.prototype.intersects = function(obj, mouse) {
    // console.log("in intersects");
    var t = 5; // this is the tolerance limit.
    var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width; // is the mouse's x value between the objects x + width value (given a tollerance)
    var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height; // is the mouse's y value between the objects y + height value (given a tollerance)
    
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
    
    this.NEW_GAME_TEXT = ["Click on a player below to start the game.", "Your objective is to navigate the player"," to the water with out getting hit"," by a passing bug!"]

    this.btnCatGirl = new PlayerButton("CatGirl", 0, tileHeight * 5, 'images/char-cat-girl.png');
    this.btnLilBoy = new PlayerButton("lilBoy", tileWidth, tileHeight * 5, 'images/char-boy.png');
    this.btnHorns = new PlayerButton("Horns", tileWidth * 2, tileHeight * 5, 'images/char-horn-girl.png');
    this.btnPinky = new PlayerButton("Pinky", tileWidth * 3, tileHeight * 5, 'images/char-pink-girl.png');
    this.btnPrin = new PlayerButton("Prin", tileWidth * 4, tileHeight * 5, 'images/char-princess-girl.png');

    this.allPlayerBtns = [this.btnCatGirl, this.btnLilBoy, this.btnHorns, this.btnPinky, this.btnPrin];

}

StartBoard.prototype = Object.create(UIObject.prototype);
StartBoard.prototype.constructor = StartBoard;

StartBoard.prototype.render = function() {

	// renders the player picker when lives are <= 0
    if (scoreboard.lives <= 0 || scoreboard.gameStatus === 'new') {
    	ctx.fillStyle = "red";
		ctx.fillRect(0, tileHeight*3, cWidth, tileHeight*2);
		
		var fontSize = 20;
	    ctx.fillStyle = 'white';
	    ctx.textAlign = "center";
	    ctx.font = fontSize + "pt Impact";

	    if (scoreboard.gameStatus != 'new') {
	    ctx.fillText(scoreboard.gameOverText[0], hCenter, (tileHeight*3)+tileHeight/2);
	    ctx.fillText(scoreboard.gameOverText[1], hCenter, (tileHeight*3)+(tileHeight/2)+fontSize*1.5);
	    ctx.fillText("Previous Score: " + scoreboard.score, hCenter, (tileHeight*3)+(tileHeight/2)+fontSize*4.5);
	    } else {
	    	ctx.fillText(this.NEW_GAME_TEXT[0], hCenter, (tileHeight*3)+tileHeight/2);
	    	ctx.fillText(this.NEW_GAME_TEXT[1], hCenter, (tileHeight*3)+(tileHeight/2)+fontSize*1.5);
	    	ctx.fillText(this.NEW_GAME_TEXT[2], hCenter, (tileHeight*3)+(tileHeight/2)+fontSize*3);
	    	ctx.fillText(this.NEW_GAME_TEXT[3], hCenter, (tileHeight*3)+(tileHeight/2)+fontSize*4.5);
	    }


        this.allPlayerBtns.forEach(function(button) {
            button.render();
        });
    }
}

StartBoard.prototype.update = function() {
    // update the player based on which character is picked. 
    this.allPlayerBtns.forEach(function(button) {
        button.update();
    });
}

var PlayerButton = function(text, x, y, spriteImage) {
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
    var textX = this.x + (this.width / 2) /*+ (textSize.width / 2)*/ ;
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
        if (!_.isUndefined(this.handler)) {
            this.handler();
        }
    }
}

PlayerButton.prototype.handler = function() {
    newPlayer(this.text);
    scoreboard = new ScoreBoard();
    scoreboard.gameStatus = "tryAgain";
}
