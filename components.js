/////// LOAD IMAGES ////////

// LOAD BG IMAGE
const BG_IMG = new Image();
BG_IMG.src = "img/cityskyline.png";
// LOAD select mode background
const SELECTMODEBG_IMG = new Image();
SELECTMODEBG_IMG.src = "img/Modebackground.jpg";


const ButtonSprits_IMG = new Image();
ButtonSprits_IMG.src = "img/buttonmode.png";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";

const MUTE_IMG = new Image();
MUTE_IMG.src = "img/SOUND_ON.png";

const RESET_BUTTON = new Image();
RESET_BUTTON.src = "img/buttonReset.png";

const GAMEOVER_IMG = new Image();
GAMEOVER_IMG.src = "img/GAMEOVER.jpg";

const StartButton_IMG = new Image();
StartButton_IMG.src = "img/FirstPageButton.png";

const WON_IMG = new Image();
WON_IMG.src = "img/won.jpg";
/////// END LOAD IMAGES ////////

// ************************ //

/////// LOAD SOUNDS ////////

const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "sounds/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sounds/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "sounds/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/brick_hit.mp3";

//button click
const buttonClicked = new Audio();
buttonClicked.src = "sounds/Button-click.mp3";

// game over sound
const gameover_sound = new Audio();
gameover_sound.src = "sounds/Gameover.mp3";

// Start sound
const GameSelect_sound = new Audio();
GameSelect_sound.src = "sounds/startSound.mp3";

// you won sound
const WON_sound = new Audio();
Won_sound.src = "sounds/YOUWONSOUND.mp3";

/////// END LOAD SOUNDS ////////
