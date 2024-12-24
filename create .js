const canvas = document.getElementById("animationCanvas");
const stage = new createjs.Stage(canvas);

const backgroundMusic = document.getElementById("backgroundMusic");
const playMusicButton = document.getElementById("playMusicButton");

// Play music on button click
playMusicButton.addEventListener("click", () => {
    backgroundMusic.play();
    playMusicButton.style.display = "none"; // Hide the button
});

const w = canvas.width;
const h = canvas.height;

// Add centered text
const text = new createjs.Text(
    "the longer I'm with you\n the more I love you",
    "bold 24px Arial",
    "#FFFFFF"
);
text.textAlign = "center";
text.x = w / 2;
text.y = h / 2 - text.getMeasuredLineHeight();
stage.addChild(text);

const hearts = [];
const heartImage = new Image();
heartImage.src = "Heart-image.png";

heartImage.onload = () => {
    for (let i = 0; i < 50; i++) {
        const bitmap = new createjs.Bitmap(heartImage);
        bitmap.x = Math.random() * w;
        bitmap.y = Math.random() * h;
        bitmap.alpha = Math.random() * 0.8 + 0.2;
        bitmap.scaleX = bitmap.scaleY = Math.random() * 0.15 + 0.05;
        bitmap.speedY = Math.random() * 1 + 0.5;
        bitmap.driftX = Math.random() * 0.5 - 0.25;
        stage.addChild(bitmap);
        hearts.push(bitmap);
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", updateAnimation);
};

function updateAnimation() {
    hearts.forEach((heart) => {
        heart.y -= heart.speedY;
        heart.x += heart.driftX;
        heart.alpha -= 0.001;

        if (heart.y < 0 || heart.alpha <= 0) {
            heart.y = h;
            heart.x = Math.random() * w;
            heart.alpha = Math.random() * 0.8 + 0.2;
            heart.scaleX = heart.scaleY = Math.random() * 0.15 + 0.05;
            heart.speedY = Math.random() * 1 + 0.5;
            heart.driftX = Math.random() * 0.5 - 0.25;
        }
    });

    stage.update();
}
