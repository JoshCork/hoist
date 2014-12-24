## 12/23/2014

### Identify the various classes you will need to write & identify properties each class must have to accomplish its tasks.

**Hero**
This is our character on scren that is doing the moving around. Assuming for now that there can be only one hero on the screen at a time.  Could change this for extra credit on the ruberic
Needs to have the following methods: 
	- moveForward (up arrow)
	- moveLeft (left arrow)
	- moveRight (right arrow)
	- reSpawn (start back at bottom of screen): for when a player has collided with an enemy. Should decrement the score move player back to a starting block. 
Needs the following properties
	- isAlive: have the just been hit by an enemy?
	- stepSize: can they move one block at a time or two?
	- lifeCount: number of lives they start with that you can then decrement from.
	- score: keeps track of the hero's score for making it across to the other side or the decrement for being hit by an enemy.

**Enemy** 
This is the enemy on screen. In the video these are some sweet bugs - starter class called them an ememy so I called them an enemy here.  

*Methods*
	- move: Can maybe re-use moveRight - really this is move forward because they are oriented to the right.

*Properties*
	- speed: In the video the bugs had a set speed (the same from left to right on the screen) but that speed was different for each bug. 

**MapBlock**
These are the blocks on the screen that the player moves across. They had different backgrounds and patterns. They are all the same size but the blocks all overlap except the very bottom ones.  

*Methods*
None - yet - for the exceeds on the ruberic thinking maybe a method like invokeShield where a particular block becomes safe for the hero.

*properties*
	- design: In the video there were three different designs.  These should probably be subclasses: cobbleStone, grass, water. --> after looking at the assetts I noticed that they were all the same size but look like they are overlapped on top of each other.  
	- isGoal: keeps track of whether or not to respawn the hero and increment the score
	- isStartingBlock: so I know where to respawn the player.

