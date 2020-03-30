// Initialize player robot name and starting stats
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

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

};

fight ();