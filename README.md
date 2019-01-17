# KillThemAll

<h2>Description</h2>
<p>This is final project of the first module of Ironhack's web dev bootcamp. In this game the main objective is avoiding that the enemies enter and destroy your castle. The user can shoot arrows to kill enemies with a archer on top of a watchtower. Other screens consist of a splash screen to intro the game and a end screen (gameover/win) to complete the game.</p>

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

<ul>
  <li>Increase the number of enemies./li>
  <li>Intructions in splashscreen.</li>
  <li>Create levels.</li>
  <li>Increase the number of archers.</li>
  <li>Implement level-up of archers, arrows, castle.</li>
  <li>Implement diferent enemies.</li>
  <li>Implement enemy castle.</li>
  <li>Play medieval music.</li>
</ul>

<h2>Data structure</h2>
<p>MVP will include the following classes(with respective methods):</p> 

<h4>Game Class:</h4>
<ul>
    <li>clearCanvas()</li>
    <li>createEnemy()</li>
    <li>update()</li>
    <li>drawCanvas()</li>
    <li>start()</li>
    <li>stop()</li>
    <li>KeyEnter()</li>
    <li>KeyUp()</li>
    <li>KeyDown()</li>
</ul>

<h4>Castle Class:</h4>
<ul>
    <li>isCastleStanding()</li>
    <li>setCastleStatus()</li>
    <li>update()</li>
    <li>draw()</li>
</ul>
  
<h4>Archer Class:</h4>
<ul>
    <li>shootArrow()</li>
    <li>aimUp()</li>
    <li>aimDown()</li>
    <li>draw()</li>
</ul> 

<h4>Enemy Class:</h4>
<ul>
    <li>update()</li>
    <li>checkCastleInvasion()</li>
    <li>draw()</li>
</ul> 

<h4>Arrow Class:</h4>
<ul>
    <li>update()</li>
    <li>checkColide()</li>
    <li>draw()</li>
</ul> 
  
<h2>States y States Transitions</h2>
<p>There will be 3 states:</p>
<ul>
    <li>Splash screen,</li>
    <li>Game screen,</li>
    <li>End screen (Gameover/Win screen).</li>
</ul> 

Each will have a respective screen (showSplash(),showGame(),showEndScreen()).
SplashScreen will have button to start game. 
End screen will have a button to restart game.

<h2>To-do</h2>
<ul>
    <li>SplashScreen HTML and CSS</li>
    <li>EndScreen HTML and CSS</li>
    <li>Gamescreen HTML</li>
    <li>showSplash() and showEndScreen() methods</li>
    <li>Create Main.JS</li>
    <li>Create Game.JS with clearCanvas(), drawCanvas(), start()</li>
    <li>Create Castle.JS</li>
    <li>Game.JS update()</li>
    <li>Create Archer.JS</li>
    <li>Create Arrow.JS</li>
    <li>Game.JS update(),KeyEnter(),KeyUp(),KeyDown()</li>
    <li>Create Enemy.JS</li>
    <li>Game.JS update(),createEnemy()</li>
    <li>Game.JS stop() and stopGameHandler()</li>
</ul>
