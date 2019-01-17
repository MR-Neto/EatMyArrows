# KillThemAll

Description
This is final project of the first module of Ironhack's web dev bootcamp. In this game the main objective is avoiding that the enemies enter and destroy your castle. The user can shoot arrows to kill enemies with a archer on top of a watchtower. Other screens consist of a splash screen to intro the game and a end screen (gameover/win) to complete the game.    

MVP (DOM - CANVAS)
Canvas

MVP definition, deliverables.
The MVP will feature:
-A splashscreen to start the game;
-A game screen, based on HTML Canvas;
-Game dynamics, including movements, tracking the health of the castle, pointing and shooting arrows;
-A screen to display the result of the game (victory/defeat).

Backlog
-Increase the number of enemies.
-Intructions in splashscreen.
-Create levels.
-Increase the number of archers.
-Implement level-up of archers, arrows, castle.
-Implement diferent enemies.
-Implement enemy castle.
-Play medieval music.

Data structure
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

States y States Transitions
There will be 3 states:
-Splash screen, 
-Game screen,
-End screen (Gameover/Win screen).

Each will have a respective screen (showSplash(),showGame(),showEndScreen()).

SplashScreen will have button to start game. 
End screen will have a button to restart game.
