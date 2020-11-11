/* Start game function*/     
let theSelector = document.querySelectorAll(".fight")
let style = document.querySelector("style")   
for (let btn of theSelector){
        btn.onclick = startGame;
}
function startGame(e) {
    style.innerHTML = `
        body {
            visibility: hidden;
        }`;
}