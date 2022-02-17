/* -Feature: PLayer is able to go back to the previous room
and he/she will get attacked or attack if there is an ememy there.

-Feature: PLayer, wanting to attack, will get an option of "No enemy, click to go back"
if there is no enemy inside the room.
*/

/* 
- new Rooms and its ememy can be added to MyRoomo array of objects
- enemy properties can be added to OurPlayer array of objects.
*/

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
      MyRooms.SettingUpOptions();
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
class Roomo {
  constructor(value, enemy) {
    this.value = value;
    this.enemy = enemy;
  }

  async SettingUpOptions() {
    for (let i = 0; i < TotalRoomNum; i++) {
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        //First Room - one option (one doorway forward.)
        case MyRoomo[0].value:
          Options = [];
          Options.push({ title: MyRoomo[1].value, value: MyRoomo[1].value });
          break;
        //Last Room - one option (to exit the game)
        case MyRoomo[TotalRoomNum].value:
          Options = [];
          Options.push({
            title: MyRoomo[TotalRoomNum].value,
            value: MyRoomo[TotalRoomNum].value,
          });
          break;
        //Any Room (even 100th room) - twp options
        case MyRoomo[i].value:
          Options = [];
          Options.push(
            {
              title: MyRoomo[i + 1].value,
              value: MyRoomo[i + 1].value,
            },
            {
              title: MyRoomo[i - 1].value,
              value: MyRoomo[i - 1].value,
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
    let R_Index = MyRoomo.map((e) => e.value).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    console.log("you move to " + Response.value);
    if (MyRoomo[R_Index].enemy != undefined) {
      Myplayer.EnemyAttack();
      gameLoop();
    } else {
      if (Response.value == MyRoomo[TotalRoomNum].value) {
        console.log("WINNER !");
        process.exit();
      } else {
        gameLoop();
      }
    }
  }

  async SettigEnemyOptions() {
    let R_Index = MyRoomo.map((e) => e.value).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (MyRoomo[R_Index].enemy != undefined) {
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        case MyRoomo[R_Index].value:
          Choices = [];
          Choices.push({
            title: MyRoomo[R_Index].enemy,
            value: MyRoomo[R_Index].enemy,
          });
          break;
      }
    } else {
      Choices = [];
      Choices.push({
        title: "No enemy! click to go back",
        value: MyRoomo[R_Index].enemy,
      });
    }
    const Reply = await prompts({
      type: "select",
      name: "value",
      message: "\n\nWhich enemy do you want to attack ? ",
      choices: Choices,
    });

    if (
      MyRoomo[R_Index].enemy !== undefined &&
      Reply.value == MyRoomo[R_Index].enemy
    ) {
      console.log(
        "You bravely attacked " +
          MyRoomo[R_Index].enemy +
          " with your sharp sword "
      );
      Myplayer.AttackingEnemy(2, 75);
      gameLoop();
    } else {
      gameLoop();
    }
  }
  LookAround() {
    if (CurrentRoomTracker.length == 0) {
      console.log(
        "\nYou are in Dengon Entrance right now. \nThere are doors leading to: \nHallway"
      );
    }
    switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
      case MyRoomo[0].value:
        console.log(
          "You are in Dengon Entrance right now. \nThere are doors leading to: \nHallway "
        );
        break;
      case MyRoomo[1].value:
        console.log(
          "\nYou are in Hallway right now! \nThere are doorways leading to: \nChamber\nDungeon Entrance"
        );
        console.log("\nThere is Sewer Rat ready to attack you be careful");
        Myplayer.EnemyAttack();
        break;
      case MyRoomo[2].value:
        console.log(
          "\nYou are in Chamber right now! There are doorways leading to: \nPortal \nHallway"
        );
        console.log("\nThere is Giant Dragon ready to attack you! Be careful");
        Myplayer.EnemyAttack();
        break;
      //Any Room!
      default:
        console.log("Nothing is there !");
        break;
    }
    gameLoop();
  }
}

let MyRooms = new Roomo();
let MyRoomo = [
  new Roomo("DengeonEntrance"),
  new Roomo("Hallway", "Sewer Rat"),
  new Roomo("Chamber", "Gaint Dragon"),
  new Roomo("Portal"),
  //new Roomo("Tunnel", "Dog"),
  //new Roomo("Cave"),
  //new Roomo("Bridge"),
];
let TotalRoomNum = MyRoomo.length - 1;
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
