const qwerty = document.getElementById('qwerty');
const overlay = document.getElementById('overlay')
const startBtn = document.querySelector('.btn__reset');
const ul = document.getElementById("phrase");
let missed = 0;
let tries = document.getElementsByClassName('tries');
const phrases = [
  'live and learn', 
  'do or do not there is no try', 
  'patience is a virtue', 
  'what we think we become', 
  'there is a time for everything'];

// functions
function getRandomPhraseAsArray() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function addPhraseToDisplay () {
  getRandomPhraseAsArray();
  let phrase = getRandomPhraseAsArray();
  for(let i = 0; i < phrase.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(phrase[i]));
    if(phrase[i] !== ' ') {
      li.setAttribute('class', 'letter');
    } else {
      li.setAttribute('class', 'space');
    }
    ul.appendChild(li);
  }
}

//checks the guessed letter with correct letters in the phrase
function checkLetter(guess) {
  let correctLetter = null;
  let letterList = document.querySelectorAll('.letter');
  for(let i = 0; i < letterList.length; i++) {
    if(letterList[i].innerHTML === guess) {
      letterList[i].setAttribute('class', 'show letter');
      correctLetter = letterList[i].innerHTML;
    }
  }
  if(correctLetter != null) {
    return correctLetter;
  }
  return null;
}

//checks if the game is won
function checkWin() {
  if(missed === 5) {
    reset();
    overlay.firstElementChild.textContent = 'You Lose! :('
    overlay.setAttribute('class', 'lose');
    overlay.style.display = 'flex';
    return;
  }
  let letterList = document.querySelectorAll('.letter');
  for(let i = 0; i < letterList.length; i++) {
    if(letterList[i].classList.contains('show') === false) {
      return;
    }
  }
  reset();
  overlay.firstElementChild.textContent = 'You Win! :)'
  overlay.setAttribute('class', 'win');
  overlay.style.display = 'flex';
}

//resets the program
function reset() {
  missed = 0;
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  let keys = document.querySelectorAll('BUTTON');
  for(let i = 0; i < keys.length; i++) {
    keys[i].removeAttribute('disabled');
    keys[i].setAttribute('class', '');
  }
  for(let i = 0; i < tries.length; i++) {
    tries[i].firstChild.src = 'images/liveHeart.png';
  }

}

// listeners
startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  addPhraseToDisplay();
});

qwerty.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    e.target.setAttribute('class', 'chosen');
    e.target.setAttribute('disabled', 'true');
    let guess = e.target.innerHTML;
    let letter = checkLetter(guess);
      if(letter == null) {
        tries[missed].firstChild.src = 'images/lostHEart.png';
        missed++;
      }
    checkWin();
  }
});