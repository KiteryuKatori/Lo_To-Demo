// export { callNum, kinhBoard, genBoard, clrBoard, newGame } //Export all functions

const board = document.querySelector("#mainContainer");
const row = document.querySelectorAll('.row');
// const cells = document.querySelectorAll(".cell");

// import { preBoardList } from "./preBoards.js";

const availNums = [];
for (let i = 1; i< 91; i++) {
    availNums.push(i);
}

const calledNums = [];
const calledNumList = document.getElementById("calledList");
// console.log(calledNumList);
calledNumList.innerHTML = calledNums; //Initialize the element

genBoard();


//Set selectable cells
row.forEach(Row => {
    Row.childNodes.forEach(cell => {
        cell.addEventListener("click", () =>{
            cellSelect(cell);
        })
    });
});

// BUTTON ACTIVATED FUNCS
function callNum() {
    genNumForCalling(calledNums, availNums);
    calledNumList.innerHTML = (calledNums+[]).replaceAll("," ," "); //refresh the element
    calledNumList.scrollTop = calledNumList.scrollHeight;
}

function kinhBoard() {
    const modal = 0;
    ModalActivating(modal);
}

function genBoard() {
    const boardNums = [];
    const spawnedNum = [];

    let chosenNum = randFromTo(0, preBoardList.length);
    let chosenBoard = preBoardList[chosenNum];
    console.log(`Board ${chosenNum} activated.`);

    for (let r = 0; r < 9; r++) {
        boardNums[r] = []; //Declare that this is 2 dimensional Array

        // let filledLeft = 0;
        // let emptiedLeft = 4;
        // let doubleEmptiedLeft = 1;

        for (let c = 0; c < 9; c++) { //Reset the board 
            boardNums[r][c] = "";
            row[r].children[c].innerHTML = boardNums[r][c];
            cellEmpty(row[r].children[c]);
        }



        let calledIndexes = chosenBoard[r]; //this shit reset every row



        let tempoText = `Row ${r}:`;
    
        // for (let i = 0; i < 5; i++) { //Add 5 indexes to the row for filling
        //     let generatedNum = genNonRepeatedNum(calledIndexes, 0, 8);
        //     calledIndexes.push(generatedNum); //0-8
        //     //console.log(`pushed ${generatedNum}`)
        // }
        // var randBool = Math.random() < 0.5; true if < 0.5.

        // Reqs:
        //     - 5 filledCells, 4 emptiedCells.
        //     - Maximum 2 double EmptiedCells.
        //     - Its way easier starting with a filledCell. EmptiedCells are killing me.
        //     - FUCKING DYNAMIC PROGRAMMING IS NEEDED

        // tests?:
        // XXO XXO XOO    XXO XXO OXO    XXO XOX XOO
        // XXO OXX OOX    XOO XOX OXX    XOO XOX XOX
        // OOX XOO no     OOX XOX XOX    OXO OXX OXX
        // OXX OOX XOX    OXX OOX XXO    OXX OOX OXX
        // OXO OXX XOX    OXO OXX XOX
        // ...
        // THIS SHIT WILL NEVER END
        // .
        // .
        // .
        // Nah just kidding, about 40+ and u'll be cool

        // Hey, I'm fuking tired, how about making preBoards and then learn Algorithms later?
        // Good idea... let's.
        //Why am I here just to suffer to the fact that I am not capable of doing this Project?

        calledIndexes.sort(); //Fuck off, I dont need u anymore
        
        for (let i = 0; i < calledIndexes.length; i++) { 
            tempoText += " " + calledIndexes[i];
        }
        console.log(tempoText);

        for (let c = 0; c < 9; c++) {
            if (calledIndexes.includes(c)) {
                if (c == 0) {
                    boardNums[r][c] = genNonRepeatedNum(spawnedNum, c*10 + 1, c*10 + 9);
                }
                else if (c == 8) {
                    boardNums[r][c] = genNonRepeatedNum(spawnedNum, c*10, c*10 + 10);
                }
                else {
                    boardNums[r][c] = genNonRepeatedNum(spawnedNum, c*10, c*10 + 9);
                }
                row[r].children[c].innerHTML = boardNums[r][c];
                cellFilled(row[r].children[c]);
                spawnedNum.push(boardNums[r][c]);
            }
            else {
                boardNums[r][c] = '';
            }
        }
    }
    console.log(boardNums);
} 

function clrBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) { //Clear the markers 
            row[r].children[c].classList.remove("selected");
        }
    }
}

function newGame() {
    clrBoard();
    for (var keys in calledNums) {
        if (calledNums.hasOwnProperty(keys)) {
            delete calledNums[keys];
        }
    }
    calledNumList.innerHTML = (calledNums+[]).replaceAll("," ," ");
}




// Cells + modals manip
function cellFilled(cell) {
    if (cell == null) return
    cell.classList.add("exist");
}

function cellEmpty(cell) {
    if (cell == null) return;
    cell.classList.remove("exist");
    cell.classList.remove("selected");
}

function cellSelect(cell) {
    if (cell == null) return;
    if(!cell.classList.contains("selected")) {
        cell.classList.add("selected");
    }
    else {
        cell.classList.remove("selected");
    }
}

function ModalActivating(modal) {
    
    if(!modal.classList.contains("active")) {
        modal.classList.add("active");
        modal.parentElement.add("active");
    }
    else {
        modal.classList.remove("active");
        modal.parentElement.classList.remove("active");
    }
}

// closeModalList.forEach(btn => {
//     btn.addEventListener("click", () => {
//         //console.log(`${btn.parentElement}`);
//         closeModal(document.querySelector(`#${btn.parentElement.parentElement.id}`));
//     })
// })





// SMOL FUNCTIONS
function genNonRepeatedNum(arr, startNum, endNum) {

    let filledCount = 0;
    let emptiedCount = 0;

    let num = randFromTo(startNum, endNum);

    
    for (let k = 0; k < arr.length; k++) { //Check repeated
        if (arr[k] == num) {
            //console.log(`Reset cuz ${num} = arr[${k}]`);
            //console.log(`${arr[k]} repeated`)
            num = randFromTo(startNum, endNum);
            //console.log(`New num is ${num}`)
            k = -1; //Reset the counter to -1 because if k is 0 then when for-loop looped, k++ will be 1 and miss the 1st element(k = 0)
        }
    }
    return num;
}

function genNumForCalling(mainArr, extArr) {
    let thatNum = randFromTo(0, extArr.length - 1);
    mainArr.push(extArr[thatNum]);
    extArr.splice(extArr.indexOf(extArr[thatNum]), 1);
    
}


function randFromTo(min, max) {
    return Math.floor( Math.random() * (max-min+1) + min );
    //To genereate a number between 0-1
    // Math.random();

    // To generate a number that is a whole number rounded down
    // Math.floor(Math.random())

    // To generate a number that is a whole number rounded down between 1 and 10
    // Math.floor(Math.random() * 10) + 1 
    //the + 1 makes it so its not 0.
}

const preBoardList = [
    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B1


    [
        [0, 1, 4, 6, 8],
        [1, 3, 4, 6, 7],
        [0, 2, 3, 5, 7],

        [0, 2, 4, 6, 7],
        [1, 3, 5, 6, 8],
        [1, 3, 4, 7, 8],

        [1, 2, 5, 7, 9],
        [1, 3, 4, 6, 8],
        [0, 2, 3, 5, 6]
    ],
    // B2


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B3


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B4

        
    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B5


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B6


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B7


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    //B8


    [
        [1, 2, 4, 6, 7],
        [0, 2, 3, 5, 7],
        [1, 3, 5, 6, 8],

        [0, 2, 5, 6, 8],
        [1, 3, 4, 7, 8],
        [0, 1, 4, 5, 7],

        [1, 2, 4, 5, 7],
        [0, 3, 4, 6, 8],
        [0, 2, 3, 6, 8]
    ],
    // B9
]

// Chúc mọi người 1 năm 2022 vui vẻ, đong đầy niềm vui trong cuộc sống và tràn ngập hạnh phúc bên gia đình cùng người thân và bạn bè, các mối quan hệ ngày càng mở rộng theo chiều hướng chất lượng đi đầu, khối lượng ngay sau.

// Chúc mọi người sẽ luôn được đồng hành với những con người thật sự xứng đáng trên con đường đời của mình, sẽ luôn nhìn ra được cơ hội hiện hữu quanh mình để phát triển bản thân, thăng tiến trong công việc.

// Và quan trọng nhất là sẽ luôn hạnh phúc và cảm thấy không hối hận với những quyết định mà bản thân mình đã đưa ra, sẽ luôn sống hết mình để được cảm nhận được cuộc sống tươi đẹp này, luôn là chính mình.
