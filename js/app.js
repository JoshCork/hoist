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
 * @property {int} score                - The current value of the game score.
 * @property {int} lives                - the current number of lives remaining in the game.  
 * @constructor
 */
var ScoreBoard = function() {    
    this.LIVES_TEXT = "Lives: "
    this.GAME_SCORE_TEXT = " Score: "
    this.score = 0;
    this.lives = 5;
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
    

    ctx.fillRect(0,0,505,50);
    ctx.fillText(this.LIVES_TEXT + this.lives + this.GAME_SCORE_TEXT + this.score, 0, 50);
    ctx.strokeText(this.LIVES_TEXT + this.lives + this.GAME_SCORE_TEXT + this.score, 0, 50);
    //console.log("i've rendered the scoreboard");
}

/*
 * This is the increment method for the Scoreboard class.  It increments the score by
 * 100 each time it is called. 
 * @return {n/a} this method does not return any values.
 */
ScoreBoard.prototype.increment = function() {
    this.score = this.score + 100;
}

/*
 * This is the decrement method for the Scoreboard class.  It decrements the lives by
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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// This is the same as "move" in the OOJS class.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -50;
        this.y = this.spawnRange[getRandomInt(0, 3)];
        this.speed = getRandomInt(this.speedRange[0], this.speedRange[1]);
    }

    this.boardLoc = getBoardLoc(this.x, this.y);
    //console.log("EnemyLocation: " + this.boardLoc);
}

/*
 source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.respawnLoc = [200, 380];

    this.x = this.respawnLoc[0];
    this.y = this.respawnLoc[1];

    this.vHops = 81;
    this.hHops = 100;
    this.boardLoc = getBoardLoc(this.x, this.y);
    // generic class for a player.
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.boardLoc = getBoardLoc(this.x, this.y);
    //console.log("playerLocation: " + this.boardLoc);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.respawn = function() {
    if (scoreboard.lives > 0) {
        this.x = this.respawnLoc[0];
        this.y = this.respawnLoc[1];
        scoreboard.decrement();
    } else {
        // todo: call a function that ends the game
    }
}

Player.prototype.achievement = function() {
    this.y = 380;
    scoreboard.increment();

}

Player.prototype.handleInput = function(input) {
    //todo: need to figure out how to not make these values hard coded as limits. 
    switch (input) {
        case 'up':
            if (this.y > 57) {
                this.y = this.y - this.vHops;
            } else {
                player.achievement();
            }
            break;
        case 'down':
            if (this.y < 380) {
                this.y = this.y + this.vHops;
            } else { /* do nothing */ }
            break;
        case 'left':
            if (this.x > 0) {
                this.x = this.x - this.hHops;
            } else { /* do nothing */ }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + this.hHops;
            } else { /* do nothing */ }
            break;
    }


}

function getBoardLoc(x, y) {
    var myBoardLoc = [];

    myBoardLoc.push(Math.ceil((x) / 100));
    myBoardLoc.push(Math.ceil((y) / 81));

    return myBoardLoc;

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();
var scoreboard = new ScoreBoard();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
