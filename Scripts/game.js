const board = document.querySelector("#mainContainer");
const row = document.querySelectorAll('.row');
const cells = document.querySelectorAll(".cell");

const calledNums = [];
document.getElementById("calledList").innerHTML = calledNums; //Initialize the element

genBoard();
//console.log(row[6].children[7].innerHTML);

// row.children.forEach(rowSingle => {
//     rowSingle.forEach(cell => {
//         if (cell.innerHTML != '') {

//         }
//     });
// });

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
    console.log(`New board created`);
} 


function cellFilled(cell) {
    if (cell == null) return
    cell.classList.add("exist");
}

function cellEmpty(cell) {
    if (cell == null) return;
    cell.classList.remove("exist");
}

function cellEmpty(cell) {
    if (cell == null) return;
    cell.classList.remove("exist");
}

function callNum() {
    calledNums.push( genNonRepeatedNum( calledNums, 1, 100) );
    document.getElementById("calledList").innerHTML = (calledNums+[]).replaceAll("," ," "); //refresh the element
}


function genNonRepeatedNum(arr, startNum, endNum) {
    let num = randFromTo(startNum, endNum);
    for (let k = 0; k < arr.length; k++) { //Check repeated
        if (arr[k] == num) {
            // console.log(`Reset cuz ${num} = arr[${k}]`);
            //console.log(`${arr[k]} repeated`)
            num = randFromTo(startNum, endNum);
            //console.log(`New num is ${num}`)
            k = -1; //reset counter to -1 cuz if it is 0 then when for loop reset, k will be 1 and miss the 1st element
        }
    }
    return num;
}

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

// Chúc chị 1 năm 2022 vui vẻ, tràn đầy niềm vui và hạnh phúc bên gia đình cùng người thân và bạn bè xung quanh nhé =))))

// Nếu chị đã có ngiu rồi thì chúc chị và anh/chị ấy sẽ luôn hạnh phúc và cùng nhau tiến triển tốt hơn nhé. Còn nếu chưa thì tất nhiên là chúc chị năm nay sớm có 1 người để bầu bạn rồi =))))))(tất nhiên là người đó phải thật xứng đáng với chị nữa =))) )

// Và trong công việc thì em chúc chị sẽ liên tục nhận được các cơ hội thăng tiến và có quan hệ tốt với đồng nghiệp lẫn các sếp =)))

// À khum chỉ là năm 2022, mà là mọi năm sau này luôn C:

// Và quan trọng nhất là luôn hạnh phúc, yêu thương bản thân, luôn cảm thấy may mắn trong mọi việc trong cuộc sống nhe chị 