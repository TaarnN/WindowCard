const Phaser = require("phaser");

const gameWidth = 850;
const gameHeight = 600;

const config = {
  type: Phaser.AUTO,
  width: 850, // Initial width
  height: 600, // Initial height
  scale: {
    mode: Phaser.Scale.FIT, // Fit the game to the screen while preserving aspect ratio
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game in the window
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  parent: "game-container",
  backgroundColor: "#fafafa",
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("vite", "assets/vite.svg");
}

function create() {
  this.add.image(gameWidth / 2, gameHeight / 2, "vite"); // Example of adding an image
}

function update() {
  // Game logic here
}
