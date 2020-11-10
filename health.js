
// Health bar
let display = document.querySelector('#display');
let context3 = display.getContext('2d');

drawHealthbar(display, 18,10,200,20,30,100);
drawHealthbar(display, 500,10,200,20,70,100);

function drawHealthbar(canvas,x,y,width,height,health,max_health){
    if(health >= max_health){health=max_health;}
    if(health <= 0){alert('Finish Them!!!'); health=0;}

    context3.fillStyle = '#000000';
    context3.fillRect(x,y,width,height);

    let colorNum = Math.round((1-(health/max_health))*0xff)*0x10000+Math.round((health/max_health)*0xff)*0x100;
    let colorString = colorNum.toString(16);

    if(colorNum>=0x100000){
        context3.fillStyle = '#'+colorString;
    }else if(colorNum<<0x100000 && colorNum>=0x10000){
        context3.fillStyle = '#0'+colorString;
    } else if(colorNum<<0x10000){
        context3.fillStyle = '#00'+colorString;
    }
    context3.fillRect(x+1,y+1,(health/max_health)*(width-2),height-2);
}

// Timer for Game

let time = document.querySelector('.timer').innerText;

let interval = setInterval(()=>{
    if(Number(time) > 1){
        document.querySelector('.timer').innerText -= 1;
        time-=1
    } else if(time == 1){
        document.querySelector('.timer').innerText = "Start";
    }
    
}, 1000)
console.log(time)
