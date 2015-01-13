
/**
 * This is a generic user interface object that is used to have other objects derive from it's collision detection methods
 */
var UIObject = function() {
    //console.log("in UIObject");
}

/**
 * Detects when the mouse is colliding with an object on the screen.
 * @param  {object} obj   this is the button or rectangle or other object that was derived from this class that we are checking
 *                        for a collision (or interesection) with.
 * @param  {object} mouse tracks the mouse object (the pointer) position and if the mouse has been clicked or not. 
 * @var {number} t the tolerance limit in pixesl (so if the mouse is w/in 5 pixes for example count it as an intersection).
 * @var {boolean} xintersect checks for intersection along the horizontal plane     
 * @var {boolean} yintersect checks for intersection along the vertical plane
 * @return {boolean}       Returns true if the mouse is over a particular object w/in a given tollerence.   
 */
UIObject.prototype.intersects = function(obj, mouse) {
    // console.log("in intersects");
    var t = 5; // this is the tolerance limit.
    var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width; // is the mouse's x value between the objects x + width value (given a tollerance)
    var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height; // is the mouse's y value between the objects y + height value (given a tollerance)
    
    return xIntersect && yIntersect;
}

/**
 * This function is called on each render and it calls the intersect function and does something based on clicking or overing when there is an intersection.
 * @return {n/a} this function does not return any values it simply sets properties and those properties are used to render and / or do other things. 
 */
UIObject.prototype.updateStats = function() {
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

/**
 * StartBoard is a class that inherits from the UIObject Class.  
 * This Class is used to store information about staarting the game.  It also instantiates other objects that inherit from the UIObject
 * Class.  Specifically the buttons that are used to draw the characters. 
 *
 * @constant {Array, string} NEW_GAME_TEXT stores the text to be rendered out when the player starts a new game. 
 * @property {PlayerButton} btnCatGirl the catGirl Button object.
 * @property {PlayerButton} btnLilBoy the btnLilBoy Button object.
 * @property {PlayerButton} btnHorns the btnHorns Button object.
 * @property {PlayerButton} btnPinky the btnPinky Button object.
 * @property {PlayerButton} btnPrin  the btnPrin Button object.
 * @property {array,PlayerButton} allPlayerBtns an array that holds all the player buttons to later be iterated through. 
 */

var StartBoard = function() {    
    this.NEW_GAME_TEXT = ["Click on a player below to start the game.", "Your objective is to navigate the player"," to the water with out getting hit"," by a passing bug!"]
    this.btnCatGirl = new PlayerButton("CatGirl", 0, tileHeight * 5, 'images/char-cat-girl.png');
    this.btnLilBoy = new PlayerButton("lilBoy", tileWidth, tileHeight * 5, 'images/char-boy.png');
    this.btnHorns = new PlayerButton("Horns", tileWidth * 2, tileHeight * 5, 'images/char-horn-girl.png');
    this.btnPinky = new PlayerButton("Pinky", tileWidth * 3, tileHeight * 5, 'images/char-pink-girl.png');
    this.btnPrin = new PlayerButton("Prin", tileWidth * 4, tileHeight * 5, 'images/char-princess-girl.png');

    this.allPlayerBtns = [this.btnCatGirl, this.btnLilBoy, this.btnHorns, this.btnPinky, this.btnPrin];

}

// inherits from the UIObject
StartBoard.prototype = Object.create(UIObject.prototype);
// creates it's own conscructor
StartBoard.prototype.constructor = StartBoard;

/**
 * This method handels all the rendering of the startBoard.
 * @return {n/a} this method does not return anything it just renders the start board. 
 */
StartBoard.prototype.render = function() {	
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

/**
 * this method calls the update function for each button that has been rendered which 
 * in turn calls and listens for any intersects or clicks on each of the objects.
 * @return {[type]} [description]
 */
StartBoard.prototype.update = function() {
    // update the player based on which character is picked. 
    this.allPlayerBtns.forEach(function(button) {
        button.update();
    });
}

/**
 * This creates a player button, a class that inherits from the UIObject. The player button is
 * used to provide a UI object for the user to interact with in selecting a player for the game. 
 * @param {string} text        text to be rendered on the button.
 * @param {number} x           x coordinate where the button is to be drawn
 * @param {number} y           y coordinate where the button is to be drawn
 * @param {string} spriteImage path to the image of the sprite associated with this button. 
 */
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

// inherits from UIObject
PlayerButton.prototype = Object.create(UIObject.prototype);
// creates a constructor specific to the PlayerButton class and not the UIObject class
PlayerButton.prototype.constructor = PlayerButton;

/**
 * This method renders the button with two different background colors depending on if the 
 * user is hovering the mouse over that button or not. 
 * @return {n/a} this method does not return any values it just sets properties and renders the button.
 */
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

/**
 * this method watches the click actions of the mouse and updates the status
 * of the object.  If the click event happens in the coordinates of this button
 * it fires the handler method. 
 * @return {n/a} this method does not return any value but does call the handler
 *                    if a click event occurs. 
 */
PlayerButton.prototype.update = function() {
    var wasNotClicked = !this.clicked;
    this.updateStats();

    if (this.clicked && wasNotClicked) {
        if (!_.isUndefined(this.handler)) {
            this.handler();
        }
    }
}

/**
 * this method fires when a click event has occured for as specific button.
 * once it fires it resets the player in the game and scoreboard and sets the 
 * game's status to a retry game (vs. a new game).
 * @return {n/a} this method does not return any values. 
 */
PlayerButton.prototype.handler = function() {
    newPlayer(this.text);
    scoreboard = new ScoreBoard();
    scoreboard.gameStatus = "tryAgain";
}
