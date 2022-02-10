// MAIN CODE !!!

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
  // VERY IMPORTANT
  //
  //console.log(currentCommand);

  switch (response.value) {
    case "goToRoom":
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        case "DengeonEntrance":
          MyRooms.SettingUpOptions("DengeonEntrance");
          break;
        case "Hallway":
          MyRooms.SettingUpOptions("Hallway");

          break;
        case "Chamber":
          MyRooms.SettingUpOptions("Chamber");

          break;
        case "Portal":
          MyRooms.SettingUpOptions("Portal");
          break;
        default:
          console.log("Game Over");
          console.log("WINNER !");
          process.exit();
      }

      break;
    case "attack":
      switch (CurrentRoomTracker[CurrentRoomTracker.length - 1]) {
        case "Hallway":
          if (EHPArray[EHPArray.length - 1] > 0) {
            MyRooms.SettigEnemyOptions("Sewer Rat");
          } else {
            console.log("NO ENEMY");
            gameLoop();
          }
          break;
        case "Chamber":
          if (EHPArray2[EHPArray2.length - 1] > 0) {
            MyRooms.SettigEnemyOptions("Giant Dragon");
          } else {
            console.log("NO ENEMY");
            gameLoop();
          }
          break;
        default:
          console.log("NO ENEMY!");
          gameLoop();
          break;
      }
      First.ExitGame();
      break;
    case "look":
      First.LookAround(CurrentRoomTracker[CurrentRoomTracker.length - 1]);

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
  SettingUpOptions(roomName) {
    if (roomName == "DengeonEntrance") {
      Options = [];
      Options.push({ title: "Hallway", value: "Hallway" });
    } else if (roomName == "Hallway") {
      Options = [];
      Options.push(
        { title: "DengeonEntrance", value: "DengeonEntrance" },
        { title: "Chamber", value: "Chamber" }
      );
    } else if (roomName == "Chamber") {
      Options = [];
      Options.push(
        { title: "Hallway", value: "Hallway" },
        { title: "Protal", value: "Protal" }
      );
    } else if (roomName == "Protal") {
      Options = [];
      Options.push({ title: "Protal", value: "Protal" });
    }

    async function Loops() {
      Options;
      const Response = await prompts({
        type: "select",
        name: "value",
        message: "\n\nWhich room do you want to go to? ",
        choices: Options,
      });
      switch (Response.value) {
        case "DengeonEntrance":
          console.log("you move to " + Response.value);
          CurrentRoomTracker.push(Response.value);
          gameLoop();
          break;
        case "Hallway":
          console.log("you move to " + Response.value);
          CurrentRoomTracker.push(Response.value);
          Second.EnemyAttack("Sewer Rat", 1, 50, "Hallway");
          gameLoop();
          break;
        case "Chamber":
          console.log("you move to  " + Response.value);
          CurrentRoomTracker.push(Response.value);
          Second.EnemyAttack("Dragon", 8, 90, "Chamber");
          gameLoop();
          break;
        case "Protal":
          console.log("you move to " + Response.value);
          console.log(" click again on Go-To-Room to make your victory ");
          CurrentRoomTracker.push(Response.value);
          gameLoop();
          break;
      }
    }
    Loops();
  }

  SettigEnemyOptions(EnemyName) {
    if (EnemyName == "Sewer Rat") {
      Choices = [];
      Choices.push({ title: "Sewer Rat", value: "Sewer Rat" });
    } else if (EnemyName == "Giant Dragon") {
      Choices = [];
      Choices.push({ title: "Giant Dragon", value: "Giant Dragon" });
    }

    async function EnemyLoop() {
      Choices;
      const Reply = await prompts({
        type: "select",
        name: "value",
        message: "\n\nWhich enemy do you want to attack ? ",
        choices: Choices,
      });
      switch (Reply.value) {
        case "Sewer Rat":
          console.log(
            "You bravely attacked Small Sewer Rat with your sharp sword "
          );
          First.AttackingEnemy("Rat", 1, 50, "Hallway");
          gameLoop();
          break;
        case "Giant Dragon":
          console.log(
            "You bravely attacked Giant Dragon with your sharp sword "
          );
          Second.AttackingEnemy("Dragon", 8, 90, "Chamber");
          gameLoop();
          break;
      }
    }
    EnemyLoop();
  }
}
let MyRooms = new Rooms();

let DungeonAdventureRooms = ["DengeonEntrance", "Hallway", "Chamber", "Portal"];
let EHPArray = new Array();
let EHPArray2 = new Array();
EHPArray = [2];
EHPArray2 = [4];

class Player {
  constructor(PHP, PA, PHC, EHP) {
    this.PlayerHitPoint = PHP;
    this.PlayerAttakDamage = PA;
    this.PLayerHitChance = PHC;
    this.EnemyHitPoint = EHP;
  }
  EnemyAttack(EnemyName, EnemyAttackDamage, EnemyHitChance, RoomName) {
    if (
      this.EnemyHitPoint > 0 &&
      CurrentRoomTracker[CurrentRoomTracker.length - 1] == RoomName
    ) {
      if (Math.floor(Math.random() * 100) < EnemyHitChance) {
        console.log("You got attacked by " + EnemyName);
        this.PlayerHitPoint -= EnemyAttackDamage;
        console.log(
          "You have " + this.PlayerHitPoint + " hit point(s) remaining"
        );
        if (this.PlayerHitPoint > 0) {
          console.log("\n You did not die YET Keep up !");
        } else {
          console.log(
            "TOO BAD!! You have " + this.PlayerHitPoint + " hit point(s) "
          );
          console.log("\nYou are dead ! Rest in peace, warrior! ...");
          process.exit();
        }
      } else {
        console.log(EnemyName + " didn't hit you this time! Bad Shot!");
      }
    }
  }

  AttackingEnemy(EnemyName, EnemyAttackDamage, EnemyHitChance, RoomName) {
    if (CurrentRoomTracker[CurrentRoomTracker.length - 1] == RoomName) {
      if (
        Math.floor(Math.random() * 100) < this.PLayerHitChance &&
        this.EnemyHitPoint > 0
      ) {
        console.log("You hit the " + EnemyName);
        this.EnemyHitPoint -= this.PlayerAttakDamage;
        EHPArray.push(this.EnemyHitPoint);
        if (RoomName == "Chamber") {
          EHPArray2.push(this.EnemyHitPoint);
        }
        console.log(
          " The enemy now has " + this.EnemyHitPoint + " hit point(s)"
        );
        if (this.EnemyHitPoint <= 0) {
          console.log("Enemy is dead!");
        }
      } else {
        if (Math.floor(Math.random() * 100) < this.PLayerHitChance) {
          console.log(" Attacking the enemy failed! not on spot!");
        }
      }
      if (this.EnemyHitPoint > 0) {
        console.log(
          "Enemy still has some hit points. Enemy is launching the strike NOW!"
        );
        First.EnemyAttack(
          EnemyName,
          EnemyAttackDamage,
          EnemyHitChance,
          RoomName
        );
      }
    }
  }

  LookAround(roomName) {
    if (CurrentRoomTracker.length == 0) {
      console.log(
        "\nYou are in Dengon Entrance right now. \nThere are doors leading to: \nHallway"
      );
    }
    switch (roomName) {
      case DungeonAdventureRooms[0]:
        console.log(
          "You are in Dengon Entrance right now. \nThere are doors leading to: \nHallway "
        );
        break;
      case DungeonAdventureRooms[1]:
        console.log(
          "\nYou are in Hallway right now! \nThere are doorways leading to: \nChamber\nDungeon Entrance"
        );
        console.log("\nThere is Sewer Rat ready to attack you be careful");
        First.EnemyAttack("Rat", 1, 50, "Hallway");
        break;
      case DungeonAdventureRooms[2]:
        console.log(
          "\nYou are in Chamber right now! There are doorways leading to: \nPortal \nHallway"
        );
        console.log("\nThere is Giant Dragon ready to attack you! Be careful");
        Second.EnemyAttack("Gaint Dragon", 8, 90, "Chamber");
        break;
      case DungeonAdventureRooms[3]:
        console.log("\nYou won");
        break;
    }
    gameLoop();
  }

  ExitGame() {
    if (this.PlayerHitPoint <= 0) {
      console.log("No Hitpoints. Ending the game!");
      process.exit();
    }
  }
}
let First = new Player(10, 2, 75, 2);
let Second = new Player(10, 2, 75, 4);
