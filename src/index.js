import "./styles.css";
import Game from "./game";

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

const game_width = 800;
const game_height = 600;

let game = new Game(game_width, game_height);

let lasttime = 0;

function gameloop(timestamp) {
  let deltatime = timestamp - lasttime;
  lasttime = timestamp;

  ctx.clearRect(0, 0, game_width, game_height);

  game.update(deltatime);
  game.draw(ctx);

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
