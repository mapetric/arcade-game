let lives = 5;
let gemsCarried = 0;
let gemsDeposited = 0;
let enemies = 5;
let gemsPickedUp = 0;
let listening = true;

const $lives = $('#lives').children().first();
const $gemsCarried = $('#gemsCarried').children().first();
const $gemsDeposited = $('#gemsDeposited').children().first();
const $enemies = $('#enemies').children().first();
const $modal = $('#myModal');

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

    this.x = this.x + dt * this.speed;
    if (this.x > 520) {
          this.x = -100;
   }
   this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Gem = function(x, y, z) {
      this.sprite = ['images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png'][z];
      this.value = [1, 2, 3][z];
      this.x = x;
      this.y = y;
};

function getRandomGem() {
      let gemIndex = Math.floor(Math.random() * 100  + 1);
      if (gemIndex > 95) {
            gemIndex = 2;
      } else if (gemIndex > 80) {
            gemIndex = 1;
      } else {
            gemIndex = 0;
      }
      return gemIndex;
}

Gem.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.checkPickup = function() {
      if (player.y + 131 >= this.y + 90 && player.x + 25 <= this.x + 88 && player.y + 73 <= this.y + 135 && player.x + 76 >= this.x + 11) {
            console.log('pickup');
            gemsPickedUp++;
            gemsCarried += gem.value;
            $gemsCarried.text(gemsCarried);
            gem = new Gem(101 * Math.floor(Math.random() * 5), 400 - 83 * (Math.floor(Math.random() * 3) + 2) , getRandomGem());
            if (gemsPickedUp % 3 === 0){
                  allEnemies.push(new Enemy(0, Math.random() * 184 + 50, Math.random() * 300));
                  enemies++;
                  $enemies.text(enemies);
            }
      }
}

var Player = function(x, y) {
      this.sprite = 'images/char-boy.png';
      this.x = x;
      this.y = y;
};


Enemy.prototype.checkCollision = function() {
      if (player.y + 131 >= this.y + 90 && player.x + 25 <= this.x + 88 && player.y + 73 <= this.y + 135 && player.x + 76 >= this.x + 11) {
            console.log('collided');
            player.x = 202;
            player.y = 400;
            lives--;
            $lives.text(lives);
            if (lives === 0) {
                  end()
            }
            gemsCarried -= 3;
            if (gemsCarried < 0) {
                  gemsCarried = 0;
            }
            $gemsCarried.text(gemsCarried);
      }
};



Player.prototype.update = function() {
      if (this.x > 400) {
            this.x = 400;
      }
      if (this.x < 0) {
            this.x = 0;
      }
      if (this.y > 400) {
            this.y = 400;
      }
      if (this.y < -80) {
            this.y = -15;
      }
      if (this.y < 60) {
            player.x = 202;
            player.y = 400;
            gemsDeposited += gemsCarried;
            if (gemsCarried > 5) {
                  lives++;
            }
            gemsCarried = 0;
            $gemsCarried.text(gemsCarried);
            $gemsDeposited.text(gemsDeposited);
            $lives.text(lives);
      };
      gem.checkPickup();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPressed) {
      switch (keyPressed) {
            case 'left':
                  this.x -= 101;
                  break
            case 'right':
                  this.x += 101;
                  break;
            case 'up':
                  this.y -= 83;
                  break;
            case 'down':
                  this.y += 83;
      }
}

function restart() {
      listening = true;
      $modal.css('display', 'none');
      allEnemies = [];
      lives = 5;
      enemies = 5;
      gemsCarried = 0;
      gemsDeposited = 0;
      gemsPickedUp = 0;
      $enemies.text(enemies);
      $gemsCarried.text(gemsCarried);
      $gemsDeposited.text(gemsDeposited);
      $lives.text(lives);
      var player = new Player(202, 400);
      let gem = new Gem(101 * Math.floor(Math.random() * 5), 400 - 83 * (Math.floor(Math.random() * 3) + 2) , getRandomGem());
      for (let i = 0; i < 5; i++) {
            allEnemies.push(new Enemy(0, Math.random() * 184 + 50, Math.random() * 200 + 100));
      }
}

function end() {
      populateModal();
      listening = false;
      $modal.css('display', 'block');
      $('.close').click(function (){
            restart();
      });
}

function populateModal() {
      $('#modal-text').children().first().text(gemsDeposited);
      $('#modal-text').children().next().text(enemies);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
var player = new Player(202, 400);
let gem = new Gem(101 * Math.floor(Math.random() * 5), 400 - 83 * (Math.floor(Math.random() * 3) + 2) , getRandomGem());
for (let i = 0; i < 5; i++) {
      allEnemies.push(new Enemy(0, Math.random() * 184 + 50, Math.random() * 200 + 100));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
      const allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };
      if (listening) {
            player.handleInput(allowedKeys[e.keyCode]);
      }
});
