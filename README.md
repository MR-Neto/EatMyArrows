# KillThemAll

<h2>Description</h2>
This is final project of the first module of Ironhack's web dev bootcamp. In this game the main objective is avoiding that the enemies enter and destroy your castle. The user can shoot arrows to kill enemies with a archer on top of a watchtower. Other screens consist of a splash screen to intro the game and a end screen (gameover/win) to complete the game.<br>    

<h2>MVP (DOM - CANVAS)</h2>
Canvas

<h2> definition, deliverables.</h2>
The MVP will feature:
<ul>
  <li>A splashscreen to start the game;</li>
  <li>A game screen, based on HTML Canvas;</li>
  <li>Game dynamics, including movements, tracking the health of the castle, pointing and shooting arrows;</li>
  <li>A screen to display the result of the game (victory/defeat).</li>
</ul>

<h2>Backlog</h2>
-Increase the number of enemies.
-Intructions in splashscreen.
-Create levels.
-Increase the number of archers.
-Implement level-up of archers, arrows, castle.
-Implement diferent enemies.
-Implement enemy castle.
-Play medieval music.

<h2>Data structure</h2>
The MVP will include the following classes(with respective methods).
-Game Class:
  clearCanvas()
  createEnemy()
  update()
  drawCanvas()
  start()
  stop()
  KeyEnter()
  KeyUp()
  KeyDown()

-Castle Class:
  isCastleStanding()
  setCastleStatus()
  update()
  draw()

-Archer Class:
  shootArrow()
  aimUp()
  aimDown()
  draw()

-Enemy Class:
  update()
  checkCastleInvasion()
  draw()
  
-Arrow Class:
  update()
  draw()
  checkColide(enemy)

<h2>States y States Transitions</h2>
There will be 3 states:
-Splash screen, 
-Game screen,
-End screen (Gameover/Win screen).

Each will have a respective screen (showSplash(),showGame(),showEndScreen()).

SplashScreen will have button to start game. 
End screen will have a button to restart game.
