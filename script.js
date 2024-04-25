// script.js
document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const rows = 6;
    const columns = 5;
    
    // Create grid cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("input-cell");
            cell.setAttribute("id", `cell-${i}-${j}`);
            cell.tabIndex = 0; // Make each cell focusable
            grid.appendChild(cell);
        }
    }

    // Set initial focus to the first cell and highlight it
    const firstCell = document.getElementById("cell-0-0");
    firstCell.focus();
    firstCell.classList.add('highlighted');

    // Handle keyboard input and navigation
    document.querySelectorAll('.input-cell').forEach(cell => {
        // Disable mouse focusing
        cell.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Prevent focusing with the mouse
        });

        cell.addEventListener('keydown', function(e) {
            if (e.key.length === 1 && e.key.match(/[a-z]/i) && this.innerText.length < 1) {
                // Accept single alphabetical character
                this.innerText = e.key.toUpperCase();
                clearPreviousHighlight();
                this.classList.add('highlighted'); // Highlight the cell
                moveToNextCell(this.id);
            } else if (e.key === 'Backspace') {
                if (this.innerText.length === 1) {
                    this.innerText = ''; // Clear the current cell
                    clearPreviousHighlight();
                    this.classList.add('highlighted');
                } else {
                    // If the cell is already empty, move to the previous cell
                    moveToPreviousCell(this.id);
                }
            }
        });
    });

    function moveToNextCell(currentId) {
        const [row, col] = currentId.split('-').slice(1).map(Number);
        if (col < columns - 1) {
            // Move to the next cell in the row
            const nextCell = document.getElementById(`cell-${row}-${col + 1}`);
            nextCell.focus();
            clearPreviousHighlight();
            nextCell.classList.add('highlighted'); // Highlight the cell
        }
    }

    function moveToPreviousCell(currentId) {
        const [row, col] = currentId.split('-').slice(1).map(Number);
        if (col > 0) {
            // Move to the previous cell in the row
            const prevCell = document.getElementById(`cell-${row}-${col - 1}`);
            prevCell.focus();
            clearPreviousHighlight();
            prevCell.classList.add('highlighted'); // Highlight the cell
        }
    }

    function clearPreviousHighlight() {
        document.querySelectorAll('.input-cell').forEach(cell => {
            cell.classList.remove('highlighted');
        });
    }
});