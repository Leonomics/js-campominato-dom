const playButtonEl = document.querySelector('.play_button');
const gridElement = document.querySelector('.grid');
const difficoltaSelectEl = document.querySelector('select[name="difficolta"]')
let score = 0;

console.dir(gridElement)

playButtonEl.addEventListener('click', startGame);

let posizioniBombe =[];

function startGame(){
    resetGame();    

    const difficoltaSelezionata =difficoltaSelectEl.value;
    console.log(difficoltaSelezionata);

    let dimensione = calcolaDimensioneGriglia(difficoltaSelezionata);

    posizioniBombe = generaBombe(dimensione**2);
    console.log(posizioniBombe);

    creaGriglia(dimensione);


}

function creaGriglia(dimensioneGriglia){

    const numeroCelle = dimensioneGriglia ** 2;
    for(let i = 0; i<numeroCelle; i++){
        const cella = creaCella();
        cella.style.flexBasis = `${100/dimensioneGriglia}%`

        cella.dataset.numero = i +1;
        cella.innerHTML = i + 1;
        
        gridElement.append(cella); 
    }
    return numeroCelle;
}

function generaBombe(max){
    const bombe = [];
    while (bombe.length<16){
        const n = getRandomIntInclusive (1,max)
        if (!bombe.includes(n)){
            bombe.push(n)
        }
    }
    console.log(bombe);
    return bombe;
}

//ritorna un valore random che rappresenta le caselle con le bombe per la funzione generaBombe
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min +1) + min);
}

function creaCella(){
    const el = document.createElement('div');
    el.classList.add('cella');
    el.addEventListener('click', onClick);
    return el;
}

function onClick(){
    //this.classList.toggle('clicked');
    const numeroCella = parseInt(this.innerHTML);
    console.log(numeroCella);
    console.log(posizioniBombe.includes(numeroCella));
    let className = 'success';
    //cella.removeEventListener('click', onClick)
    if(posizioniBombe.includes(numeroCella)){
        className = 'danger';
    }

    this.classList.add(className)
    let numeroCelle = creaGriglia(calcolaDimensioneGriglia(difficoltaSelectEl))
    finishGame(className);
    win(numeroCelle);
}


//svuota la griglia
function resetGame(){
    gridElement.innerHTML="";
}

function calcolaDimensioneGriglia(difficolta){
    let dimensione = 10;

    if(difficolta==='hard'){
        dimensione = 7;
    }else if(difficolta ==='medium'){
        dimensione = 9;
    }

    return dimensione;
}


//condizioni che decretano la fine del gioco
function finishGame(className){
        if(className == 'danger'){
            console.log("game over")
            console.log("your score: "+score);
            resetGame();
    
        }else if (className=='success'){
            score++;
        }
        /*else if(score == (dimensione-posizioniBombe.length)){
            console.log("you win")
            console.log("your score: "+score);
            resetGame();
        }*/
}
function win(numeroCelle){
    if(score == (numeroCelle-posizioniBombe.length)){
        console.log("you win")
        console.log("your score: "+score);
        resetGame();
    }
}


//condizioni che decretano la fine del gioco
/*function finishGame (className, difficolta){
    if(difficolta == 'easy' ){
        if(className == 'danger'){
            console.log("game over")
            console.log("your score: "+score);
            resetGame();
    
        }else if (className=='success'){
            score++;
        }
        else if(score == 84){
            console.log("you win")
            console.log("your score: "+score);
            resetGame();
        }
    }
    else if(difficolta == 'medium'){
        if(className == 'danger'){
            console.log("game over")
            console.log("your score: "+score);
            resetGame();
    
        }else if (className=='success'){
            score++;
        }
        else if(score == 65){
            console.log("you win")
            console.log("your score: "+score);
            resetGame();
        }
    }else if(difficolta == 'hard'){
        if(className == 'danger'){
            console.log("game over")
            console.log("your score: "+score);
            resetGame();
    
        }else if (className=='success'){
            score++;
        }
        else if(score == 33){
            console.log("you win")
            console.log("your score: "+score);
            resetGame();
        }
    }

}*/




/*let dimensioneGriglia = 10;
const tabelloneEl = document.querySelector('.tabellone');

let numeroCelle = generaGriglia(dimensioneGriglia, tabelloneEl);
let posizioniBombe = [];

posizioniBombe = generaBombe(numeroCelle);
let gridOn = false;
//const mainEl = document.querySelector('.main');

/*const easyDifficulty = document.querySelectorAll('option[value="easy"]');
const mediumDifficulty = document.querySelectorAll('option[value="medium"]');
const hardDifficulty = document.querySelectorAll('option[value="hard"]');*/

/*playButtonEl.addEventListener('click', startGame);
generaBombe(100);

function getSelectedValue() {    
    let selectedValue = document.getElementById("difficulty_button").value;
    console.log(selectedValue);
    return selectedValue;
}

function startGame(){
    tabelloneEl.style.visibility = "visible";
    generaGriglia(dimensioneGriglia, tabelloneEl);
    gridOn = true;
}

function generaGriglia(dimensione, tabellone){
    tabellone.innerHTML = "";
    val = getSelectedValue();
    if(val == "medium"){
        tabelloneEl.classList.add('medium');
        tabelloneEl.classList.remove('hard');
        tabelloneEl.classList.remove('easy');
        dimensione = 9;

    }else if(val == "hard"){
        tabelloneEl.classList.remove('hard');
        tabelloneEl.classList.add('hard');
        tabelloneEl.classList.remove('easy');  
        dimensione = 7;
    }else{
        tabelloneEl.classList.remove('hard');
        tabelloneEl.classList.add('easy');
        tabelloneEl.classList.remove('medium');
        dimensione;
    }
    const numeroCelle = dimensione ** 2;
    //const div = document.createElement('div');

    for(let i = 0; i<numeroCelle; i++){
        const cella = getSquareElement();
        cella.innerHTML = i + 1;
        //div.append(cella);
        tabellone.append(cella);    
    }

    return numeroCelle;
}

function generaBombe(max){
    const bombe = [];
    while (bombe.length<16){
        const n = getRandomIntInclusive (1,max)
        if (!bombe.includes(n)){
            bombe.push(n)
        }
    }
    console.log(bombe);
}

//ritorna un valore random che rappresenta le caselle con le bombe per la funzione generaBombe
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min +1) + min);
}




function getSquareElement(){
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', clickHandler)

    return square;
}

function clickHandler(){

    //const square = this;
    //square.classList.toggle('clicked');
    //square.removeEventListener('click', clickHandler);
    const numeroCella = parseInt(this.innerHTML);
    console.log("cella numero: " + numeroCella);
    console.log(posizioniBombe)
    //console.log(posizioniBombe.includes(numeroCella));
    //console.log(numeroCella);
    //numeroCella = parseInt(numeroCella)
    let className = 'success'
    if(posizioniBombe.includes(numeroCella)){
        className = 'Danger';
    }

}*/

/*function onClick(){
    let className = 'success';
    let numeroCella = this.innerHTML
    console.log(numeroCella);
    numeroCella = parseInt(numeroCella)
    if(posizioniBombe.includes(numeroCella)){
        className = 'danger';
    }
}*/