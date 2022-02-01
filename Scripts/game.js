const board = document.querySelector("#mainContainer");
const row = document.querySelectorAll('.row');
// const cells = document.querySelectorAll(".cell");

const availNums = [];
for (let i = 1; i< 91; i++) {availNums.push(i);}

const calledNums = [];
const calledList = document.getElementById("calledList");

calledList.innerHTML = calledNums; //Initialize the element

genBoard();


//Set selectable cells
row.forEach(Row => {
    Row.childNodes.forEach(cell => {
        cell.addEventListener("click", () =>{
            cellSelect(cell);
        })
    });
});

// closeModalList.forEach(btn => {
//     btn.addEventListener("click", () => {
//         //console.log(`${btn.parentElement}`);
//         closeModal(document.querySelector(`#${btn.parentElement.parentElement.id}`));
//     })
// })

function genBoard() {
    const boardNums = [];
    const spawnedNum = [];

    for (let r = 0; r < 9; r++){
        boardNums[r] = []; //Declare that this is 2 dimensional Array
        for (let c = 0; c < 9; c++) { //Reset the board 
            boardNums[r][c] = "";
            row[r].children[c].innerHTML = boardNums[r][c];
            cellEmpty(row[r].children[c]);
        }
    
        let calledIndexes = []; //this shit reset every row
        let tempoText = `Row ${r}:`;
    
        for (let i = 0; i < 5; i++) { 
            let generatedNum = genNonRepeatedNum(calledIndexes, 0, 8);
            calledIndexes.push(generatedNum); //0-8
            //console.log(`pushed ${generatedNum}`)
        }

        calledIndexes.sort();
        
        for (let i = 0; i < calledIndexes.length; i++) { 
            tempoText += " " + calledIndexes[i];
        }
        console.log(tempoText);

        for (let c = 0; c < 9; c++) {
            if (calledIndexes.includes(c)) {
                if (c == 0) {
                    boardNums[r][c] = genNonRepeatedNum(spawnedNum, c*10 + 1, c*10 + 9);
                }
                else if (c == 8){
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

function callNum() {
    genNumForCalling(calledNums, availNums);
    document.getElementById("calledList").innerHTML = (calledNums+[]).replaceAll("," ," "); //refresh the element
    calledList.scrollTop = calledList.scrollHeight;
}

// for (let i = 0; i < 50; i++) {
//     callNum();
// }

function clrBoard() {
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) { //Clear the markers 
            row[r].children[c].classList.remove("selected");
        }
    }
}

function newGame() {
    clrBoard();
    for (var keys in calledNums){
        if (calledNums.hasOwnProperty(keys)){
            delete calledNums[keys];
        }
    }
    document.getElementById("calledList").innerHTML = (calledNums+[]).replaceAll("," ," ");
}

function genNonRepeatedNum(arr, startNum, endNum) {
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
//genNumForCalling(calledNums, availNums);

function randFromTo(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
    //To genereate a number between 0-1
    // Math.random();
    // To generate a number that is a whole number rounded down
    // Math.floor(Math.random())
    // To generate a number that is a whole number rounded down between 1 and 10
    // Math.floor(Math.random() * 10) + 1 
    //the + 1 makes it so its not 0.
}




/*
// STRING METHOD (NOT RECOMMENDED)
let numList = "";
document.getElementById("calledList").innerHTML = numList;
function addNum() {
    numList += " " + randFromTo(1, 100);
    document.getElementById("calledList").innerHTML = numList;
}*/

// Chúc mọi người 1 năm 2022 vui vẻ, đong đầy niềm vui trong cuộc sống và tràn ngập hạnh phúc bên gia đình cùng người thân và bạn bè, các mối quan hệ ngày càng mở rộng theo chiều hướng chất lượng đi đầu, khối lượng ngay sau.

// Chúc mọi người sẽ luôn được đồng hành với những con người thật sự xứng đáng trên con đường đời của mình, sẽ luôn nhìn ra được cơ hội hiện hữu quanh mình để phát triển bản thân, thăng tiến trong công việc.

// Và quan trọng nhất là sẽ luôn hạnh phúc và cảm thấy không hối hận với những quyết định mà bản thân mình đã đưa ra, sẽ luôn sống hết mình để được cảm nhận được cuộc sống tươi đẹp này, luôn là chính mình.
