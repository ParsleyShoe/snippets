let rows;
let cols;
let mineCount;
let flagCount = 0;

startNewGame();

function generateGrid(rows, cols) {
    let generatedGrid = "";
    for (i = 0; i < rows; i++) {
        let row = `<tr id="row-${i}">`;
        for (j = 0; j < cols; j++) {
            row += `<td class="col-${j}"></td>`
        }
        row += "</tr>";
        generatedGrid += row;
    }
    $("#ms-body").append(generatedGrid);
}

function placeMines() {
    let allCells = $("td");
    for (i = 0; i < mineCount; i++) {
        let index = Math.floor(Math.random() * allCells.length);
        allCells.eq(index).addClass("mine");
        allCells.splice(index, 1);
    }
}

function startNewGame() {
    cols = Number($("#colCount").val());
    rows = Number($("#rowCount").val());
    mineCount = Number($("#mines").val());
    $("#ms-body").empty();
	generateGrid(rows, cols);
    placeMines();
	
    let minePercentage = Math.floor((mineCount / (cols * rows)) * 100);
    $("#minePercentage").text(minePercentage + "%");
    let difficulty = minePercentage >= 15 ? "hard" : "easy";
    $("#difficulty").text(difficulty);
    $("#mineCount").text(mineCount);
    flagCount = 0;
    $("#flagCount").text(flagCount);
    $("*").removeClass("red");
    $("*").removeClass("green");
}

function endGame(isWon) {
    if (isWon) {
        $("*").addClass("green");
        console.log("Congrats! You won!");
    } else {
        $("*").addClass("red");
        $("td").addClass("revealed");
        $(".mine").html("<i class='fa fa-bomb'></i>");
        console.warn("GAME OVER");
    }
}

function countMines(x, y) {
    x = Number(x);
    y = Number(y);
    let mineCount = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = x + xoff;
            let j = y + yoff;
            if (i > -1 && i < rows && j > -1 && j < cols) {
                let cell = getCell(i, j);
                if ($(cell).attr("class").includes("mine")) mineCount++;
            }
        }
    }
    return mineCount;
}

function getCell(x, y) {
    return $("#row-" + x).find(".col-" + y);
}

function toggleFlag(x, y) {
    let cell = getCell(x, y);
    if (!cell.attr("class").includes("flagged")) {
        cell.addClass("flagged");
        cell.html("<i class='fa fa-flag'></i>");
        flagCount++;
        //console.log("flag (" + x + ", " + y + ")");
    } else {
        cell.removeClass("flagged");
        cell.html("");
        flagCount--;
        //console.log("un-flag (" + x + ", " + y + ")");
    }
    $("#flagCount").text(flagCount);
}

function floodFill(x, y) {
    x = Number(x);
    y = Number(y);
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = x + xoff;
            let j = y + yoff;
            if (i > -1 && i < rows && j > -1 && j < cols) {
                let cell = getCell(i, j);
                if (!$(cell).attr("class").includes("mine") &&
                    !$(cell).attr("class").includes("revealed")) {
                    reveal(i, j);
                }

            }
        }
    }
}

function reveal(x, y) {
    let cell = getCell(x, y);
    cell.addClass("revealed");
    if (cell.attr("class").includes("flagged")) toggleFlag(x, y);
    let minesNearby = countMines(x, y);
    if (minesNearby === 0) {
        floodFill(x, y);
    } else if (minesNearby > 0) {
        cell.text(minesNearby);
    }
    if (gameIsWon())
        endGame(true);
}

function gameIsWon() {
    let allCells = $("td");
    let revealedCells = $(".revealed");
    return revealedCells.length === (allCells.length - mineCount);
}

// reveal a cell
$(document).on("click", "td", function(e) {
    let classes = $(e.target).attr("class").split(" ");
    if (classes.includes("mine")) {
        endGame(false);
        return;
    }
	else if (!classes.includes("revealed")) {
		let row = $(e.target).closest("tr").attr("id").split("-")[1];
		let col;
		for (let i = 0; i < classes.length; i++) {
			if (classes[i].includes("col-")) {
				col = classes[i].split("-")[1];
			}
		}
		reveal(row, col);
	}
});

// (un-)flag a cell
$("table").delegate("td", "contextmenu", function(e) {
    e.preventDefault();
    let cell;
    if ($(e.target).prop("tagName") === "I") cell = $(e.target).parent();
    else cell = $(e.target);
    let classes = cell.attr("class").split(" ");
    if (!classes.includes("revealed")) {
        let col;
        let row = cell.closest("tr").attr("id").split("-")[1];
        for (let i = 0; i < classes.length; i++) {
            if (classes[i].includes("col-")) {
                col = classes[i].split("-")[1];
            }
        }
        toggleFlag(row, col);
    }
});
