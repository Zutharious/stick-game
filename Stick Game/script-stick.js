let AttackButton = document.getElementById("AttackButton");

let characterHealth = document.getElementById("characterHealth");
let enemyHealth = document.getElementById("enemyHealth");

let characterHealthNum = document.getElementById("characterHealthNum");
let enemyHealthNum = document.getElementById("enemyHealthNum");

let scoreDisplay = document.getElementById("score");

let xpIncrase = 1;
let playerDefenceUpgrade = 1;
let playerAttackUpgrade = 1;
let damage;
let enemyAttackUpgrade = 1;
let enemyDefenceUpgrade = 1;
let score = 0;
let playerhealthValue = 100;
let enemyHealthValue = 100;
let restart = false;
let currentEnemyid = 0;
let finalBoss = false;

let healthbarSize = document.getElementById("characterHealthBar").clientWidth;

let enemyDifficultyRatio = 5;
function newEnemy(i){
    switch(i){
        case 0:
            //firefox
            document.getElementById("enemy").src = "images/FirefoxLogo.png";
            enemyDefenceUpgrade = (i * enemyDifficultyRatio) + 1;
            document.getElementById("background").src = "images/winBackground.jpg"
            break;
        case 1:
            //clippy
            document.getElementById("enemy").src = "images/clippy.png";
            enemyDefenceUpgrade = (i * enemyDifficultyRatio) + 1;
            break;
        case 2:
            //msn butterfly
            document.getElementById("enemy").src = "images/msn.png";
            enemyDefenceUpgrade = (i * enemyDifficultyRatio) + 1;
            break;
        case 3:
            //window Shutdown button(enemy)
            document.getElementById("enemy").src = "images/shutdown.png";
            enemyDefenceUpgrade = (i * enemyDifficultyRatio) + 1;
            break;
        //if adding new enemy here, change const enemycount
        default:
            //final cursor boss
            finalBoss = true;
            document.getElementById("enemy").src = "images/cursor.png";
            //change enemy count to previous case number plus 1
            const enemyCount = 4;
            enemyDefenceUpgrade = (enemyCount * enemyDifficultyRatio) + 1;
            document.getElementById("background").src = "images/Bluescreen.png";
            break;
    }
}

function deathResult(name,htmlID,result){
    if(name === "Enemy"){
        enemyHealthNum.innerText = name + " Dead";
        enemyAttackUpgrade += .25 * (1 + currentEnemyid);
        iconsKilled++;
    }else{
        characterHealthNum.innerText = name + " Dead";
    }
    document.getElementById(htmlID).src = "images/deathIcon.png";
    score += (result * xpIncrase);
    AttackButton.innerText = "Next";
    restart = true;
}

function fireWallInfo(){
    document.getElementById("storeDescription").innerText = "Firewall: Increase defence and take 30 percent less damage!";
    const LineBreak = document.createElement('br');
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "current effect: +" + Math.round((playerDefenceUpgrade - 1) * 100) + "%";
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "cost: -1 score";
}

function minesweeperInfo(){
    document.getElementById("storeDescription").innerText = "Minesweeper: Increase attack and deal 30 percent more damage!";
    const LineBreak = document.createElement('br');
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "current effect: +" + Math.round((playerAttackUpgrade - 1) * 100) + "%";
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "cost: -1 score";
}

function batteryInfo(){
    document.getElementById("storeDescription").innerText = "Battery: Heal to full health!";
    const LineBreak = document.createElement('br');
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "heal amount: " + (100 - playerhealthValue);
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "cost: -0.5 score";
}

function calculatorInfo(){
    document.getElementById("storeDescription").innerText = "Calculator: increase or decrease score by 25% per battle";
    const LineBreak = document.createElement('br');
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "current effect: " + Math.round((xpIncrase - 1) * 100) + "%";
    document.getElementById("storeDescription").appendChild(LineBreak);
    document.getElementById("storeDescription").innerText += "cost: -1 score";
}

//final endgame stat variables
let maxDamage = 0;
let iconsKilled = 0;
let upgradeCount = 0;
function endGame(){
    document.getElementById("stats").style.display = "block";
    document.getElementById("stats").innerText = "Final Stats";
    const LineBreak = document.createElement('br');
    document.getElementById("stats").appendChild(LineBreak);
    document.getElementById("stats").innerText += "Max damage done: " + maxDamage;
    document.getElementById("stats").appendChild(LineBreak);
    document.getElementById("stats").innerText += "Icons Killed: " + iconsKilled;
    document.getElementById("stats").appendChild(LineBreak);
    document.getElementById("stats").innerText += "Upgrade bought: " + upgradeCount;
    document.getElementById("stats").appendChild(LineBreak);
    document.getElementById("stats").innerText += "congratulations you beat the game!";
}

function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

AttackButton.onclick = function(){
    if (restart){
        restart = false;
        playerhealthValue = 100;
        enemyHealthValue = 100;
        AttackButton.innerText = "Attack"
        characterHealthNum.innerText = "Player Health: " + playerhealthValue;
        enemyHealthNum.innerText = "Enemy Health: " + enemyHealthValue;
        document.getElementById("character").src = "images/aolMan.png";
        newEnemy(currentEnemyid);
        document.getElementById("enemyDamageNum").innerText = "";
        document.getElementById("playerDamageNum").innerText = "";
    }else if (playerhealthValue > 0 && enemyHealthValue > 0){
        
        //enemy Damage
        damage = getRandomDamage(3, 15);
        damage = Math.round((damage * enemyAttackUpgrade) / playerDefenceUpgrade)
        playerhealthValue -= damage;
        document.getElementById("enemyDamageNum").innerText = "-" + damage;

        //player damage
        damage = getRandomDamage(7, 25);
        damage = Math.round((damage * playerAttackUpgrade) / enemyDefenceUpgrade)
        enemyHealthValue -= damage;
        document.getElementById("playerDamageNum").innerText = "-" + damage;
        if(maxDamage < damage){
            maxDamage = damage;
        }
        if(damage >= 100){
            currentEnemyid++;
        }
        enemyHealthNum.innerText = "Enemy Health: " + enemyHealthValue;
        characterHealthNum.innerText = "Player Health: " + playerhealthValue;
    }
    if (playerhealthValue < 0){
        playerhealthValue = 0;
    }
    if (enemyHealthValue < 0){
        enemyHealthValue = 0;
    }
    if (playerhealthValue <= 0 && enemyHealthValue <= 0){
        deathResult("Player","character",-1);
        deathResult("Enemy","enemy",1);
    }else if (playerhealthValue <= 0){
        deathResult("Player","character",-1);
    }else if (enemyHealthValue <= 0){
        if(finalBoss){
            endGame();
            finalBoss = false;
        }
        deathResult("Enemy","enemy",1);
    }
    document.getElementById("characterHealthBar").style.width = (healthbarSize * playerhealthValue / 100) + "px";
    document.getElementById("enemyHealthBar").style.width = (healthbarSize * enemyHealthValue / 100) + "px";
    scoreDisplay.innerText = "Score:" + score;
}
//open the store
document.getElementById("store").onclick = function(){
    document.getElementById("storePage").style.display = "block";
    AttackButton.style.display = "none";
}
//close the store using storeCloseBtn
document.getElementById("storeCloseBtn").onclick = function(){
    document.getElementById("storePage").style.display = "none";
    AttackButton.style.display = "block";
}
//upgrade info for firewall
document.getElementById("firewall").addEventListener('mouseenter', () => {
    fireWallInfo();
})
//upgrade info for minesweeper
document.getElementById("minesweeper").addEventListener('mouseenter', () => {
    minesweeperInfo();
})
//upgrade info for battery
document.getElementById("battery").addEventListener('mouseenter', () => {
    batteryInfo();
})
//upgrade info for calculator
document.getElementById("calculator").addEventListener('mouseenter', () => {
    calculatorInfo();
})
//purchasing firewall upgrade(defence increase)
document.getElementById("firewall").onclick = function(){
    if(score >= 1){
        score--;
        upgradeCount++;
        playerDefenceUpgrade += .3;
        scoreDisplay.innerText = "Score:" + score;
        fireWallInfo();
    }
}
//purchasing minesweeper upgrade(damage increase)
document.getElementById("minesweeper").onclick = function(){
    if(score >= 1){
        score--;
        upgradeCount++;
        playerAttackUpgrade += .3;
        scoreDisplay.innerText = "Score:" + score;
        minesweeperInfo();
    }
}
//purchasing battery(healing)
document.getElementById("battery").onclick = function(){
    if(score >= .5){
        score - .5;
        playerhealthValue = 100;
        document.getElementById("characterHealthBar").style.width = (healthbarSize * playerhealthValue / 100) + "px";
        characterHealthNum.innerText = "Player Health: " + playerhealthValue
        scoreDisplay.innerText = "Score:" + score;
        batteryInfo();
    }
}
// purchasing calculator upgrade(score increase)
document.getElementById("calculator").onclick = function(){
    if(score >= 1){
        score--;
        upgradeCount++;
        xpIncrase += .25;
        scoreDisplay.innerText = "Score:" + score;
        calculatorInfo();
    }
}