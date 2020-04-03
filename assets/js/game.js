//Game States
//"WIN" - Player robot has defeated all enemy robots
//  *Fight all enemy robots
//  *Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// Store and Restart Functionality
// Create startGame() to store game logic
// When player is defeated or no more enemies, call endGame()
// * Alert the player's total stats
// * Ask if they want to play again
// * If yes, call startGame() to reset the game
// After player skips or defeats enemy (with more opponents remaining)
// * Ask if the player wants to shop
// * If no, continue as normal
// * If yes, call shop()
// In shop() ask player if they want to refill health, upgrade attack, or leave.
// * If Refill, subtract money and increase health
// * If Upgrade, subtract money adn increase attack
// * If leave, alert goodbye and exit
// * If any other invalid optionn, call shop() again

//create a function to generate a random number
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//Create fight function
var fight = function(enemy) {
//repeat and execute as long as the player or enemy robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        //Confirm if the player wants to FIGHT or SKIP
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player chooses to skip the fight
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }           
        }

        //Perform the player's attack: subtract playerInfo.attack from enemy.health
         var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
         enemy.health = Math.max(0, enemy.health - damage);

        //Log a resulting message to the console
         console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //Check enemy's current health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has been defeated!");
            
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //leave while loop
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //Perform the enemy's attack: subtract enemy.attack from playerInfo.health
        var damage = randomNumber (enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        //Log a resulting message to the console
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        //Check player's current health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has been defeated!");
            break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
    }
};


//function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    //Initialize the round and create the enemy
    for(var i = 0; i < enemyInfo.length; i++) {
        //Check for player health greater than 0
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
            
            //Select which robot to fight and restore their health
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            
            //call fight function with enemy robot
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                // ask if the player wants to use the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store()
                if (storeConfirm){
                    shop();
                }
            }
        } 
    
         //Declare Game Over if playerInfo.health reaches 0
        else { 
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    };
    // after the loop ends, player is either out of health or enemies, so run endGame
    endGame();
};

//function to end the game
var endGame = function(){
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you're the new champion! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    console.log("You have entered the shop.");
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("You have left the store.");

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick valid option
            shop();
            break;
    }
};

//function to set name

var getPlayerName = function() {
    var name = "";

    // Add loop that prompts for name and checks if valid
    while (name === '' || name === null){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is "  + name);
    return name;
};

// Initialize player robot name and starting stats
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling " + this.name + "'s health by 25 for 7 dollars.")
            this.health += 25;
            this.money -= 7;
            }
            else {
                window.alert("You don't have enough money.");
            }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading " + this.name + "'s attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money.");
        }
    }
}; 

//Initialize enemy robots and stats
var enemyInfo = [
    {
        name: "Pacifier",
        attack: randomNumber(10, 12)
    },
    {
        name: "Overlord",
        attack: randomNumber(12, 14)
    },
    {
        name: "Gamma",
        attack: randomNumber(16,18)
    }
];

// start the game when the page laoads
startGame()

function newFunction() {
    debugger;
}
