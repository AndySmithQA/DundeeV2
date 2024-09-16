var height = 6;//guesses
var width = 5;//words

var row = 0; //current guess (attempt)
var col= 0; //current letter for that attempt

var gameOver = false;
var word = "SAVED";

window.onload = function(){
    initialize();
}

function initialize() {
    for (let r=0; r< height; r++){
        for (let c= 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (event) =>{
        if (gameOver) return;
        
        if ("KeyA" <= event.code && event.code <= "KeyZ"){
            if (col < width){
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if(currTile.innerText == ""){
                    currTile.innerText = event.code[3];
                    col +=1
                }
            }
        }
        else if(event.code =="Backspace"){
            if(0 < col && col <= width){
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }
        else if (event.code == "Enter"){
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}


function update(){
    let correct = 0;
    for (let c = 0;c<width;c++){
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter =currentTile.innerText;

        if (word[c] == letter){
            currentTile.classList.add("correct");
            correct += 1;
        }
        else if (word.includes(letter)){
            currentTile.classList.add("present")
        }
        else{
            currentTile.classList.add("absent")
        }
        if (correct == width){
            gameOver = true;
        }
    }
}
