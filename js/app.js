const numOfE = document.getElementById('numOfE');
const pButton = document.getElementById('pButton');
const sButton = document.getElementById('sButton');
const numOfELabel = document.querySelector('.numOfELabel');
const rsButton = document.querySelector('.rsButton');
const winCount = document.querySelector('.winCount');
let pause = false;
let allEnemies = []; //Enemies Array
let eCount = numOfE.value; 

pButton.onclick = function () { //when the button pause is pressed
    pause = true;
}

numOfE.oninput = function () { //This function resets the enemies array and populates it with the new number of enemies on input
    if (eCount > 10) {
        numOfELabel.textContent = 'A number between 1 and 10';
    } else {
        allEnemies = [];
        eCount = numOfE.value;
        numOfELabel.textContent = 'Number of Enemies';
        createEnemies(eCount);
    }
}

var Enemy = function() { //Our enemies constructor function
    this.x = -101; // x pos
    this.rows = [0, 83, 166]; //An array with possible rows values
    this.y = this.rows[Math.floor(Math.random() * this.rows.length)] + 60; // gives us a random row!
    this.sprite = 'images/enemy-bug.png';// The image/sprite for our enemies
    this.movHorizontal = 101; // the with of a column that defines the distance of the playground
    this.speed = Math.floor(Math.random()*500 + 75); //The distance to travel per frame in pixels
};

Enemy.prototype.update = function(dt) { //update the enemies position
    if (this.x < this.movHorizontal * 5) { //This sets the boundaries for the enemy
        this.x += this.speed * dt //Distance to travel times timedelta
    } else {
        this.x = -this.movHorizontal;
    }
};

Enemy.prototype.render = function() { //This draws the enemy on screen.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player { //Our player
    constructor () {
        this.sprite = 'images/char-boy.png';
        this.movHorizontal = 101; // this should be the size of one step, because this is also the width of a collumn
        this.movVertical = 83; // same rules apply here.
        this.startX = this.movHorizontal*2;
        this.startY = this.movVertical*4 + 60; // this moves player more to the center of the square
        this.x = this.startX; // the starting position
        this.y = this.startY;
        this.victory = 0;
    }
    render () { //Draw our player on screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y) 
    }
    update () { // Update position and check for collision and win
        for (const enemy of allEnemies) { //loop though the array of enemies
            if(this.y === enemy.y && this.x > enemy.x - 20 && this.x < enemy.x + 50){ //This sets the space in whick collison will occur.
                this.resetPos(); 
            }
        }
        if (this.y === -23) { // Win condition shall be met when the player reaches the water
            this.victory++;
            winCount.textContent = `You've reached the water ${this.victory} times`;
            this.resetPos();
        }
    }
    handleInput (input) { //implement keyboard input and resulting movement
        switch (input) {
            case 'left':
                if (this.x > 0) {
                   this.x -= this.movHorizontal;
                }
                break;
            case  'up':
                if (this.y > 0) { //Since the palyer shoud reach the water, we have to set the boundary here.
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
    resetPos() {
        this.y = this.startY;
        this.x = this.startX;
    }
}

const player = new Player(); //instantiate the player

function createEnemies (num) { //create enemies function
    for (let i = 0; i < num; i++) {
        allEnemies[i] = new Enemy();
    }
}

createEnemies(eCount); // create enemies for the first time (on loading)

document.addEventListener('keyup', function(e) { //List of key presses
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (pause === false) { //Prevents input when in pause
        player.handleInput(allowedKeys[e.keyCode]);  
    }
});