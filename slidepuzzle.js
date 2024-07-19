/*--------------------------- START TO SLIDE PUZZLE ---------------------------*/

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('slider-game-section').style.display = 'flex';
});

/*--------------------------- SLIDE PUZZLE ---------------------------*/

// Create the slider puzzle game
function startSliderGame() {
    const container = document.querySelector(".slider-game");
    container.innerHTML = "";
    const imagePaths = [
        "ASSETS/IMAGES/image_part_01.jpg",
        "ASSETS/IMAGES/image_part_02.jpg",
        "ASSETS/IMAGES/image_part_03.jpg",
        "ASSETS/IMAGES/image_part_04.jpg",
        "ASSETS/IMAGES/image_part_05.jpg",
        "ASSETS/IMAGES/image_part_06.jpg",
        "ASSETS/IMAGES/image_part_07.jpg",
        "ASSETS/IMAGES/image_part_08.jpg"
    ];

    // Shuffle images array
    const shuffledImages = shuffle([...imagePaths, null]); // null represents the blank space

    // Generate grid
    shuffledImages.forEach((src, index) => {
        const div = document.createElement("div");
        div.classList.add("image-container");
        div.setAttribute("data-index", index);

        if (src) {
            const img = document.createElement("img");
            img.src = src;
            img.classList.add("image");
            img.draggable = false; // Disable image dragging
            div.appendChild(img);
        } else {
            div.classList.add("target"); // Blank space
        }

        container.appendChild(div);
        div.addEventListener("click", moveTile);
    });

    // Start timer
    startTimer();
}

// Timer variables
let timer;
const TIMER_DURATION = 5 * 60 * 100; // 5 minutes in milliseconds

// Start timer function
function startTimer() {
    timer = setTimeout(() => {
        showTimeoutButton();
    }, TIMER_DURATION);
}

// Clear timer function
function clearTimer() {
    clearTimeout(timer);
}

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Move tile if adjacent to blank space
function moveTile(event) {
    const currentTile = event.currentTarget;
    const blankTile = document.querySelector(".target");
    const currentTileIndex = parseInt(currentTile.getAttribute("data-index"));
    const blankTileIndex = parseInt(blankTile.getAttribute("data-index"));

    const adjacentIndexes = getAdjacentIndexes(blankTileIndex);

    if (adjacentIndexes.includes(currentTileIndex)) {
        // Swap tiles
        swapTiles(currentTile, blankTile);

        // Check if puzzle is complete
        if (isPuzzleComplete()) {
            showCompleteButton();
        }
    }
}

// Get adjacent indexes of a tile
function getAdjacentIndexes(index) {
    const adjacentIndexes = [];
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Left
    if (col > 0) adjacentIndexes.push(index - 1);
    // Right
    if (col < 2) adjacentIndexes.push(index + 1);
    // Top
    if (row > 0) adjacentIndexes.push(index - 3);
    // Bottom
    if (row < 2) adjacentIndexes.push(index + 3);

    return adjacentIndexes;
}

// Swap tiles
function swapTiles(tile1, tile2) {
    const tempIndex = tile1.getAttribute("data-index");
    tile1.setAttribute("data-index", tile2.getAttribute("data-index"));
    tile2.setAttribute("data-index", tempIndex);

    const tile1Clone = tile1.cloneNode(true);
    const tile2Clone = tile2.cloneNode(true);

    tile1.parentNode.replaceChild(tile2Clone, tile1);
    tile2.parentNode.replaceChild(tile1Clone, tile2);

    tile1Clone.addEventListener("click", moveTile);
    tile2Clone.addEventListener("click", moveTile);
}

// Check if puzzle is complete
function isPuzzleComplete() {
    const tiles = document.querySelectorAll(".image-container");
    const expectedOrder = [
        "ASSETS/IMAGES/image_part_01.jpg",
        "ASSETS/IMAGES/image_part_02.jpg",
        "ASSETS/IMAGES/image_part_03.jpg",
        "ASSETS/IMAGES/image_part_04.jpg",
        "ASSETS/IMAGES/image_part_05.jpg",
        "ASSETS/IMAGES/image_part_06.jpg",
        "ASSETS/IMAGES/image_part_07.jpg",
        "ASSETS/IMAGES/image_part_08.jpg",
        null // null represents the blank space
    ];

    for (let i = 0; i < tiles.length; i++) {
        const tileImg = tiles[i].querySelector("img");
        const tileSrc = tileImg ? tileImg.src : null;
        const expectedSrc = expectedOrder[i];

        if (tileSrc !== expectedSrc) {
            return false;
        }
    }
    return true;
}

// Show complete button
function showCompleteButton() {
    const completeButton = document.getElementById("slider-complete-button");
    completeButton.style.display = "block";
    completeButton.addEventListener("click", () => {
        hideSliderGameSection();
        showFightSection();
    });

    // Stop timer
    clearTimer();
}

// Show timeout button
function showTimeoutButton() {
    const timeoutButton = document.getElementById("time-out");
    timeoutButton.style.display = "block";
    timeoutButton.addEventListener("click", () => {
        hideSliderGameSection();
        showFightSection();
    });
}

// Hide slider game section
function hideSliderGameSection() {
    const sliderGameSection = document.getElementById("slider-game-section");
    sliderGameSection.style.display = "none";
}

// Show fight section
function showFightSection() {
    const fightSection = document.getElementById("fight-section");
    fightSection.style.display = "flex";
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", startSliderGame);

/*--------------------------- WRONG POPUP ---------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  // Event listener for the correct card
  document.getElementById("correct-card").addEventListener("click", function() {
      // Handle correct card click, e.g., move to the next part of the website
      document.getElementById("fight-section").style.display = "none";
      document.getElementById("maze-section").style.display = "flex";
      // Add any functionality for correct card click here
  });

  // Event listeners for incorrect cards
  document.querySelectorAll(".fighter-card").forEach(function(card) {
      card.addEventListener("click", function() {
          // Show the wrong-popup
          document.getElementById("wrong-popup").style.display = "flex";
      });
  });

  // Event listener for the popup close button
  document.getElementById("popup-close-btn").addEventListener("click", function() {
      // Hide the wrong-popup
      document.getElementById("wrong-popup").style.display = "none";
  });

  // Prevent clicking on anything else when the popup is displayed
  document.addEventListener("click", function(event) {
      const popup = document.getElementById("wrong-popup");
      if (popup.style.display === "flex" && !popup.contains(event.target) && !event.target.closest("#popup-close-btn")) {
          event.stopPropagation();
          event.preventDefault();
      }
  }, true);
});

/*--------------------------- MAZE ---------------------------*/

// Get the canvas and its 2D drawing context
const canvas = document.getElementById('mazeCanvas');
const pen = canvas.getContext('2d');

// Set the dimensions of the canvas
const width = canvas.width;
const height = canvas.height;

// Define the size of each maze cell
let cellSize = 20;

// Initialize variables for tracking trail, maze generation, and solution path
let trail = [];
let generatedMaze;
let solutionPath;

// Initialize points counter
let points = 0;

// Calculate number of columns and rows based on canvas size and cell size
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);

// Player and end marker initial positions and image sources
const player1 = {
    x: 0,
    y: 0,
    image: new Image(),
};
player1.image.src = 'ASSETS/taylor.png';

const end = {
    x: cols - 1,
    y: rows - 1,
    image: new Image(),
};
end.image.src = 'ASSETS/sofa.png';

// Event listener for the start button
document.querySelector('.startbtn').addEventListener('click', function () {
    resetPlayerPos(); // Reset player position
    clearScreen(); // Clear the canvas
    setup(); // Initialize maze cells
    draw(); // Draw the maze
    addListener(); // Add keyboard input listener
    displayHidden(); // Hide any displayed messages
});

// Event listener for keyboard input
function addListener() {
    document.addEventListener('keydown', handleKeyPress);
}

// Event listeners for directional buttons
document.getElementById('btnUp').addEventListener('click', function () {
    movePlayer('ArrowUp', player1);
    draw();
});

document.getElementById('btnDown').addEventListener('click', function () {
    movePlayer('ArrowDown', player1);
    draw();
});

document.getElementById('btnLeft').addEventListener('click', function () {
    movePlayer('ArrowLeft', player1);
    draw();
});

document.getElementById('btnRight').addEventListener('click', function () {
    movePlayer('ArrowRight', player1);
    draw();
});

// Function to handle keyboard input for player movement
function handleKeyPress(event) {
    const key = event.key;
    movePlayer(key, player1);
    draw();
}

// Function to reset the message box visibility
function resetState() {
    const messageBox = document.getElementsByClassName('msgbox')[0];
    messageBox.style.visibility = "hidden";
}

// Function to move the player based on key input
function movePlayer(key, player) {
    let validMove = false;

    switch (key) {
        case 'ArrowUp':
            if (player.y > 0 && cells[player.x][player.y].walls.top === false) {
                player.y--;
                points++;
                validMove = true;
            }
            break;
        case 'ArrowDown':
            if (player.y < rows - 1 && cells[player.x][player.y].walls.bottom === false) {
                player.y++;
                points++;
                validMove = true;
            }
            break;
        case 'ArrowLeft':
            if (player.x > 0 && cells[player.x][player.y].walls.left === false) {
                player.x--;
                points++;
                validMove = true;
            }
            break;
        case 'ArrowRight':
            if (player.x < cols - 1 && cells[player.x][player.y].walls.right === false) {
                player.x++;
                points++;
                validMove = true;
            }
            break;
    }

    // Check if player reaches the end cell (win condition)
    if (player.x == cols - 1 && player.y == rows - 1) {
        document.removeEventListener('keydown', handleKeyPress);
        const messageBox = document.getElementById('win-message');
        messageBox.style.display = "flex";
    }
}

// Function to clear the canvas
function clearScreen() {
    pen.canvas.width = pen.canvas.width;
}

// Array to store maze cells
const cells = [];

// Initialize cells with null values
for (let x = 0; x < rows; x++) {
    cells[x] = [];
    for (let y = 0; y < cols; y++) {
        cells[x][y] = null;
    }
}

// Class representing a maze cell
class CellA {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
    }

    // Method to display the walls of the cell
    show() {
        const x = this.x * cellSize;
        const y = this.y * cellSize;

        pen.beginPath();

        if (this.walls.top) {
            pen.moveTo(x, y);
            pen.lineTo(x + cellSize, y);
        }
        if (this.walls.right) {
            pen.moveTo(x + cellSize, y);
            pen.lineTo(x + cellSize, y + cellSize);
        }
        if (this.walls.bottom) {
            pen.moveTo(x + cellSize, y + cellSize);
            pen.lineTo(x, y + cellSize);
        }
        if (this.walls.left) {
            pen.moveTo(x, y + cellSize);
            pen.lineTo(x, y);
        }

        pen.strokeStyle = 'black';
        pen.lineWidth = '1px';
        pen.stroke();
    }
}

// Function to set up the maze
function setup() {
    // Initialize the cells
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            cells[x][y] = new CellA(x, y);
        }
    }

    // Generate the maze
    genMaze(0, 0);
}

// Function to recursively generate the maze
function genMaze(x, y) {
    const presentCell = cells[x][y];
    presentCell.visited = true;

    // Randomize the order in which directions are processed
    const directions = randomize(['top', 'right', 'bottom', 'left']);

    for (const direction of directions) {
        const dx = { top: 0, right: 1, bottom: 0, left: -1 }[direction];
        const dy = { top: -1, right: 0, bottom: 1, left: 0 }[direction];

        const newX = x + dx;
        const newY = y + dy;

        // Check if the new coordinates are within bounds
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
            const neighbour = cells[newX][newY];

            // Remove walls between the present cell and its neighbour
            if (!neighbour.visited) {
                presentCell.walls[direction] = false;
                neighbour.walls[{ top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[direction]] = false;
                genMaze(newX, newY);
            }
        }
    }

    // Create a deep copy of the maze for later reference
    generatedMaze = cells.map(row => row.map(cell => ({ ...cell })));

    // Find a solution path through the maze
    solutionPath = solveMaze();
}

// Function to reset the player position and points
function resetPlayerPos() {
    player1.x = 0;
    player1.y = 0;
    points = 0;
    trail = [];
}

// Function to draw the maze and player movements
function draw() {
    clearScreen(); // Clear the canvas

    // Re-generate the maze
    genMaze(player1.x, player1.y);

    // Draw each cell of the maze
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            cells[x][y].show();
        }
    }

    // Draw the trail of the player
    trail.push({ x: player1.x, y: player1.y });
    pen.beginPath();
    for (let i = 0; i < trail.length; i++) {
        const trailX = trail[i].x * cellSize + cellSize / 2;
        const trailY = trail[i].y * cellSize + cellSize / 2;
        if (i === 0) {
            pen.moveTo(trailX, trailY);
        } else {
            pen.lineTo(trailX, trailY);
        }
    }
    pen.lineCap = "round";
    pen.strokeStyle = "white";
    pen.lineWidth = 2;
    pen.stroke();

    // Draw the player and end markers
    drawPlayer(player1);
    drawEnd();

    // Check if the player's current position is part of the solution path
    const isPartOfSolution = solutionPath.some(cell => cell.x === player1.x && cell.y === player1.y);

    // If not part of the solution, show restart message and reset player position
    if (!isPartOfSolution) {
        showRestartMessage();
        player1.x = 0;
        player1.y = 0;
        points = 0;
        trail = [];
        draw();
    }
}

// Function to draw the player marker
function drawPlayer(player) {
    const x = player.x * cellSize;
    const y = player.y * cellSize;

    pen.drawImage(player.image, x, y, cellSize, cellSize);
}

// Function to draw the end marker
function drawEnd() {
    const x = end.x * cellSize;
    const y = end.y * cellSize;

    pen.drawImage(end.image, x, y, cellSize, cellSize);
}

// Function to randomize array elements (Fisher-Yates shuffle)
function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to solve the maze using depth-first search (DFS)
function solveMaze() {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const path = [];

    function dfs(x, y) {
        if (x < 0 || x >= cols || y < 0 || y >= rows || visited[y][x]) {
            return false;
        }

        visited[y][x] = true;
        path.push({ x, y });

        if (x === cols - 1 && y === rows - 1) {
            return true; // Reached the end of the maze
        }

        const cell = generatedMaze[x][y];

        // Recursively visit neighbouring cells
        if (!cell.walls.top && dfs(x, y - 1)) {
            return true;
        }
        if (!cell.walls.right && dfs(x + 1, y)) {
            return true;
        }
        if (!cell.walls.bottom && dfs(x, y + 1)) {
            return true;
        }
        if (!cell.walls.left && dfs(x - 1, y)) {
            return true;
        }

        path.pop(); // Backtrack if no valid path found
        return false;
    }

    // Start DFS from the top-left corner of the maze
    dfs(0, 0);
    return path;
}

// Initial setup and drawing of the maze
setup();
draw();

/*--------------------------- CLOSE MAZE ---------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  // Event listener for the Override button click
  document.getElementById("close-maze-btn").addEventListener("click", function() {
      // Hide the slider-game-section and show the fight-section
      document.getElementById("maze-section").style.display = "none";
      document.getElementById("maciej-section").style.display = "flex";
  });
});

/*--------------------------- IMPOSSIBLE BUTTON ---------------------------*/

window.addEventListener('DOMContentLoaded', () => {
  const buttonWidth = 200;
  const buttonHeight = 40;
  
  const ImpossibleButton = document.getElementById('impossible-button');
  const maxWidth = window.innerWidth - buttonWidth;
  const maxHeight = window.innerHeight - buttonHeight;

  ImpossibleButton.addEventListener('click', () => alert('nah uh'))

  ImpossibleButton.addEventListener('mouseover', () => {
    ImpossibleButton.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    ImpossibleButton.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
  })
});

document.addEventListener("DOMContentLoaded", function() {
  // Event listener for the Override button click
  document.getElementById("mateusz").addEventListener("click", function() {
      // Hide the slider-game-section and show the fight-section
      document.getElementById("maciej-section").style.display = "none";
      document.getElementById("surprise-section").style.display = "flex";
  });
});

/*--------------------------- SURPRISE POPUP ---------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  // Create an overlay element
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = 6;
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  // Function to show popup and overlay
  function showPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
    overlay.style.display = "block";
  }

  // Add event listeners for surprise cards
  document.getElementById("surprise-1").addEventListener("click", function() {
    showPopup("surprise-1-popup");
  });

  document.getElementById("surprise-2").addEventListener("click", function() {
    showPopup("surprise-2-popup");
  });

  document.getElementById("surprise-3").addEventListener("click", function() {
    showPopup("surprise-3-popup");
  });
});