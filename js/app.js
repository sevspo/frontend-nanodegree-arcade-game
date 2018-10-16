// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x; // x pos
    this.y = y + 60; // y pos
    this.sprite = 'images/enemy-bug.png';
    this.movHorizontal = 101; // the with of a column that defines the distance of the playground
    this.speed = speed;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy has not reached boundary
    if (this.x < this.movHorizontal * 5) {
        this.x += this.speed * dt //I don't understand why not this.dt
    } else {
        this.x = -this.movHorizontal;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor () {
        this.sprite = 'images/char-boy.png';
        this.movHorizontal = 101; // this should be the size of one step, because this is also the width of a collumn
        this.movVertical = 83; // same rules apply here.
        this.startX = this.movHorizontal*2;
        this.startY = this.movVertical*4 + 60; // - (this.movVertical/3); // this moves player more to the center of the square
        this.x = this.startX; // so here the starting position
        this.y = this.startY;
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y) 
    }
    update () { // Update position and check for collision and win
        for (const enemy of allEnemies) {
            if(this.y === enemy.y && this.x > enemy.x - 20 && this.x < enemy.x + 50){
                this.reset();
            }
        }
        if (this.y === -23) {
            this.reset();
            
        }
    }
    handleInput (input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.movHorizontal;
                }
                break;
            case  'up':
                if (this.y > 0) {
                    this.y -= this.movVertical;
                }
                break;
            case 'right':
                if (this.x < this.movHorizontal*4) {
                    this.x += this.movHorizontal;
                }
                break;
            case 'down':
                if (this.y < this.movVertical*4) {
                    this.y += this.movVertical;
                }
                break;
        }
    }
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const bug1 = new Enemy(-101, 0, 250);
const bug2 = new Enemy(-101, 83, 320);
const bug3 = new Enemy(-101, 166, 150);
const bug4 = new Enemy(-101, 166, 220);

const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);


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