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
    scoreboard.increment(100);

}

/**
 * Operates on an instance of of the Player object and takes action based on the key that was
 * pressed on the keyboard as input.
 * @param  {string} input - passed from the keyup event to incidate which key was pressed.
 * @return {n/a}       [description]
 */
Player.prototype.handleInput = function(e) {

    console.log(e);    

    var input
    , allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'reset',
    };

    input = allowedKeys[e.keyCode];


    if (scoreboard.lives > 0) {
        switch (input) {
            case 'up':
                e.preventDefault();
                if (this.y > this.VERTICAL_HOPS) { // anything less than 57 pixels means the player has made it to the water tile.
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
    } else { /* do nothing */ }
}


/**
 * CatGirl Class --> Derives from Player.
 * CatGirl can move two spaces on the board vertically as her 'special power'
 * CatGirl also only gets half the points for an achievement.
 * For Method explanation see Player
 */
var CatGirl = function() {
    Player.call(this);
    this.sprite = 'images/char-cat-girl.png';

    this.VERTICAL_HOPS = 81*2;
    this.HORIZONTAL_HOPS = 100;
}

// inheritence
CatGirl.prototype = Object.create(Player.prototype);
// creates it's own constructor (as opposed to using the Player constructor)
CatGirl.prototype.constructor = CatGirl;

// see Player for general terms
CatGirl.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment(50);
}

/**
 * LilBoy Class --> Derives from Player. *
 * For Method explanation see Player
 */
var LilBoy = function() {
    Player.call(this);
    this.sprite = 'images/char-boy.png';

    this.VERTICAL_HOPS = 81;
    this.HORIZONTAL_HOPS = 100;
}

LilBoy.prototype = Object.create(Player.prototype);
LilBoy.prototype.constructor = LilBoy;

LilBoy.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment(100);
}

/**
 * Horns Class --> Derives from Player.
 * Horns can move two spaces on the board horizontally as her 'special power'
 * Horns also only gets half the points for an achievement.
 * For Method explanation see Player
 */
var Horns = function() {
    Player.call(this);
    this.sprite = 'images/char-horn-girl.png';

    this.VERTICAL_HOPS = 81;
    this.HORIZONTAL_HOPS = 200;
}

Horns.prototype = Object.create(Player.prototype);
Horns.prototype.constructor = Horns;

Horns.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment(100);
}

/**
 * Pinky Class --> Derives from Player.
 * Pinky can move 1/4 spaces on the board vertically as her 'special power'
 * Pinky also gets twice the points for an achievement.
 * For Method explanation see Player
 */
var Pinky = function() {
    Player.call(this);
    this.sprite = 'images/char-pink-girl.png';

    this.VERTICAL_HOPS = 81/4;
    this.HORIZONTAL_HOPS = 100;
}

Pinky.prototype = Object.create(Player.prototype);
Pinky.prototype.constructor = Pinky;

Pinky.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment(300);
}

/**
 * Prin Class --> Derives from Player.
 * Prin can move 3 spaces on the board vertically as her 'special power'
 * Prin also only gets 1/3 the points for an achievement.
 * For Method explanation see Player
 */
var Prin = function() {
    Player.call(this);
    this.sprite = 'images/char-princess-girl.png';

    this.VERTICAL_HOPS = 81*3;
    this.HORIZONTAL_HOPS = 100;
}

Prin.prototype = Object.create(Player.prototype);
Prin.prototype.constructor = Prin;

Prin.prototype.achievement = function() {
    this.y = this.respawnLoc[1];
    scoreboard.increment(33);
}