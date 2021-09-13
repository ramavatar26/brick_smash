import Paddle from "/src/paddle";
import Inputhandler from "/src/input";
import Ball from "/src/ball";

import {
  buildlevel,
  level1,
  level2,
  level3,
  level4,
  level5
} from "/src/levels";

const gamestate = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  newlevel: 4,
  levelscompleted: 5
};

export default class Game {
  constructor(gamewidth, gameheight) {
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;
    this.gamestate = gamestate.menu;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameobjects = [];
    this.bricks = [];
    this.lives = 3;

    this.levels = [level1, level2, level3, level4, level5];
    this.currentlevel = 0;

    new Inputhandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== gamestate.menu &&
      this.gamestate !== gamestate.newlevel
    )
      return;

    this.bricks = buildlevel(this, this.levels[this.currentlevel]);
    this.ball.reset();
    this.gameobjects = [this.ball, this.paddle];

    this.gamestate = gamestate.running;
  }

  update(deltatime) {
    if (this.lives === 0) this.gamestate = gamestate.gameover;

    if (
      this.gamestate === gamestate.paused ||
      this.gamestate === gamestate.menu ||
      this.gamestate === gamestate.gameover
    )
      return;

    if (this.bricks.length === 0) {
      this.currentlevel++;
      if (this.currentlevel >= this.levels.length) {
        this.gamestate = gamestate.levelscompleted;
      } else {
        this.gamestate = gamestate.newlevel;
        this.start();
      }
    }

    [...this.gameobjects, ...this.bricks].forEach((object) =>
      object.update(deltatime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedfordeletion);
  }

  draw(ctx) {
    [...this.gameobjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gamestate === gamestate.paused) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gamewidth / 2, this.gameheight / 2);
    }

    if (this.gamestate === gamestate.menu) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start the Game",
        this.gamewidth / 2,
        this.gameheight / 2
      );
    }

    if (this.gamestate === gamestate.gameover) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gamewidth / 2, this.gameheight / 2);
    }

    if (this.gamestate === gamestate.levelscompleted) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.fillText(
        "Congratulations! You completed all levels",
        this.gamewidth / 2,
        this.gameheight / 2
      );
    }
  }

  togglepause() {
    if (this.gamestate === gamestate.paused) {
      this.gamestate = gamestate.running;
    } else {
      this.gamestate = gamestate.paused;
    }
  }
}
