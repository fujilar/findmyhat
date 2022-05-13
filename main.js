// import all required module
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

//Instantiate variable

const hat = '^';        //hat
const hole = 'O';
const fieldCharacter = '░';         //grass
const pathCharacter = '*';      //me
const row = 10;
const col = 10;

//1) built a whole field (10 x 10)
// create 2d array
//construct the layout

const hatRow = Math.floor(Math.random() * row);
const hatCol = Math.floor(Math.random() * col);
let game_end = false;

class field {

    field = [];

    constructor() {

    //thisfield = field;
    //the current location of the character *
    //character +* always at the default position (0,0)
    this.locationX = 0;
    this.locationY = 0;  

    this.tempX = 0;
    this.tempY = 0;

    for (let a = 0; a < row; a++) {
        this.field[a] = [];
    }

    this.generateField(); // put in patches of grass

    }

    generateField() {

        for (let x = 0; x < row; x++) {
            for (let y = 0; y < col; y++) {

                const prob = Math.random();
                
                if (prob < 0.2) {
                  this.field[x][y] = fieldCharacter;  
                }
                else {
                   this.field[x][y] = fieldCharacter; 
                }
                
            }
        }
        // set hat location

        // set character position as [0][0]
        
        this.field[hatRow][hatCol] = hat;

        this.field[this.locationX][this.locationY] = pathCharacter;

    }

    


    runGame() {
        //Implement your codes
        this.print();
        this.askQuestion();
        this.checkLocation();
        this.moveCharacter();
    }

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {

        let answer = "";

        do {
            answer = prompt('which way? Please key in (u, d, l, r) ').toUpperCase();
        } while (!(answer == "U" || answer == "D" || answer == "L" || answer == "R"));

        this.tempX = this.locationX;
        this.tempY = this.locationY;

        if (answer == "U"){
            this.locationX -=1;
        }
        
        else if (answer == "D"){
            this.locationX +=1;
        }
        else if (answer == "L"){
            this.locationY -=1;
        }
        else if (answer == "R"){
            this.locationY +=1;
        }
    }
        
        
    checkLocation() {

        if(this.locationX < 0 || this.locationY < 0 || this.locationX > (row - 1) || this.locationY > (col -1)) {
            game_end = true;
            console.log("Out of bounds - Game End!");
        }

        else if(this.field[this.locationX][this.locationY] == '0') {
            game_end = true;
            console.log("Sorry, you fell down a hole");
        }

        else if ((hatRow == this.locationX) && (hatCol == this.locationY)) {
            game_end = true;
            console.log("Congrats, you found your hat!");
        }
    }
        
    moveCharacter() {
        if (this.locationX >= 0 && this.locationY >= 0 && this.locationX <= (row - 1) && this.locationY <= (col - 1)) {
                this.field[this.locationX][this.locationY] = pathCharacter;
            }

            this.field[this.tempX][this.tempY] = fieldCharacter;
        }
    


    
} //End of Field Class


//Create an instance object for this Field
const myField = new field();

while (!game_end) {
    myField.runGame();
}
    