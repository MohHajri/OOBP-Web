/* -Feature: PLayer is able to go back to the previous room
and he/she will get attacked or attack if there is an ememy there.

-Feature: PLayer, wanting to attack, will get an option of "No enemy, click to go back"
if there is no enemy inside the room.
*/

/* 
- new Rooms and its ememy can be added to OurRooms array of objects
- the new enemy properties can be added to OurPlayer array of objects.
*/

/* The game ends when the player reaches Portal (last room) 
OR when the player hitpoints go to zero so enemies can not be added to the
last room*/

const prompts = require("prompts");
let CurrentRoomTracker = new Array();
let currentCommand = new Array();
CurrentRoomTracker = ["DengeonEntrance"];
async function gameLoop() {
  const initialActionChoices = [
    { title: "Look around", value: "look" },
    { title: "Go to Room", value: "goToRoom" },
    { title: "Attack", value: "attack" },
    { title: "Exit game", value: "exit" },
  ];

  const response = await prompts({
    type: "select",
    name: "value",
    message: "Choose your action",
    choices: initialActionChoices,
  });
  console.log("You selected " + response.value);
  currentCommand.push(response.value);

  switch (response.value) {
    case "goToRoom":
      MyRooms.SettingRoomOptions();
      break;
    case "attack":
      MyRooms.SettigEnemyOptions();
      break;
    case "look":
      MyRooms.LookAround();
      break;
    case "exit":
      process.exit();
  }
}

process.stdout.write("\033c"); // clear screen on windows

console.log("WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!");
console.log("================================================");
console.log("You walk down the stairs to the dungeons");
gameLoop();

let Options = new Array();
let Choices = new Array();
class Rooms {
  constructor(RoomValue, EnemyValue) {
    this.RoomValue = RoomValue;
    this.EnemyValue = EnemyValue;
  }

  async SettingRoomOptions() {
    for (let i = 0; i < TotalRoomNum; i++) {
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        //First Room - one option (one doorway forward.)
        case OurRooms[0].RoomValue:
          Options = [];
          Options.push({
            title: OurRooms[1].RoomValue,
            value: OurRooms[1].RoomValue,
          });
          break;
        //Last Room - one option (to exit the game)
        case OurRooms[TotalRoomNum].RoomValue:
          Options = [];
          Options.push({
            title: OurRooms[TotalRoomNum].RoomValue,
            value: OurRooms[TotalRoomNum].RoomValue,
          });
          break;
        //Any Room (even 100th room) - twp options
        case OurRooms[i].RoomValue:
          Options = [];
          Options.push(
            {
              title: OurRooms[i + 1].RoomValue,
              value: OurRooms[i + 1].RoomValue,
            },
            {
              title: OurRooms[i - 1].RoomValue,
              value: OurRooms[i - 1].RoomValue,
            }
          );
          break;
      }
    }
    const Response = await prompts({
      type: "select",
      name: "value",
      message: "\n\nWhich room do you want to go to? ",
      choices: Options,
    });
    CurrentRoomTracker.push(Response.value);
    let R_Index = OurRooms.map((e) => e.RoomValue).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    console.log("you move to " + Response.value);
    if (OurRooms[R_Index].EnemyValue != undefined) {
      Myplayer.EnemyAttack();
      gameLoop();
    } else {
      if (Response.value == OurRooms[TotalRoomNum].RoomValue) {
        console.log("WINNER !");
        process.exit();
      } else {
        gameLoop();
      }
    }
  }

  async SettigEnemyOptions() {
    let R_Index = OurRooms.map((e) => e.RoomValue).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (OurRooms[R_Index].EnemyValue != undefined) {
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        case OurRooms[R_Index].RoomValue:
          Choices = [];
          Choices.push({
            title: OurRooms[R_Index].EnemyValue,
            value: OurRooms[R_Index].EnemyValue,
          });
          break;
      }
    } else {
      Choices = [];
      Choices.push({
        title: "No enemy! click to go back",
        value: OurRooms[R_Index].EnemyValue,
      });
    }
    const Reply = await prompts({
      type: "select",
      name: "value",
      message: "\n\nWhich enemy do you want to attack ? ",
      choices: Choices,
    });

    if (
      OurRooms[R_Index].EnemyValue !== undefined &&
      Reply.value == OurRooms[R_Index].EnemyValue
    ) {
      console.log(
        "You bravely attacked " +
          OurRooms[R_Index].EnemyValue +
          " with your sharp sword "
      );
      Myplayer.AttackingEnemy(2, 75);
      gameLoop();
    } else {
      gameLoop();
    }
  }
  LookAround() {
    let R_Index = OurRooms.map((e) => e.RoomValue).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    // Frist room has one doorway. this condition is for such a purpose!
    if (R_Index == 0) {
      console.log(
        "\nYou are in " +
          OurRooms[R_Index].RoomValue +
          " right now! \nThere are doorways leading to: \n" +
          OurRooms[R_Index + 1].RoomValue
      );
    }
    //Any other room!
    else {
      console.log(
        "\nYou are in " +
          OurRooms[R_Index].RoomValue +
          " right now! \nThere are doorways leading to: \n" +
          OurRooms[R_Index + 1].RoomValue +
          "\n" +
          OurRooms[R_Index - 1].RoomValue
      );
    }
    if (OurRooms[R_Index].EnemyValue != undefined) {
      console.log(
        "\nThere is " +
          OurRooms[R_Index].EnemyValue +
          " ready to attack you! Be careful"
      );
      Myplayer.EnemyAttack();
    }
    gameLoop();
  }
}

let MyRooms = new Rooms();
let OurRooms = [
  new Rooms("DengeonEntrance"),
  new Rooms("Hallway", "Sewer Rat"),
  new Rooms("Chamber", "Gaint Dragon"),
  new Rooms("Portal"),
  //new Rooms("Tunnel", "Dog"),
  //new Rooms("Cave"),
  //new Rooms("Bridge"),
];
let TotalRoomNum = OurRooms.length - 1;
let PHP = 10;
class Player {
  constructor(
    RoomName,
    EnemyName,
    EnemyAttackDamage,
    EnemyHitChance,
    EnemyHitPoint
  ) {
    this.RoomName = RoomName;
    this.EnemyName = EnemyName;
    this.EnemyAttackDamage = EnemyAttackDamage;
    this.EnemyHitChance = EnemyHitChance;
    this.EnemyHitPoint = EnemyHitPoint;
  }

  EnemyAttack() {
    let P_Index = OurPlayer.map((e) => e.RoomName).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (
      OurPlayer[P_Index].EnemyHitPoint > 0 &&
      CurrentRoomTracker[CurrentRoomTracker.length - 1] ===
        OurPlayer[P_Index].RoomName
    ) {
      if (Math.floor(Math.random() * 100) < OurPlayer[P_Index].EnemyHitChance) {
        console.log("You got attacked by " + OurPlayer[P_Index].EnemyName);
        PHP -= OurPlayer[P_Index].EnemyAttackDamage;
        console.log("You have " + PHP + " hit point(s) remaining");
        if (PHP > 0) {
          console.log("\n You did not die YET Keep up !");
        } else {
          console.log("TOO BAD!! You have " + PHP + " hit point(s) ");
          console.log("\nYou are dead ! Rest in peace, warrior! ...");
          process.exit();
        }
      } else {
        console.log(
          OurPlayer[P_Index].EnemyName + " didn't hit you this time! Bad Shot!"
        );
      }
    }
  }

  AttackingEnemy(PA, PHC) {
    let P_Index = OurPlayer.map((e) => e.RoomName).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (
      CurrentRoomTracker[CurrentRoomTracker.length - 1] ==
      OurPlayer[P_Index].RoomName
    ) {
      if (
        Math.floor(Math.random() * 100) < PHC &&
        OurPlayer[P_Index].EnemyHitPoint > 0
      ) {
        console.log("You hit the " + OurPlayer[P_Index].EnemyName);
        OurPlayer[P_Index].EnemyHitPoint -= PA;
        console.log(
          " The enemy now has " +
            OurPlayer[P_Index].EnemyHitPoint +
            " hit point(s)"
        );
      } else {
        if (
          Math.floor(Math.random() * 100) < PHC &&
          OurPlayer[P_Index].EnemyHitPoint > 0
        ) {
          console.log(" Attacking the enemy failed! not on spot!");
        }
      }
      if (OurPlayer[P_Index].EnemyHitPoint > 0) {
        console.log(
          "Enemy still has some hit points. Enemy is launching the strike NOW!"
        );
        Myplayer.EnemyAttack();
      }
      if (OurPlayer[P_Index].EnemyHitPoint <= 0) {
        console.log(
          OurPlayer[P_Index].EnemyName + " is dead!. You can not attack !"
        );
      }
    }
  }

  ExitGame() {
    if (PHP <= 0) {
      console.log("No Hitpoints. Ending the game!");
      process.exit();
    }
  }
}
let Myplayer = new Player();
let OurPlayer = [
  new Player("Hallway", "Sewer Rat", 1, 50, 2),
  new Player("Chamber", "Gaint Dragon", 8, 90, 4),
  //new Player("Tunnel", "Dog", 1, 30, 2),
];
