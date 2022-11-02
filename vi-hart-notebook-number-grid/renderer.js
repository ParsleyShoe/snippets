function renderGrid() {
    const startTime = new Date().getTime();

    const gridHeight = 31;
    const gridWidth = 33;
    const gridCellCount = gridHeight * gridWidth;
    const grid = $("#grid-body");
    // let numbersToFitInGrid = "";


    // track starting column index for first row
    // iterate over grid rows
    // track starting column index for first row (applicable for each iteration)
    //
    // for each number:
    //  - iterate over each digit
    //    - if cell is empty, fill cell at current column with digit
    //    - else, increment column by one

    for (let y = 0; y < gridHeight; y++) {
        const row = grid.append("<tr></tr>");
        for (let x = 0; x < gridWidth; x++) {
            row.append(`<td></td>`);
        }
    }

    for (let y = 0; y < gridHeight; y++) {
        let nextCell;
        for (let x = 0; x < gridWidth; x++) {
            let currentTarget;
            while (currentTarget.text()) {
                currentTarget = grid.children().eq(y).children().eq(x);
                if (x < gridWidth)
                    x++;
                else
                    y++;
            }
        }
    }


    // for (let i = 0; i < gridCellCount; i++) {
    //     numbersToFitInGrid += i.toString();
    //     if (numbersToFitInGrid.length >= gridCellCount) break;
    // }

    // for (let i = 0; i < numbersToFitInGrid.length; i++) {
    //     const element = numbersToFitInGrid[i];
        
    // }

    // console.log({ numbersToFitInGrid, strLen: numbersToFitInGrid.length, gridCellCount });



    // for (let y = 0; y < gridHeight; y++) {
    //     //const row = grid.append("<tr></tr>");
    //     for (let x = 0; x < gridWidth; x++) {

    //         row.append(`<td>${gridWidth * y + x}</td>`);
    //     }
    // }



    const endTime = new Date().getTime();
    console.info(`time: ${((endTime - startTime) / 1000).toFixed(3)}s`);
}

$(document).ready(renderGrid);