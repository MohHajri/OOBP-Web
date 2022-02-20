/*-Feature: PLayer, wanting to attack, will get an option of "No enemy, click to go back"
if there is no enemy inside the room.
- new Rooms and its ememy and its dorways can be added to OurRooms array of objects
- the new enemy properties can be added to OurEnemies array of objects.
*/

const prompts = require("prompts");
let CurrentRoomTracker = new Array();
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
  constructor(RoomValue, doorways, EnemyValue) {
    this.RoomValue = RoomValue;
    this.doorways = doorways;
    this.EnemyValue = EnemyValue;
  }
  async SettingRoomOptions() {
    for (let i = 0; i < TotalRoomNum; i++) {
      if (
        CurrentRoomTracker[CurrentRoomTracker.length - 1] ==
        OurRooms[i].RoomValue
      ) {
        Options = [];
        for (let x = 0; x < OurRooms[i].doorways.length; x++) {
          Options.push({
            title: OurRooms[OurRooms[i].doorways[x]].RoomValue,
            value: OurRooms[OurRooms[i].doorways[x]].RoomValue,
          });
        }
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
      MyEnemy.EnemyAttack();
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
      MyEnemy.AttackingEnemy(2, 75);
      gameLoop();
    } else {
      gameLoop();
    }
  }
  LookAround() {
    let R_Index = OurRooms.map((e) => e.RoomValue).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    for (let i = 0; i < TotalRoomNum; i++) {
      if (
        CurrentRoomTracker[CurrentRoomTracker.length - 1] ==
        OurRooms[i].RoomValue
      ) {
        console.log(
          "\nYou are in " +
            OurRooms[R_Index].RoomValue +
            " right now!\nThere are doorways leading to: \n"
        );

        for (let x = 0; x < OurRooms[i].doorways.length; x++) {
          console.log(OurRooms[OurRooms[i].doorways[x]].RoomValue);
        }
      }
    }
    if (OurRooms[R_Index].EnemyValue != undefined) {
      console.log(
        "\nThere is " +
          OurRooms[R_Index].EnemyValue +
          " ready to attack you! Be careful"
      );
      MyEnemy.EnemyAttack();
    }
    gameLoop();
  }
}
let MyRooms = new Rooms();
let OurRooms = [
  new Rooms("DengeonEntrance", [1]),
  new Rooms("Hallway", [0, 2, 3], "Sewer Rat"),
  new Rooms("Chamber", [0, 1, 3], "Gaint Dragon"),
  new Rooms("Portal", [3]),
  //new Rooms("Tunnel", "Dog"),
  //new Rooms("Cave"),
  //new Rooms("Bridge"),
];
let TotalRoomNum = OurRooms.length - 1;
let PHP = 10;
class Enemy {
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
    let P_Index = OurEnemies.map((e) => e.RoomName).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (
      OurEnemies[P_Index].EnemyHitPoint > 0 &&
      CurrentRoomTracker[CurrentRoomTracker.length - 1] ===
        OurEnemies[P_Index].RoomName
    ) {
      if (
        Math.floor(Math.random() * 100) < OurEnemies[P_Index].EnemyHitChance
      ) {
        console.log("You got attacked by " + OurEnemies[P_Index].EnemyName);
        PHP -= OurEnemies[P_Index].EnemyAttackDamage;
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
          OurEnemies[P_Index].EnemyName + " didn't hit you this time! Bad Shot!"
        );
      }
    }
  }
  AttackingEnemy(PA, PHC) {
    let P_Index = OurEnemies.map((e) => e.RoomName).indexOf(
      CurrentRoomTracker[CurrentRoomTracker.length - 1]
    );
    if (
      CurrentRoomTracker[CurrentRoomTracker.length - 1] ==
      OurEnemies[P_Index].RoomName
    ) {
      if (
        Math.floor(Math.random() * 100) < PHC &&
        OurEnemies[P_Index].EnemyHitPoint > 0
      ) {
        console.log("You hit the " + OurEnemies[P_Index].EnemyName);
        OurEnemies[P_Index].EnemyHitPoint -= PA;
        console.log(
          " The enemy now has " +
            OurEnemies[P_Index].EnemyHitPoint +
            " hit point(s)"
        );
      } else {
        if (
          Math.floor(Math.random() * 100) < PHC &&
          OurEnemies[P_Index].EnemyHitPoint > 0
        ) {
          console.log(" Attacking the enemy failed! not on spot!");
        }
      }
      if (OurEnemies[P_Index].EnemyHitPoint > 0) {
        console.log(
          "Enemy still has some hit points. Enemy is launching the strike NOW!"
        );
        MyEnemy.EnemyAttack();
      }
      if (OurEnemies[P_Index].EnemyHitPoint <= 0) {
        console.log(
          OurEnemies[P_Index].EnemyName + " is dead!. You can not attack !"
        );
      }
    }
  }
}
let MyEnemy = new Enemy();
let OurEnemies = [
  new Enemy("Hallway", "Sewer Rat", 1, 50, 2),
  new Enemy("Chamber", "Gaint Dragon", 8, 90, 4),
  //new Enemy("Tunnel", "Dog", 1, 30, 2),
];
