let canvas;
let world;
let keyboard = new Keyboard();
let toggledMusic = false;
let gameStarted = false;
let game_sound = new Audio('audio/background_music.mp3');
let gameOver = false;


function init() {
  canvas = document.getElementById("canvas");
  changeOrientation();
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});


document.getElementById('character_left').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById('character_left').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById('character_right').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('character_right').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('character_jump').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById('character_jump').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById('character_throw').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.D = true;
});

document.getElementById('character_throw').addEventListener('touchend', (e) => {
  e.preventDefault();
  keyboard.D = false;
});


function startGame() {
  gameStarted = true;
  gameOver = false;
  let placeholder = document.getElementById("start_game_placeholder");
  let game = document.getElementById("canvas");
  placeholder.classList.add("d-none");
  game.classList.remove("d-none");
  initLevel();
  world = new World(canvas, keyboard);
}

function showEndScreen(value) {
  gameOver = true;
  let placeholder = document.getElementById("start_game_placeholder");
  let game = document.getElementById("canvas");
  placeholder.classList.add('background');
  placeholder.classList.add('animation');
  placeholder.classList.remove("d-none");
  game.classList.add("d-none");
  showEndscreenTemplate(value);
}

function showEndscreenTemplate(value) {
  let placeholder = document.getElementById("start_game_placeholder");
  placeholder.innerHTML = `
  <div class="start_game_menu">
    <div onclick="startGame()">►</div>
    <div id="music_container" onclick="toggleMusic()"><img src="./img/10_backgrounds/no_audio.png"></div>
    <div onclick="showKeybindings()">?</div>
  </div>
  <div class="endscreen_show">
    <div>You ${value}</div>
  </div>
  `;
}



function showKeybindings() {
  let container = document.getElementById("start_game_placeholder");
  container.classList.add('background');
  container.innerHTML = `
    <div class="game_keybindings_headline">
        <div onclick="showStartGamePlaceholder()">◄</div>
        <div><h4>Game Keybindings</h4></div>
    </div>
    <div class="game_keybindings_menu">
        <div>
            <div>⇦</div>
            <div>Move Left</div>
        </div>
        <div>
            <div>⇨</div>
            <div>Move Right</div>
        </div>
        <div>
            <div>Space</div>
            <div>Jump</div>
        </div>
        <div>
            <div>D</div>
            <div>Bottle Throw</div>
        </div>

    </div>
  `;
}

function showStartGamePlaceholder() {
  let container = document.getElementById("start_game_placeholder");
  container.classList.remove('background');
  if (toggledMusic) {
    container.innerHTML = toggledTemplateMusicOn();
  }
  else {
    container.innerHTML = toggledTemplateMusicOff();
  }
}

function toggledTemplateMusicOn() {
  return `
  <div class="start_game_menu">
      <div onclick="startGame()">►</div>
      <div id="music_container" onclick="toggleMusic()"><img src="./img/10_backgrounds/audio.png"></div>
      <div onclick="showKeybindings()">?</div>
  </div>
  `;
}

function toggledTemplateMusicOff() {
  return `
  <div class="start_game_menu">
      <div onclick="startGame()">►</div>
      <div id="music_container" onclick="toggleMusic()"><img src="./img/10_backgrounds/no_audio.png"></div>
      <div onclick="showKeybindings()">?</div>
  </div>
  `;
}

function toggleMusic() {
  let container = document.getElementById('music_container');
  if (toggledMusic) {
    toggleMusicOff(container);
  }
  else {
    toggleMusicOn(container);
  }
}

function toggleMusicOn(container) {
  toggledMusic = true;
  game_sound.play();
  game_sound.loop = true;
  container.innerHTML = `<img src="./img/10_backgrounds/audio.png">`;
}

function toggleMusicOff(container) {
  toggledMusic = false;
  game_sound.pause();
  container.innerHTML = `<img src="./img/10_backgrounds/no_audio.png">`;
}

function checkOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    canvasPortraitScape();
    document.getElementById('mobile_buttons').classList.add('d-none');

  } else {
    canvasLandScape();
    document.getElementById('mobile_buttons').classList.remove('d-none');

  }
}

window.addEventListener("orientationchange", checkOrientation);

function canvasPortraitScape() {
  document.getElementById('canvas').style.width = '100%';
  document.getElementById('canvas').style.height = 'calc(100% - 59px)';
  document.getElementById('canvas').style.borderRadius = '15px';
}

function canvasLandScape() {
  document.getElementById('canvas').style.width = '100vw';
  document.getElementById('canvas').style.height = '100vh';
  document.getElementById('canvas').style.marginBottom = '-22px';
  document.getElementById('canvas').style.borderRadius = '0px';
}


function getScreenDimensions() {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  return { screenWidth, screenHeight };
}

function getDOMElements() {
  let container = document.getElementById('start_game_placeholder');
  let placeholder = document.getElementById('turn_placeholder');
  let game = document.getElementById('canvas');

  return { container, placeholder, game };
}

function handleOrientation({ screenWidth, screenHeight }, { container, placeholder, game }) {
  if (screenHeight >= 700) {
    showOrientationTurnPhone(container, placeholder, game);
  }
  if (screenHeight <= 700 || screenWidth >= 720) {
    showOrientationCanvas(container, placeholder, game);
  }
}

function handleGameState({ container, placeholder, game }) {
  if (!gameStarted || gameOver) {
    showOrientationEndscreen(container, placeholder, game);
    if (gameOver) {
      document.getElementById('mobile_buttons').classList.add('d-none');
    }
  }
}

function changeOrientation() {
  setInterval(() => {
    let { screenWidth, screenHeight } = getScreenDimensions();
    let { container, placeholder, game } = getDOMElements();

    handleOrientation({ screenWidth, screenHeight }, { container, placeholder, game });
    handleGameState({ container, placeholder, game });
  }, 100);
}

function showOrientationEndscreen(container, placeholder, game) {
  container.classList.remove('d-none');
  placeholder.classList.add('d-none');
  game.classList.add('d-none');
}

function showOrientationCanvas(container, placeholder, game) {
  container.classList.add('d-none');
  placeholder.classList.add('d-none');
  game.classList.remove('d-none');
}

function showOrientationTurnPhone(container, placeholder, game) {
  container.classList.add('d-none');
  placeholder.classList.remove('d-none');
  game.classList.add('d-none');
}