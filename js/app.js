// variables scoped to app.js and used throughout the script.
/**
 * @var {number} hCenter This is the horizontal center of the canvas.
 * @var {number} vCenter This is the vertical center of the canvas.
 * @var {number} cWidth         - This is the canvas width.
 * @var {number} cHeight        - This is the canvas height.
 * @var {number} tileWidth      - This is the width of an individual tile.
 * @var {number} tileHeight     - This is the height of an individual tile (after the overlap). 
 * @var {number} startingLives  - This is the number of lives that is given to a player at the start of a game. 
 * @var {number} scoreIncrement - This is the number of points a player gets for reaching the water tile. 
 * @var {number} enemyCount     - This is the number of enemies that are being tracked going across the screen. 
 */
var hCenter, vCenter, cWidth, cHeight, tileWidth, tileHeight, startingLives, scoreIncrement, enemyCount;

/**
 * This is a helper function called once when the app is loaded to set all the variables that get used throughout
 * the app. 
 * 
 * @return {n/a} this function does not return any values. 
 */
function configApp() {
    if (typeof canvas === 'undefined') {
        cWidth = 505
    } else {
        cWidth = canvas.width
    };
    if (typeof canvas === 'undefined') {
        cHeight = 606
    } else {
        cHeight = canvas.height
    };
    hCenter = cWidth / 2;
    vCenter = cHeight / 2;
    tileWidth = 101;
    tileHeight = 83;
    scoreIncrement = 100;
    startingLives = 5;
    enemyCount = 3;
}

/**
 * A random integer generator.
 * @source http://mzl.la/149Uul9
 * @param  {number} min the minimum number that should be inluded in the result returned.
 * @param  {number} max the max number that the integer is based off of.  Since I'm using Math.floor
 *                      it will actually return a number one less than max.
 * @return {number}     this is the random number that is generated.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * This is a helper function.  It takes an x and y value (cooardinates on the canvas) and returns
 * a grid location based on tiles.
 * @param  {number} x horizontal coordinate on the board.
 * @param  {number} y vertical coordinate on the board.
 * @return {Array.<number>}   Location on grid counting each tile as a position with the upper
 *                                     most left position on the grid being 0,0 increasing as
 *                                     you move out from there.
 */
function getBoardLoc(x, y) {
    var myBoardLoc = [];

    myBoardLoc.push(Math.ceil((x) / tileWidth));
    myBoardLoc.push(Math.ceil((y) / tileHeight));

    return myBoardLoc;

}

/**
 * Class ScoreBoard: Keeps track of the game, lives and score. New games start out with
 * five lives.  Each time a collision occurs a player loses a life.  New games start out
 * a score of zero.  Each time the player reaches the water the score is incremented and
 * that value is tracked here on the scoreboard.
 *
 * @class ScoreBoard
 * @classdesc A generic scoreboard
 * @property {string} LIVES_TEXT        - A constant value for the scoreboard text to display for keeping track of lives.
 * @property {string} GAME_SCORE_TEXT   - A constant value for the scoreboard text to display for keeping track of the score.
 * @property {number} score             - The current value of the game score.
 * @property {number} lives             - the current number of lives remaining in the game.
 * @property {number} textX             - tracks the x axis for the text displayed on the scoreboard.
 * @property {number} textY             - tracks the y axis for the text displayed on the scoreboard.
 * @property {number} rectX             - tracks the x axis for the rectangle that clears the text and provides a background.
 * @property {number} rectY             - tracks the y axis for the rectangle that clears the text and provides a background.
 * @property {number} rectHeight        - the height of the rectangle that gets drawn.
 * @property {number} rectWidth         - the width of the rectangle that gets drawn.
 * @constructor
 */
var ScoreBoard = function() {
    this.LIVES_TEXT = "Lives: ";
    this.GAME_SCORE_TEXT = " Score: ";
    this.gameOverText = ["GAME OVER!!!", "Press the 'R' key", "to", "start the game over"];
    this.score = 0;
    this.lives = startingLives;
    this.textX = 0;
    this.textY = 40;
    this.rectX = 0;
    this.rectY = -5;
    this.rectHeight = 50;
    this.rectWidth = cWidth;
}

/*
 * Operates on an instance of ScoreBoard and renders the scoreboard to the screen.
 * This method is used to draw the scoreboard on the screen.
 * @property {string} font          - The font that the text will be rendered in.
 * @property {string} textAlign     - Alignment of the text.
 * @property {string} strokeStyle   - Style of the stroke around the text.
 * @property {int} line             - Size of the line which makes up the stroke.
 * @property {string} fillStyle     - Color of the fill on the canvas. Used for both the fillRect and fillText methods.
 *
 * @return {n/a} this method does not return any values.
 */
ScoreBoard.prototype.render = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "left";
    ctx.strokeStyle = 'black';
    ctx.line = 3;
    ctx.fillStyle = 'white';

    if (this.lives >= 0) {
        ctx.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
        ctx.fillText(this.LIVES_TEXT + this.lives + this.GAME_SCORE_TEXT + this.score, this.textX, this.textY);
        ctx.strokeText(this.LIVES_TEXT + this.lives + this.GAME_SCORE_TEXT + this.score, this.textX, this.textY);
    } else {
        ctx.fillStyle = 'rgba(255,221,50,.50)'
        ctx.fillRect(102, 133, 300, 250);
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";
        ctx.font = "26pt Impact";
        ctx.fillText(this.gameOverText[1], hCenter, 200);
        ctx.strokeText(this.gameOverText[1], hCenter, 200);
        ctx.fillText(this.gameOverText[2], hCenter, 250);
        ctx.strokeText(this.gameOverText[2], hCenter, 250);
        ctx.fillText(this.gameOverText[3], hCenter, 300);
        ctx.strokeText(this.gameOverText[3], hCenter, 300);

        ctx.font = "36pt Impact";
        ctx.fillText(this.gameOverText[0], hCenter, 40);
        ctx.strokeText(this.gameOverText[0], hCenter, 40);
    }


}

/**
 * Operates on an instance of the ScoreBoard object and updates the properties associated with that instance of the object.
 * @param  {number} dt datetime offset that ensures all computers run the game at the same speed.
 * @return {n/a}    this method does not return any values.
 */
ScoreBoard.prototype.update = function(dt) {

    /**
     * determines if the game has ended. If it has (lives <= zero) this updates the rendering of the scoreboard to drop
     * it down onto the center of the screen and then display game over at the top once it has reached the middle of the
     * screen.
     * @param  {number} this.lives > 0  from the instance of the scoreboard that has been created for this game.
     */
    if (this.lives > 0) {
        //do nothing - no need to update the render values. 

    } else if (this.lives === 0) {

        this.rectY = this.rectY + (50 * dt);
        this.textY = this.textY + (50 * dt);

        // move the lives / score half way down the screen then stop.    
        if (this.rectY >= vCenter) {
            this.lives = -1;
        }

    } else {

        // do nothing

    }
}

/*
 * Operates on an instance of ScoreBoard and it increments the score by
 * 100 each time it is called.
 * @return {n/a} this method does not return any values.
 */
ScoreBoard.prototype.increment = function() {
    this.score = this.score + scoreIncrement;
}

/*
 * Operates on an instance of ScoreBoard and it decrements the lives by
 * 1 each time it is called.
 * @return {n/a} this mothod does not return any values.
 */
ScoreBoard.prototype.decrement = function() {
    this.lives = --this.lives;
}

/**
 * Class Enemy: This is the Enemy class.  Our player must avoid Enemies or else they lose a life.
 * The job of the Enemy is to move at a random speed from left to right across the screen and collide
 * with the player in order to end the game.
 *
 * @class Enemy
 * @classdesc A generic enemy.
 * @property {Array.<number>} spawnRange    - An array with three values.  The first is low end of the range the last
 *                                          is the high end of the range.  These determine where on the map the enemy
 *                                          can respawn when it moves from left to right and moves off the screen. This
 *                                          is used as the Y value on the canvas where the enemy comes back on the left.
 * @property {Array.<number>} speedRange    - This stores the range of values that an enemy can use as it's speed for moving from left
 *                                          to right across the screen.
 * @property {int} x                        - The current horizontal value on the canvas (the x coordinate).
 * @property {int} y                        - The current vertical value on the canvas (the y coordinate).
 * @property {Array.<number>} boardLoc      - The current location on the grid where the Enemy is. Stores a location of the tile on
 *                                          the map where the enemy currently is.  The map grid starts with the upper left most tile being
 *                                          at position zero, zero (0,0).
 * @property {int} speed                    - The current speed of an enemy as they move from left to right across the screen.
 * @property {string} sprite                - The path to the image of this Enemy.
 * @constructor
 */
var Enemy = function() {
    this.spawnRange = [60, 140, 220];
    this.speedRange = [40, 500];
    this.x = 0;
    this.y = this.spawnRange[getRandomInt(0, 2)];
    this.boardLoc = getBoardLoc(this.x, this.y);
    this.speed = getRandomInt(this.speedRange[0], this.speedRange[1]);
    this.sprite = 'images/enemy-bug.png';

}

/**
 * Operates on an instance of Enemy object and updates and properties associated with that instnace.
 *
 * @param {number}  dt  The dt parameter will ensure the game runs at the same speed for all computers.
 *
 * @return {n/a} this method does not return any values.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by t
    if (this.x < cWidth) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -50;
        this.y = this.spawnRange[getRandomInt(0, 3)];
        this.speed = getRandomInt(this.speedRange[0], this.speedRange[1]);
    }
    this.boardLoc = getBoardLoc(this.x, this.y);
}

/**
 * Operates on an instance of the Enemy object and renders that instance on the screen.
 * @return {n/a}    - This method does not return any values.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/**
 * Class Player: This is the Player class.  Our player must avoid Enemies or else they lose a life.
 * The job of the Player is to move around the board avoiding enemies and making it to the water tiles
 * where they will earn points and respawn back at the grass tiles.
 *
 * @class Player
 * @classdesc A generic player.
 * @property {Array.<number>} respawnLoc    - An array that stores the x and y coordinates of where the player will respawn after
 *                                          reaching the water tiles.
 * @property {number} VERTICAL_HOPS         - The vertical pixels this player can jump when moving up or down
 * @property {number} HORIZONTAL_HOPS       - The horizontal pixels this player can jump when moving left or right
 * @property {int} x                        - The current horizontal value on the canvas (the x coordinate).
 * @property {int} y                        - The current vertical value on the canvas (the y coordinate).
 * @property {Array.<number>} boardLoc      - The current location on the grid where the Player is. Stores a location of the tile on
 *                                          the map where the player currently is.  The map grid starts with the upper left most tile being
 *                                          at position zero, zero (0,0).
 * @property {string} sprite                - The path to the image of this player.
 * @constructor
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.respawnLoc = [200, 380];

    this.x = this.respawnLoc[0];
    this.y = this.respawnLoc[1];

    this.VERTICAL_HOPS = 81;
    this.HORIZONTAL_HOPS = 100;
    this.boardLoc = getBoardLoc(this.x, this.y);
}

/**
 * Operates on an instance of Player object and updates and properties associated with that instnace.
 *
 * @param {number}  dt  The dt parameter will ensure the game runs at the same speed for all computers.
 *
 * @return {n/a} this method does not return any values.
 */
Player.prototype.update = function(dt) {
    this.boardLoc = getBoardLoc(this.x, this.y);
}

/**
 * Operates on an instance of the Player object and renders that instance to the screen.
 * @return {n/a} - this method does not return any values.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/**
 * Operates on an instance of the Player object and moves the player to the respawn location defined
 * in the Player object.
 * @return {n/a} - This method does not return any values.
 */
Player.prototype.respawn = function() {
    this.x = this.respawnLoc[0];
    this.y = this.respawnLoc[1];
    scoreboard.decrement();
}

/**
 * Operates on an instace of the Player object and calls the scoreboard's increment method (to
 * increase the score) and then moves the player back to the grass tile in the same horizontal
 * position that they are currently in.  This method is called when a player reaches one of the
 * water tiles.
 * @return {n/a} - this method does not return any values.
 */
Player.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment();

}

/**
 * Operates on an instance of of the Player object and takes action based on the key that was
 * pressed on the keyboard as input.
 * @param  {string} input - passed from the keyup event to incidate which key was pressed.
 * @return {n/a}       [description]
 */
Player.prototype.handleInput = function(input) {
    //todo: need to figure out how to not make these values hard coded as limits. 
    console.log(input);
    console.log(scoreboard.lives);
    console.log(scoreboard.lives < 0);
    if (scoreboard.lives > 0) {
        switch (input) {
            case 'up':
                if (this.y > 57) { // anything less than 57 pixels means the player has made it to the water tile.
                    this.y = this.y - this.VERTICAL_HOPS;
                } else {
                    player.achievement();
                }
                break;
            case 'down':
                if (this.y < this.respawnLoc[1]) {
                    this.y = this.y + this.VERTICAL_HOPS;
                } else { /* do nothing - cannot move below the bottom tile. */ }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x = this.x - this.HORIZONTAL_HOPS;
                } else { /* do nothing - cannot move past the left tile. */ }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x = this.x + this.HORIZONTAL_HOPS;
                } else { /* do nothing - cannot move past the right tile. */ }
                break;


        }
    } else {
        if (input === 'reset') {
            player = new Player();
            scoreboard = new ScoreBoard();
        } else { /* do nothing - cannot move until game has been reset. */ }

    }
}

/**
 * Instantiate the objects in the game. All enemy objects are placed in an array called allEnemies.
 * The player object is placed into a variable called player.  This is per the inscructions given
 * for this project.
 */
configApp();
var allEnemies = [];
for (i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();
var scoreboard = new ScoreBoard();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'reset',
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
