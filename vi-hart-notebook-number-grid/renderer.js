function renderGrid() {
    const startTime = new Date().getTime();

    const grid = $("#grid-body");
    const gridHeight = 31;
    const gridWidth = 33;
    const gridCellCount = gridHeight * gridWidth;

    generateTableCells(grid, gridHeight, gridWidth);

    const maxNumberThatCanFitInGrid = calculateMaxNumberForGrid(gridCellCount);
    let startingRowIdx = 0;
    let startingColIdxFirstRow = 0;
    let startingColIdxOtherRows = 0;

    // iterate over all numbers potentially going into the grid
    for (let currentNum = 1; currentNum < maxNumberThatCanFitInGrid + 1; currentNum++) {
        const numberStr = currentNum.toString();

        // iterate over each digit in the number
        for (let digitIdx = 0; digitIdx < numberStr.length; digitIdx++) {
            let digitIsPopulated = false;

            // if the number hasn't been populated yet, iterate through rows, then columns
            for (let y = startingRowIdx; y < gridHeight && !digitIsPopulated; y++) {
                for (let x = startingColIdxOtherRows + digitIdx; x < gridWidth && !digitIsPopulated; x++, startingColIdxOtherRows += !digitIsPopulated ? 1 : 0) {
                    let currentTarget = grid.children().eq(y).children().eq(x);

                    if (!currentTarget.text()) {
                        currentTarget.text(numberStr[digitIdx]);
                        
                        // set cell color
                        switch (numberStr[digitIdx]) {
                            case "0":
                                currentTarget.css("background-color", "#6ffeff"); // blue
                                break;
                            case "1":
                                currentTarget.css("background-color", "#53ca25"); // green
                                break;
                            case "8":
                                currentTarget.css("background-color", "#ffc2e9"); // pink
                                break;
                            case "9":
                                currentTarget.css("background-color", "#ffffae"); // yellow
                                break;
                            default:
                                if (x < gridWidth / 2) currentTarget.addClass("grayFilled");
                                break;
                        }

                        digitIsPopulated = true;

                        // console.info(
                        //     `digit %c${digitIdx + 1}%c of %c${numberStr}%c was populated at coords (${x}, ${y})`,
                        //     `color: ${digitIdx + 1 === numberStr.length ? "lightgreen; text-decoration: underline" : "white"}`,
                        //     "color: white",
                        //     "color: lightgreen",
                        //     "color: white");
                    }
                }
            }
        }

        startingRowIdx++;
        if (startingRowIdx === gridHeight) startingRowIdx = 0;
        startingColIdxOtherRows = startingColIdxFirstRow;
    }

    const endTime = new Date().getTime();
    console.info(`grid rendered in ${((endTime - startTime) / 1000).toFixed(3)}s`);
}

function generateTableCells(grid, gridHeight, gridWidth) {
    for (let y = 0; y < gridHeight; y++) {
        let row = $("<tr></tr>");

        for (let x = 0; x < gridWidth; x++) {
            row.append(`<td></td>`);
        }

        grid.append(row);
    }
}

function calculateMaxNumberForGrid(gridCellCount) {
    let maxNumberThatCanFitInGrid = 1;
    let digitCounter = 0;
    while(digitCounter < gridCellCount) {
        digitCounter += maxNumberThatCanFitInGrid.toString().length;
        maxNumberThatCanFitInGrid++;
    }

    maxNumberThatCanFitInGrid += 50; // to account for inconsistency in cell fill

    return maxNumberThatCanFitInGrid;
}

$(document).ready(renderGrid);