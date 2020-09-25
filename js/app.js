// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    if (this.x > 505) {
      this.x = -83;
      this.speed = Math.floor((Math.random() * 200) + 100);
    }

    // Handle collision with the Player
    if(player.x + 80 > this.x &&
      player.x < this.x + 80 &&
      player.y < this.y + 60 &&
      player.y + 60 > this.y) {
        player.x = 202;
        player.y = 405;
        score = 0;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

var newDiv = document.createElement('div');
var canvas = document.getElementsByTagName('canvas');
var timer = false;

Player.prototype.update = function(dt) {

  if(!timer) {
    if (this.y <= 0) {
      timer = setTimeout(function() {
        player.x = 202;
        player.y = 405;
        score += 10;
        timer = false;
      }, 250);
    }
  }
  newDiv.innerHTML = 'Score: ' + score;
  document.body.insertBefore(newDiv, canvas[0]);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
  if (keyPressed == 'left') {
    if (this.x - 101 >= 0) {
      this.x -= 101;
    }
  }
  else if (keyPressed == 'up') {
    if (this.y - 83 >= -10) {
      this.y -= 83;
    }
  }
  else if (keyPressed == 'right') {
    if (this.x + 101 < 505) {
      this.x += 101;
    }
  }
  else if (keyPressed == 'down') {
    if (this.y + 83 < 488) {
      this.y += 83;
    }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202, 405);
var score = 0;

allEnemies.push(new Enemy(-83, 62, Math.floor((Math.random() * 200) + 100)));
allEnemies.push(new Enemy(-83, 145, Math.floor((Math.random() * 200) + 100)));
allEnemies.push(new Enemy(-83, 228, Math.floor((Math.random() * 200) + 100)));

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
