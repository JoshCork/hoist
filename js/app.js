var ScoreBoard = function() {
    this.livesText = "Lives: "
    this.gameScoreText = " Score: "
    this.score = 0;
    this.lives = 5;

}

ScoreBoard.prototype.render = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "left";
    ctx.strokeStyle = 'black';
    ctx.line = 3;
    ctx.fillStyle = 'white';

    ctx.fillText(this.livesText + this.lives + this.gameScoreText + this.score, 0, 50);
    ctx.strokeText(this.livesText + this.lives + this.gameScoreText + this.score, 0, 50);
    //console.log("i've rendered the scoreboard");
}

ScoreBoard.prototype.update = function() {
    // update the scoreboard here. 
}

ScoreBoard.prototype.increment = function() {
    this.score = this.score + 100;
}

ScoreBoard.prototype.decrement = function() {
    this.lives = --this.lives;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.spawnRange = [60, 140, 220];
    this.speedRange = [40, 500];

    this.x = 0;
    this.y = this.spawnRange[getRandomInt(0, 2)];

    this.boardLoc = getBoardLoc(this.x, this.y);
    this.speed = getRandomInt(this.speedRange[0], this.speedRange[1]);


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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
