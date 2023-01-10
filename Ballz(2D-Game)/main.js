const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

let myAudio = document.createElement("audio");
myAudio.src = "Sandstorm.mp3";

let myDeathSound = document.createElement("audio");
myDeathSound.src = "Roblox Death Sound - OOF Sound Effect.mp3";

let gameStart = false;
let keys = {};
let counter = 0;
let seconds = 0;
let timer = 0;
let times = 0;
let safeBubbleCount = 0;
let pressedKey = false;
let isGameOver = false;
let isCheckpoint = false;
let finalScore = 0;
let menu = true;
let spawnOnce = true;

canvas.height = 800;
canvas.width = 800;

const bubbles = [];
const badbubbles = [];
const safebubbles = [];

//----------PLAYER BUBBLE(1)
const playerBubble = new PlayerBubble();
playerBubble.positionBubble();
bubbles.push(playerBubble);

//----------SAFE BUBBLE(1)
const newGoodBubble = new SafeBubble();           
newGoodBubble.positionBubble(playerBubble);         
safebubbles.push(newGoodBubble);

canvas.addEventListener('keydown', event => {
    keys[event.key] = true;
    pressedKey = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

theMenu();

//----------ENEMY BUBBLE(20)
for (let i = 0; i < 20; i++) 
{
    const newEnemyBubble = new EnemyBubble();
    newEnemyBubble.positionBubble();
    badbubbles.push(newEnemyBubble);
}

function theMenu()
{
    context.font = "100px Impact";
    context.fillStyle = "black";
    context.fillText("Ballz", 300, 250);

    context.font = "30px Arial";
    context.fillStyle = "blue";
    context.fillText("Press any arrow key to play", 220, 550);

    context.fillStyle = "black";
    context.fillText("Arrow keys to move", 270, 600);

    context.fillStyle = "green";
    context.fillText("Get as many green bubbles as possible (+5)", 110, 650);

    context.font = "50px Arial";
    context.fillStyle = "blue";
    context.fillText("O", 390, 710);

    context.font = "50px Impact";
    context.fillStyle = "red";
    context.fillText("Don't hit the red bubbles", 150, 770);

    document.addEventListener("keydown", KeyPressed);
}

function endMenu()
{
    context.font = "100px Impact";
    context.fillStyle = "black";
    context.fillText("GAME OVER", 180, 250);

    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText("Final Score = " + finalScore, 300, 400);
    times = 0;

    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText("REFRESH PAGE TO RESTART", 200, 500);


    document.addEventListener("keydown", PressedR);
}

function PressedR(e)
{
    if (e.which == 82)
    {
        location.reload();
    }
}

function KeyPressed(e)
{
    if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 || e.which == 65 || e.which == 83 || e.which == 68 || e.which == 87)
        gameStart = true; 
}

function animate() {
    requestAnimationFrame(animate);

    if (gameStart == true)
    {
        counter++;
        timer++;
        context.clearRect(0, 0, canvas.width, canvas.height);

        if(spawnOnce = false)
        {
            //----------PLAYER BUBBLE(1)
            bubbles.pop();
            const playerBubble = new PlayerBubble();
            playerBubble.positionBubble();
            bubbles.push(playerBubble);

            //----------SAFE BUBBLE(1)
            safebubbles.pop();
            const newGoodBubble = new SafeBubble();           
            newGoodBubble.positionBubble(playerBubble);         
            safebubbles.push(newGoodBubble);

            //----------ENEMY BUBBLE(20)
            for (let i = 0; i < 20; i++) 
            {
                const newEnemyBubble = new EnemyBubble();
                newEnemyBubble.positionBubble();
                badbubbles.push(newEnemyBubble);
            }
        }

        if (timer == 60)
        {
            myAudio.play();
            times++;

            if ((times % 5) == 0)
            {
                for (let i = 0; i < 3; i++) {
                    const newEnemyBubble = new EnemyBubble();            
                    newEnemyBubble.positionBubble();           
                    badbubbles.push(newEnemyBubble);
                }
            }
            timer = 0;
        }

        isCheckpoint = safebubbles[0].isSafe(playerBubble);

        if(isCheckpoint)
        {
            badbubbles.pop();
            times += 5;
            safebubbles.pop();
            isCheckpoint = false;

            const newGoodBubble = new SafeBubble();           
            newGoodBubble.positionBubble();         
            safebubbles.push(newGoodBubble);
        }

        for(let j = 0; j < badbubbles.length; j++)
        {
            isGameOver = badbubbles[j].isDead(playerBubble);

            if (isGameOver)
                gameOver();
        }
        
        if (keys.ArrowUp) {
            playerBubble.move(1);   
        }

        if (keys.ArrowDown) {
            playerBubble.move(2);  
        }
        
        if (keys.ArrowLeft) {
            playerBubble.move(3);  
        }

        if (keys.ArrowRight) {
            playerBubble.move(4);  
        }

        context.save();
        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText(`Score: ${times}`, 10, 20);
        context.restore();
        
        bubbles.map(bubble => bubble.update(bubbles));
        badbubbles.map(bubble => bubble.update(badbubbles));
        safebubbles.map(bubble => bubble.update(safebubbles));

        playerBubble.update(bubbles);
    }
}

function gameOver()
{
    myDeathSound.play();
    myAudio.pause();
    gameStart = false;
    menu = false;
    spawnOnce = false;
    isGameOver = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    finalScore = times;

    bubbles.pop();
    safebubbles.pop();

    for(let i = 0; i < 100; i++)
        badbubbles.pop();

    endMenu();
	
}

animate();



canvas.focus();