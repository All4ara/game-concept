let canvas = document.querySelector('#background');
let context = canvas.getContext('2d');

let canvas2 = document.querySelector('#hero')
let context2 = canvas2.getContext('2d');

let cellGames = new Image();
cellGames.src = 'images/background.jpg';

let goku = new Image();
goku.src = 'images/gokus.png'

let azula = new Image();
azula.src = 'images/azulaPre.png'


canvas.width = 710;
canvas.height = 500;

canvas2.width = window.innerWidth - 42;
canvas2.height = 500;

imageIndex = 0;
imageIndex2 = 0
cellGames.onload = () => {
    context.imageSmoothingEnabled = false;

    context.drawImage(cellGames, 10,0,canvas.width-20,500)
    context2.drawImage(goku,imageIndex, 0, 160, 224, 0, 0, 320, 448)
    // context2.drawImage(azula, imageIndex2, 0, 30, 100,
    //     350, 0, 100, 500);
}
function animation() {
    id = requestAnimationFrame(animation);

    context.clearRect(0,0, 500, 500);
    context2.clearRect(0,0, 500, 500);

    context.imageSmoothingEnabled = false;

    context.drawImage(cellGames, 10,0,canvas.width-20,500)
    context2.drawImage(goku,imageIndex, 448, 160, 224, 20, 0, 320, 448)
    // context2.drawImage(azula, imageIndex2, 0, 30, 100, 350, 0, 130, 500);
}
setInterval(()=>{
    if(imageIndex >= 1300) {
        imageIndex = 0;
    } else {
        imageIndex += 160;
    }
}, 200)
setInterval(()=>{
    if(imageIndex2 >= 1300) {
        imageIndex2 = 0;
    } else {
        imageIndex2 += 160;
    }
}, 500)
animation();