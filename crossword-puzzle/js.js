$(() => {
    generateGrid();
});

function generateGrid() {
    for (let x = 0; x < 13; x++) {
        let row = `<tr>`;
        for (let y = 0; y < 13; y++) {
            row += `<td id="cell-${x}-${y}">o</td>`;
        }
        row += `</tr>`;

        $("#crossword").append(row);
    }
}

function clearGrid() {
    alert("grid cleared");
}

$(document).on("click", "[id^='cell-']", (e) => {
    console.log(e.target.id);
});
