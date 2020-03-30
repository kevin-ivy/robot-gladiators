//Game States
//"WIN" - Player robot has defeated all enemy robots
//  *Fight all enemy robots
//  *Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

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
    while(enemyHealth > 0 && playerHealth > 0) {
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

for(var i = 0; i < enemyNames.length; i++) {
    //Select which robot to fight and restore their health
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    //call fight function with enemy robot
    fight(pickedEnemyName);
}