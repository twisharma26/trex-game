function reset() {
  gamestate = "play";
  obstacles.destroyEach();
  cloud1.destroyEach();
  trex.changeAnimation("running", trexanimation);
  gameOver.visible = false;
  restart1.visible = false;
  score = 0;
}
