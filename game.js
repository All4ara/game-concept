const uInterval = 200;

class Game {
    constructor(player1, player2){
        this.states = ['selection', 'idle', 'preattack', 'attack', 'attacked', 'defeat', 'recovery'];
        this.currentState = this.states[1];
        this.player1 = player1
        this.player2 = player2
        this.character1 = player1.character
        this.character2 = player2.character
        this.actingPlayer;
        this.receivingPlayer;
        this.gameStateAnimations = {
            'actingPlayer': 0,
            'receivingPlayer': 0
        }
        this.canvas = document.querySelector('#background');
        this.context = this.canvas.getContext('2d');
        this.backgroundImage = new Image();
        this.backgroundLoaded = false;
        this.playersAlive = true;
        this.pickStartingPlayer();
        this.loadBackground();
        this.loadCharacters();
        this.updateButtonInfo();       
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
            this.gameStateAnimations.actingPlayer = 0;
            this.gameStateAnimations.receivingPlayer = 0;
        } else if (this.currentState == 'preattack') {
            this.gameStateAnimations.actingPlayer = 0;
            this.gameStateAnimations.receivingPlayer = 0;
        } else if (this.currentState == 'attack') {
            let animationIndex = this.actingPlayer.formatMoveToNum();
            this.updateButtonClickable();
            if(this.receivingPlayer.receiveDamage(this.actingPlayer.turn(this.actingPlayer.moveChosen))) {
                console.log('player hit ###')
                this.actingPlayer.character.animations[animationIndex].animationEnded = false;
                this.gameStateAnimations.actingPlayer = animationIndex;
                this.gameStateAnimations.receivingPlayer = 0;
                setTimeout(() => {
                    this.actingPlayer.character.animations[animationIndex].reset();
                    this.receivingPlayer.character.animations[animationIndex].reset();
                    console.log('animation reset ###');
                    this.enterState(4);
                }, (this.actingPlayer.character.animations[animationIndex].lastFrame / this.actingPlayer.character.animations[animationIndex].frameWidth) * uInterval);
            } else {
                this.actingPlayer.character.animations[animationIndex].animationEnded = false;
                this.gameStateAnimations.actingPlayer = animationIndex;
                this.gameStateAnimations.receivingPlayer = 0;
                setTimeout(() => {
                    this.enterState(6);
                }, (this.actingPlayer.character.animations[animationIndex].lastFrame / this.actingPlayer.character.animations[animationIndex].frameWidth) * uInterval);
            }
        } else if (this.currentState == 'attacked') {
            this.gameStateAnimations.actingPlayer = 0;
            this.gameStateAnimations.receivingPlayer = 5;
            this.updateButtonClickable();
            this.drawHealthBar();
            if(this.receivingPlayer.stats.health <= 0) {
                document.querySelector('#end').style.visibility = 'visible'
                document.querySelector('.winner-name').innerText = this.actingPlayer.character.characterName
                this.enterState(5);
            }            
            setTimeout(() => {
                this.enterState(6);
            }, ((this.receivingPlayer.character.animations[5].lastFrame / this.receivingPlayer.character.animations[5].frameWidth) * uInterval) + 2000);
        } else if (this.currentState == 'recovery') {
            this.gameStateAnimations.actingPlayer = 0;
            this.gameStateAnimations.receivingPlayer = 0;
            let temp = this.actingPlayer;
            this.actingPlayer = this.receivingPlayer;
            this.receivingPlayer = temp;
            this.drawHealthBar();
            this.updateButtonInfo();
            this.updateButtonClickable();
            setTimeout(() => {
                console.log('recovered')
                this.enterState(1);
            }, 1000)
        } else if (this.currentState == 'defeat') {
            this.gameStateAnimations.actingPlayer = 0;
            this.gameStateAnimations.receivingPlayer = 5;
        }
    }
    enterState = (state) => {
        this.currentState = this.states[state];
        this.cycle();
    }
    pickStartingPlayer = () => {
        let num = Math.ceil(Math.random() * 2)
        this.actingPlayer = this[`player${num}`];
        if (num == 1) {
            this.receivingPlayer = this.player2;
        } else {
            this.receivingPlayer = this.player1;
        }
    }
    drawHealthBar = () => {
        context3.clearRect(0,0,display.width, display.height)
        drawHealthbar(display, 18,10,200,20,(this.player1.stats.health/this.player1.stats.initHealth)*100,100);
        drawHealthbar(display, 500,10,200,20,(this.player2.stats.health/this.player2.stats.initHealth)*100,100);
    }
    updateButtonInfo = () => {
        document.querySelector('#attack1').innerText = this.actingPlayer.character.moves['attack1'].name
        document.querySelector('#attack1-strength').innerText = this.actingPlayer.stats.attack1.strength;
        document.querySelector('#attack2').innerText = this.actingPlayer.character.moves['attack2'].name
        document.querySelector('#attack2-strength').innerText = this.actingPlayer.stats.attack2.strength;
        document.querySelector('#boost').innerText = this.actingPlayer.character.moves['boost'].name
        document.querySelector('#boost-strength').innerText = this.actingPlayer.stats.boost.details;
        document.querySelector('#special').innerText = this.actingPlayer.character.moves['special'].name
        document.querySelector('#special-strength').innerText = this.actingPlayer.stats.special.strength;
    }
    updateButtonClickable = () => {
        if(this.actingPlayer.stats.special.avail != 1) {
            document.querySelector('.atk4').classList.add('btn-disable');
        } else {
            document.querySelector('.atk4').classList.remove('btn-disable');
        }
        if(this.actingPlayer.stats.attack2.avail != 1) {
            document.querySelector('.atk3').classList.add('btn-disable');
        } else {
            document.querySelector('.atk3').classList.remove('btn-disable');
        }
        if(this.actingPlayer.stats.boost.avail != 1) {
            document.querySelector('.atk2').classList.add('btn-disable');
        } else {
            document.querySelector('.atk2').classList.remove('btn-disable');
        }
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
    play = () => {
        if(this.loop) {
            if(this.currentFrame < this.lastFrame) {
                this.currentFrame += this.frameWidth;
                console.log('frame: ' + this.currentFrame);
            } else {
                this.currentFrame = this.firstFrame;
            }
        } else {
            if(this.currentFrame < this.lastFrame && !this.animationEnded) {
                this.currentFrame += this.frameWidth;
                console.log('frame: ' + this.currentFrame);
            } else {
                this.animationEnded = true;
            }
        }
    }
    reset = () => {
        this.currentFrame = this.firstFrame;
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
                this.updateTurnCounter();
            } else if (move == 'special') {
                this.updateTurnCounter();
                return this.stats[move].strength;
            } else {
                this.updateTurnCounter();
                return Math.random() < this.stats.accuracy ? this.stats[move].strength : 0;
            }
        }
        
        
        return 0;
    }
    updateTurnCounter() {

        let moves = ['boost', 'attack2']

        for(let move of moves) {
            console.log(this.stats[move].avail != 1, this.stats[move].defaultAvail != 0);
            if(this.stats[move].avail != 1 && this.stats[move].defaultAvail != 0) {
                this.stats[move].avail += 1;
            }
        }

        
    }
    receiveDamage(num) {
        this.stats.health -= num;
        return num !== 0
    }
    chooseMove(move) {
        this.moveChosen = move;
    }
    formatMoveToNum() {
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
    'attack1': new Move('attack1'),
    'attack2': new Move('attack2'),
    'special': new Move('special'),
    'boost': new Move('boost'),
    'defeat': new Move('defeat')
};
let luffy_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('Gum Gum Bazooka'),
    'attack2': new Move('Gum Gum Sniper'),
    'special': new Move('Gum Gum Gatling Gun'),
    'boost': new Move('Gum Gum Balloon'),
    'defeat': new Move('defeat')
};
let sailormoon_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('Moon Kick'),
    'attack2': new Move('Moon Tiara Action'),
    'special': new Move('Rush Luna'),
    'boost': new Move('Spin Hair'),
    'defeat': new Move('defeat')
}
let azula_moves = {
    'idle': new Move('idle'),
    'attack1': new Move('attack1'),
    'attack2': new Move('attack2'),
    'special': new Move('special'),
    'boost': new Move('boost'),
    'defeat': new Move('defeat')
}

let characters = {
    'luffy': {
        'name': 'luffy',
        'moves': luffy_moves,
        'stats': luffy_stats,
        'sprite': luffy_sprite_info,
        'x1': 0,
        'y1': 0,
        's1': 1
    },
    'azula': {
        'name': 'azula',
        'moves': azula_moves,
        'stats': azula_stats,
        'sprite': azula_sprite_info

    },
    'goku': {
        'name': 'goku',
        'moves': goku_moves,
        'stats': goku_stats,
        'sprite': goku_sprite_info
    }, 
    'sailormoon': {
        'name': 'sailormoon',
        'moves': sailormoon_moves,
        'stats': sailormoon_stats,
        'sprite': sailormoon_sprite_info,
        'x2': 190,
        'y2': 130,
        's2': 2
    }
    
}

let theSelector = document.querySelectorAll(".fight")
let style = document.querySelector("style")   
for (let btn of theSelector){
        btn.onclick = selectFighter;
}

document.querySelector('.theVault').onclick = selectFighter

let player1select;
let player2select;
let player1selected = false;
let player2selected = false;

function selectFighter(e) {
    if(player2selected) {
        startGame(e)
    } else {
        document.querySelector(`.${e.target.id}-btn`).classList.add('btn-disable');
        e.target.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        if(!player1selected) {
            player1select = characters[`${e.target.id}`];
            player1selected = true;
        } else {
            player2select = characters[`${e.target.id}`];
            player2selected = true;
        }  
    }
}

let game;

function startGame(e) {
    style.innerHTML = `
        #starter-screen {
            display: none;
        }
        .modal-backdrop.show {
            display: none;
        }`;
    
    let player1character = new Character(player1select.name, player1select.moves, player1select.stats, player1select.sprite, 1);
    let player2character = new Character(player2select.name, player2select.moves, player2select.stats, player2select.sprite, 2)
    let player1 = new Player(player1character);
    let player2 = new Player(player2character);
    player1character.setDestinationPos(player1select.x1,player1select.y1,player1select.s1);
    player2character.setDestinationPos(0,0,1);
    game = new Game(player1, player2);
    let animate = () => {
    let id = window.requestAnimationFrame(animate);
    game.refreshFrame();
    game.drawBackground();
    }
    animate();
    let interval = setInterval(() => {
        game.actingPlayer.character.animate(game.gameStateAnimations.actingPlayer);
        game.receivingPlayer.character.animate(game.gameStateAnimations.receivingPlayer);
    }, uInterval);
    let time = document.querySelector('.timer').innerText;
    let intervalPlayerTurn = 1000;
    let intervalTime = setInterval(()=>{
        if(Number(time) > 1){
            document.querySelector('.timer').innerText -= 1;
            time-=1
        } else if(time == 1){
            document.querySelector('.timer').innerText = `${game.actingPlayer
    .character.characterName}'s turn`;
            intervalPlayerTurn = 10;
        }
    }, intervalPlayerTurn)
}





