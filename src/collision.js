export function detectcollision(ball, gameobject){
  let bottomofball = ball.position.y + ball.size;
  let topofball = ball.position.y;
  let topofobject = gameobject.position.y;
  let leftsideofobject = gameobject.position.x;
  let rightsideofobject = gameobject.position.x + gameobject.width;
  let bottomofobject = gameobject.position.y+gameobject.height;

  if (
    bottomofball >= topofobject &&
    topofball <= bottomofobject &&
    ball.position.x >= leftsideofobject &&
    ball.position.x + ball.size <= rightsideofobject
  ) {
    return true;
  }else{
    return false;
  }
}