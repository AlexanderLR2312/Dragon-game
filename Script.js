let xp = 0;
let gold = 50;
let health = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
 
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//-------------------------------------------------------------------------------------------------------------------
 
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];
 
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "Edgardo",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    }
];

//-------------------------------------------------------------------------------------------------------------------
 
const locations = [
    {
        name: "town square",
        "button text": ["go to store", "go to cave", "fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "you are in town square. you see a sign that says \"store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "buy weapon (30 gold)", "go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "you enter the store."
    },
    {
        name: "cave",
        "button text": ["fight slime", "fight Edgardo", "go to town square"],
        "button functions": [fightSlime, fightEdgardo, goTown],
        text: "you enter the cave."
    },
    {
        name: "fight",
        "button text": ["attack", "dodge", "run"],
        "button functions": [attack, dodge, goTown],
        text: "you are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["go to town square", "go to town square", "go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "you defeated the monster!"
    },
    {
        name: "lose",
        "button text": ["replay?", "replay?", "replay?"],
        "button functions": [restart, restart, restart],
        text: "you have been defeated!"
    },
    {
        name: "win",
        "button text": ["replay?", "replay?", "replay?"],
        "button functions": [restart, restart, restart],
        text: "you defeated the dragon! you win the game!"
    }
]

//-------------------------------------------------------------------------------------------------------------------
 
 
//initalize buttons
 
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
 
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
 
//-------------------------------------------------------------------------------------------------------------------

function goTown() {
    update(locations[0]);
}
 
 
 
function goStore() {
   update(locations[1]);
}
 
function goCave() {
    update(locations[2]);
}
 
function buyHealth() {
    if (gold >= 10) {
        gold = gold - 10;
    health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    } else {
        text.innerText = "you do not have enough gold to buy health.";
    }
}
 
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "you now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " in your inventory you have " + inventory;
        } else {
            text.innerText = "you do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "you already have the most powerful weapon.";
        button2.innerText = "sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

//-------------------------------------------------------------------------------------------------------------------
 
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift();
        text.innerText = "you sold a " + soldWeapon + ".";
        text.innerText += " in your inventory you have " + inventory;
    } else {
        text.innerText = "you cannot sell your only weapon.";
    }
}

//-------------------------------------------------------------------------------------------------------------------
 
function fightSlime() {
    fighting = 0;
    goFight();
}
 
function fightEdgardo() {
    fighting = 1;
    goFight();
}
 
function fightDragon() {
    fighting = 2;
    goFight();
}

//-------------------------------------------------------------------------------------------------------------------
 
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
 
function attack() {
    text.innerText = "the " + monsters[fighting].name + " attacks.";
    text.innerText += " you attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : win();
    }
}
 
//-------------------------------------------------------------------------------------------------------------------
 
 
function dodge() {
    text.innerText = "you dodge the attack from the " + monsters[fighting].name + ".";
}
 
function win() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
 
function lose() {
    update(locations[5]);
}
 
function winGame() {
    update(locations[6]);
}

//-------------------------------------------------------------------------------------------------------------------
 
function restart() {
    xp = 0;
    gold = 50;
    health = 100;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
 
//-------------------------------------------------------------------------------------------------------------------