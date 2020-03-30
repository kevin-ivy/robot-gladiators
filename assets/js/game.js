// Initialize player robot name and starting stats
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Log the above values
console.log(playerName, playerHealth, playerAttack);

//Initialize enemy robot and stats
var enemyName = "Gato";
var enemyHealth = 50;
var enemyAttack = 12;

//Create fight function
var fight = function() {
//Alert users that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

//Confirm if the player wants to FIGHT or SKIP
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //if player chooses to fight, run battle
    if (promptFight === "fight" || promptFight === "FIGHT") {

    //Perform the player's attack: subtract playerAttack from enemyHealth
        enemyHealth = enemyHealth - playerAttack;

    //Log a resulting message to the console
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

    //Check enemy's current health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has been defeated!");
        }
        else {
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
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    
    } 

    // if player chooses to skip the fight
    else if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
        }
        //if no (false), ask question again by re-running fight() function
        else {
            fight();
        }
        
    }

    // if player enters invalid selection
    else {
        window.alert("You need to pick a valid option. Try again!");
    }

};

fight ();