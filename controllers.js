/* Funcationable Buttons */

let atk1 = document.querySelector(".atk1") 
let bst1 = document.querySelector(".atk2")
let atk2 = document.querySelector(".atk3")
let spc = document.querySelector(".atk4")

atk1.onclick = (event) => {
    console.log('click')
    game.acting.chooseMove('attack1');
    game.enterState(3);
}

bst1.onclick = (event) => {
    console.log('click')
    game.acting.chooseMove('boost');
    game.enterState(3);
}

atk2.onclick = (event) => {
    console.log('click')
    game.acting.chooseMove('attack2');
    game.enterState(3);
}

spc.onclick = (event) => {
    console.log('click')
    game.acting.chooseMove('special');
    game.enterState(3);
}
