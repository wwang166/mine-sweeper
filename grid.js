let cellIsMined = [];
let totalMineCount = 10;
let gridLength = 9;
let grid = []; // {hasMine: boolean, adjacentMineCount: int}


function init() {
    console.log('initializing grids');
    for (let i = 0; i < gridLength; i++) {
        let row = [];
        for (let j = 0; j < gridLength; j++) {
            row.push({ hasMine: false });
        }
        grid.push(row);
    }

    console.log('generating mines');
    while (totalMineCount > 0) {
        let i = Math.floor(Math.random() * gridLength);
        let j = Math.floor(Math.random() * gridLength);
        if (grid[i][j].hasMine) {
            continue;
        }
        grid[i][j].hasMine = true;
        totalMineCount--;
    }

    console.log('generate mine count');
    for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
            grid[i][j].adjacentMineCount = 0;
            if (i - 1 >= 0
                && j - 1 >= 0
                && i - 1 < gridLength
                && j - 1 < gridLength
                && grid[i - 1][j - 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i - 1 >= 0
                && j >= 0
                && i - 1 < gridLength
                && j < gridLength
                && grid[i - 1][j].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i - 1 >= 0
                && j + 1 >= 0
                && i - 1 < gridLength
                && j + 1 < gridLength
                && grid[i - 1][j + 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i >= 0
                && j - 1 >= 0
                && i < gridLength
                && j - 1 < gridLength
                && grid[i][j - 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i >= 0
                && j + 1 >= 0
                && i < gridLength
                && j + 1 < gridLength
                && grid[i][j + 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i + 1 >= 0
                && j - 1 >= 0
                && i + 1 < gridLength
                && j - 1 < gridLength
                && grid[i + 1][j - 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i + 1 >= 0
                && j >= 0
                && i + 1 < gridLength
                && j < gridLength
                && grid[i + 1][j].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
            if (i + 1 >= 0
                && j + 1 >= 0
                && i + 1 < gridLength
                && j + 1 < gridLength
                && grid[i + 1][j + 1].hasMine) {
                grid[i][j].adjacentMineCount++;
            }
        }
    }

    // for (let i = 0; i < gridLength; i++) {
    //     for (let j = 0; j < gridLength; j++) {

    //     }
    // }

    console.log(grid);

    let gridDOMElement = '';
    for (let i = 0; i < gridLength; i++) {
        gridDOMElement += '<div class="row flex-nowrap">';
        for (let j = 0; j < gridLength; j++) {
            let buttonColor = "btn-secondary";
            // if (grid[i][j].hasMine) {
            //     buttonColor = "btn-danger";
            // }
            gridDOMElement += '<button data-has-mine=' + grid[i][j].hasMine + ' data-i=' + i + ' data-j=' + j + ' class="col cell btn ' + buttonColor + '" onmousedown="cellOnClick(event, this)"></button>';
        }
        gridDOMElement += '</div>';
    }
    document.getElementById("container").innerHTML = gridDOMElement;
    document.getElementById("container").setAttribute("style", "width:" + 40 * gridLength + "px");

}

function cellOnClick(event, cell) {
    // alert("You pressed button: " + event.button);
    if (event.button === 0) {
        if (grid[cell.dataset.i][cell.dataset.j].hasMine) {
            let cells = document.getElementsByClassName("cell");
            for (let i = 0; i < cells.length; i++) {
                console.log(cells[i].dataset.hasMine);
                if (cells[i].dataset.hasMine === "true") {
                    cells[i].classList.add("btn-danger");
                    cells[i].classList.remove("btn-secondary");
                }
            }
            console.log('You lose!');
        } else {
            cell.innerHTML = grid[cell.dataset.i][cell.dataset.j].adjacentMineCount;
            cell.classList.add("btn-info");
            cell.classList.remove("btn-secondary");
            // cell.innerHTML = "<div></div>";
        }
    } else if (event.button === 2 && cell.innerHTML === '') {
        cell.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
    } else if (event.button === 2 && cell.innerHTML === '<i class="fa fa-flag" aria-hidden="true"></i>') {
        cell.innerHTML = '';
    }
    if (userHasWin()) {
        alert("You Win!");
    }
}

function userHasWin() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].dataset.hasMine === "false" && cells[i].classList.contains("btn-secondary")) {
            return false;
        }
    }
    return true;
}

init();

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

