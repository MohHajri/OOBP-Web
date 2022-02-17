# OOBPgame
JS Text-based game

Creating a text based game, which is executed from the command line. 
The game is a dungeon adventure where the player enters the DUNGEONS OF LORD OBJECT ORIENTUS!
The game implementation follows object oriented principles.


The game:

In the game there are currently three rooms and final portal each connected to each other. The game finishes when the user reaches the portal. 
The game starts from “the dungeon entrance”. 
Each room is represented as an object based on the same class. Below you can see the map of game rooms. 
Each room is connected to each other by doorways .  
The code is flexible regarding the number of rooms, doorways and enemies. 
The game structure supports basically unlimited (only by memory) number of rooms 
and each room has possibility of unlimited number of doorways connecting to different rooms. 
Each room should has the possibility of having multiple enemies inside.



Player:

Player object based on a class. The player is able to 
•	Move between rooms
•	Look around the room to see the doorways to other rooms and to see enemies in the room
•	Attack an enemy in the room

Player properties:

•	10 hit points
•	2 attack damage points
•	75% chance of attack hits

Enemies:

The game has two enemies. The enemy implementation is flexible to allow multiple different enemies to be created and multiple enemies being in each room.
Sewer Rat should be located in the “Hallway” room. Enemy should attack a player which enters the room and when the player looks around. 
Properties
•	2 hit points
•	1 attack damage point
•	50% chance of attack hits


Giant Dragon should be located in the “Chamber” room. Enemy attacks a player which enters the room and when the player looks around. 
Properties:

•	4 hit points
•	8 attack damage point
•	90% chance of attack hits


Combat mechanics:

When player or enemy attacks the attack success chance is based on the “chance of attack hits” property.
If the attack hits, the “attack damage points” should be subtracted from target hitpoint value. If hitpoints go to zero or below, the target is destroyed. 

Game End:

The game ends when the player reaches the portal OR player hitpoints go to zero.
