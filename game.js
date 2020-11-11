const uInterval = 200;
class Game {
    constructor(player1, player2){
        this.states = ['selection', 'idle', 'preattack', 'attack', 'attacked', 'defeat', 'recovery'];
        this.currentState = this.states[1];
        this.player1 = player1
        this.player2 = player2
        this.character1 = player1.character
        this.character2 = player2.character
        this.acting;
        this.receiving;
        this.gameStateAnimations = {
            'acting': 0,
            'receiving': 0
        }
        this.canvas = document.querySelector('#background');
        this.context = this.canvas.getContext('2d');
        this.backgroundImage = new Image();
        this.backgroundLoaded = false;
        this.playersAlive = true;
        this.loadBackground();
        this.loadCharacters();
        this.pickStartingPlayer();       
    }
    loadBackground = () =>{
        this.backgroundImage.src = 'images/background.jpg';
        this.backgroundImage.onload = () => {
            this.backgroundLoaded = true;
            this.drawBackground();
        }
        this.drawHealthBar();
    }
    loadCharacters = () => {
        this.character1.initAnimations();
        this.character2.initAnimations();
    }
    drawBackground = () =>{
        this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    refreshFrame = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    cycle = () => {
        if(this.currentState == 'idle') {
            this.gameStateAnimations.acting = 0;
            this.gameStateAnimations.receiving = 0;
        } else if (this.currentState == 'preattack') {
            this.gameStateAnimations.acting = 0;
            this.gameStateAnimations.receiving = 0;
            console.log('pick move')
        } else if (this.currentState == 'attack') {
            let animationIndex = this.acting.moveToNum();
            if(this.receiving.receiveDamage(this.acting.turn(this.acting.moveChosen))) {
                this.acting.character.animations[animationIndex].animationEnded = false;
                this.gameStateAnimations.acting = animationIndex;
                this.gameStateAnimations.receiving = 0;
                setTimeout(() => {
                    this.enterState(4);
                }, (this.acting.character.animations[animationIndex].lastFrame / this.acting.character.animations[animationIndex].frameWidth) * uInterval);
            } else {
                this.acting.character.animations[animationIndex].animationEnded = false;
                this.gameStateAnimations.acting = animationIndex;
                this.gameStateAnimations.receiving = 0;
                setTimeout(() => {
                    this.enterState(6);
                }, (this.acting.character.animations[animationIndex].lastFrame / this.acting.character.animations[animationIndex].frameWidth) * uInterval);
            }
        } else if (this.currentState == 'attacked') {
            this.gameStateAnimations.acting = 0;
            this.gameStateAnimations.receiving = 5;
            this.drawHealthBar();
            setTimeout(() => {
                this.enterState(6);
            }, ((this.receiving.character.animations[5].lastFrame / this.receiving.character.animations[5].frameWidth) * uInterval) + 2000);
        } else if (this.currentState == 'recovery') {
            this.gameStateAnimations.acting = 0;
            this.gameStateAnimations.receiving = 0;
            let temp = this.acting;
            this.acting = this.receiving;
            this.receiving = temp;
            setTimeout(() => {
                console.log('recovered')
                this.enterState(1);
            }, 2000)
        } else if (this.currentState == 'defeat') {
            this.gameStateAnimations.acting = 0;
            this.gameStateAnimations.receiving = 5;
        }
    }
    enterState = (state) => {
        this.currentState = this.states[state];
        this.cycle();
    }
    pickStartingPlayer = () => {
        let num = Math.ceil(Math.random() * 2)
        this.acting = this[`player${num}`];
        if (num == 1) {
            this.receiving = this.player2;
        } else {
            this.receiving = this.player1;
        }
    }
    drawHealthBar = () => {
        context3.clearRect(0,0,display.width, display.height)
        drawHealthbar(display, 18,10,200,20,(player1.stats.health/player1.stats.initHealth)*100,100);
        drawHealthbar(display, 500,10,200,20,(player2.stats.health/player2.stats.initHealth)*100,100);
    }
}
class Character {
    constructor(characterName, moves, stats, spriteInfo, playerNum) {
        this.characterName = characterName;
        this.stats = stats;
        this.sprite = new Image();
        this.loaded = false;
        this.moves = moves;
        this.spriteInfo = spriteInfo;
        this.canvas = document.querySelector(`#player${playerNum}`);
        this.context = this.canvas.getContext('2d');
        if(playerNum == 2) {
            this.context.translate(this.canvas.width, 0);
            this.context.scale(-1,1);
        }
        this.context.imageSmoothingEnabled = false;
        this.spriteDimensions = {};
        this.loadSprite();
        this.des = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            s: 1
        }
        this.animations = [];
        this.initAnimations();
    }
    loadSprite = () => {
        this.sprite.src = `images/${this.characterName}-sprite.png`;
        this.sprite.onload = () => {
            this.loaded = true;
        }
    }
    initAnimations = () => {
        for(let move in this.moves) {
            let spriteAnimation = this.spriteInfo.animations[move]
            this.moves[move].setAnimation(spriteAnimation.yIndex, spriteAnimation.frameWidth, spriteAnimation.firstFrame, spriteAnimation.lastFrame, spriteAnimation.loop);
            this.animations.push(this.moves[move].animation);
        }
    }
    animate = (moveIndex) => {
        this.animations[moveIndex].play();
        this.refreshSprite(moveIndex);
    }
    refreshSprite = (moveIndex) => {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.drawSprite(moveIndex);
    }
    drawSprite = (moveIndex) => {
        this.context.drawImage(this.sprite, this.animations[moveIndex].currentFrame, this.animations[moveIndex].yIndex, this.animations[moveIndex].frameWidth, this.spriteInfo.animations.idle.frameHeight, this.des.x, this.des.y, this.des.w * this.des.s, this.des.h * this.des.s);        
    }
    setDestinationPos = (x = 0, y = 0, scale = 1, width = this.spriteInfo.animations.idle.frameWidth, height = this.spriteInfo.animations.idle.frameHeight) => {
        this.des.x = x;
        this.des.y = y;
        this.des.w = width;
        this.des.h = height;
        this.des.s = scale;
    }
}
/*
Move 1 - 4 (first is weakest, second weakest, special, boost);
Each move has frames. yIndex is y position, 
*/ 
class Move {
    constructor(name, strength = 0, accuracy = 0) {
        this.name = name;
        this.strength = strength;
        this.accuracy = accuracy;
    }
    setAnimation = (yIndex, frameWidth, firstFrame, lastFrame, loop) => {
        this.animation = new Animation(yIndex, frameWidth, firstFrame, lastFrame, loop);
    }
}
class Animation {
    constructor(yIndex, frameWidth, firstFrame, lastFrame, loop) {
        this.firstFrame = firstFrame;
        this.loop = loop;
        this.yIndex = yIndex;
        this.frameWidth = frameWidth;
        this.currentFrame = firstFrame;
        this.lastFrame = lastFrame;
        this.animationEnded = false;
    }
    play = (num = 0) => {
        if(this.loop) {
            if(this.currentFrame < this.lastFrame) {
                this.currentFrame += this.frameWidth;
            } else {
                this.currentFrame = this.firstFrame;
            }
        } else {
            if(this.currentFrame < this.lastFrame && !this.animationEnded) {
                this.currentFrame += this.frameWidth;
            } else {
                //this.currentFrame = this.firstFrame;
                this.animationEnded = true;
            }
        }
    }
}
class Player {
    constructor(character) {
        this.character = character;
        this.stats = character.stats;
        this.moveChosen;
    }
    turn (move) {
        if(this.stats[move].avail == 1) {
            this.stats[move].avail = this.stats[move].defaultAvail;
            if(move === 'boost') {
                this.stats.booster();
            } else {
                return Math.random() < this.stats.accuracy ? this.stats[move].strength : 0;
            }
        }
        else if (this.stats[move].avail != 1 && this.stats[move].defaultAvail != 0) {
            this.stats[move].avail += 1;
        }
        return 0;
    }
    receiveDamage(num) {
        this.stats.health -= num;
        return num !== 0
    }
    chooseMove(move) {
        this.moveChosen = move;
    }
    moveToNum() {
        switch(this.moveChosen) {
            case 'attack1':
                return 1;
            case 'attack2':
                return 2;
            case 'special':
                return 3;
            case 'boost':
                return 4;
            default:
                return 0;
        }
    }
}
let goku_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('attack1', 110, 1),
    'attack2': new Move('attack2', 120, 1),
    'special': new Move('special', 130, 1),
    'boost': new Move('boost', 160, 1),
    'defeat': new Move('defeat')
};
let luffy_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('attack1', 110, 1),
    'attack2': new Move('attack2', 120, 1),
    'special': new Move('special', 130, 1),
    'boost': new Move('boost', 160, 1),
    'defeat': new Move('defeat')
};
let sailormoon_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('attack1', 110, 1),
    'attack2': new Move('attack2', 120, 1),
    'special': new Move('special', 130, 1),
    'boost': new Move('boost', 160, 1),
    'defeat': new Move('defeat')
}
let azula_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('attack1', 110, 1),
    'attack2': new Move('attack2', 120, 1),
    'special': new Move('special', 130, 1),
    'boost': new Move('boost', 160, 1),
    'defeat': new Move('defeat')
}
let characters = {
    'luffy':  new Character('luffy', luffy_moves, luffy_stats,luffy_sprite_info, 1),
    'goku': new Character('goku', goku_moves, goku_stats, goku_sprite_info, 2),
    'sailormoon': new Character('sailormoon', sailormoon_moves, sailormoon_stats, sailormoon_sprite_info, 2),
    'azula': new Character('azula', azula_moves, azula_stats, azula_sprite_info, 2)
}
let player1choice = characters.luffy;
let player2choice = characters.sailormoon;
let player1 = new Player(player1choice);
let player2 = new Player(player2choice);
let game = new Game(player1, player2);
player1choice.setDestinationPos(150,130,2);
player2choice.setDestinationPos(130,130,2);
let animate = () => {
    let id = window.requestAnimationFrame(animate);
    game.refreshFrame();
    game.drawBackground();
}
animate();
let interval = setInterval(() => {
    game.acting.character.animate(game.gameStateAnimations.acting);
    game.receiving.character.animate(game.gameStateAnimations.receiving);
}, uInterval);

/* Funcationable Buttons */
let atk1 = document.querySelector(".atk1").innerText   
let bst1 = document.querySelector(".atk2").innerText
let atk2 = document.querySelector(".atk3").innerText
let spc = document.querySelector(".atk4").innerText
