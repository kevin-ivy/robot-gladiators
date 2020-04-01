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


// Initialize player robot name and starting stats
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//Initialize enemy robots and stats
var enemyNames = ["Pacifier", "Overlord", "Gamma"];
var enemyHealth = 50;
var enemyAttack = 12;

//Create fight function
var fight = function(enemyName) {
//repeat and execute as long as the player or enemy robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        //Confirm if the player wants to FIGHT or SKIP
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player chooses to skip the fight
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }           
        }

        //Perform the player's attack: subtract playerAttack from enemyHealth
         enemyHealth = enemyHealth - playerAttack;

        //Log a resulting message to the console
         console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //Check enemy's current health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has been defeated!");
            
            //award player money for winning
            playerMoney = playerMoney + 20;
            //leave while loop
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //Perform the enemy's attack: subtract enemyAttack from playerHealth
        playerHealth = playerHealth - enemyAttack;

        //Log a resulting message to the console
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //Check player's current health
        if (playerHealth <= 0) {
            window.alert(playerName + " has been defeated!");
            break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
    }
};


//function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        //Check for player health greater than 0
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
            
            //Select which robot to fight and restore their health
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            
            //call fight function with enemy robot
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length -1) {
                // ask if the player wants to use the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store()
                if (storeConfirm){
                    shop();
                }
            }
        } 
    
         //Declare Game Over if playerHealth reaches 0
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
    if (playerHealth > 0) {
        window.alert("Great job, you're the new champion! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //Increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                break;
            }
            else {
                window.alert("You don't have enough money.");
            }
            break;
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney > 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase attack and decease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
                break;
            } 
            else {
                window.alert("You don't have enough money.");
            }
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

// start the game when the page laoads
startGame()