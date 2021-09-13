import { detectcollision } from "/src/collision";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gamewidth = game.gamewidth;
    this.gameheight = game.gameheight;

    this.game = game;
    this.size = 16;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 2, y: -2 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltatime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //wall on left or right
    if (this.position.x + this.size > this.gamewidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    //wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //wall on bottom
    if (this.position.y + this.size > this.gameheight) {
      this.game.lives--;
      this.reset();
    }

    //collision with paddle

    if (detectcollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
