const cards = document.querySelectorAll(".card");
const chooseSection = document.querySelector(".choose_section") as HTMLElement;
const chosenSection = document.querySelector(".chosen_section") as HTMLElement;

const userPicked = document.querySelector(".user_picked") as HTMLDivElement;
const housePicked = document.querySelector(".house_picked") as HTMLDivElement;
const blank = document.querySelector(".blank") as HTMLDivElement;

const userScore = document.querySelector(".userScore") as HTMLParagraphElement;
const houseScore = document.querySelector(".houseScore") as HTMLParagraphElement;
const result = document.querySelector(".result") as HTMLDivElement;
const resultTitle = document.querySelector(".result_title") as HTMLHeadElement;
const restartBtn = document.querySelector(".restart_btn") as HTMLButtonElement;

const modalOpenBtn = document.querySelector(".rules") as HTMLDivElement;
const modalContainer = document.querySelector(".modal_container") as HTMLDivElement;
const modal = document.querySelector(".modal_content") as HTMLDivElement;
const modalCloseBtn = document.querySelector(".btn-close") as HTMLButtonElement;

// for house pick
const cardsData = [
  { name: "scissors", path: "assets/images/icon-scissors.svg" },
  { name: "paper", path: "assets/images/icon-paper.svg" },
  { name: "rock", path: "assets/images/icon-rock.svg" },
];

// scores counter
let userScoreCounter: number = 0;
let houseScoreCounter: number = 0;

// choose an card
const chooseHandler = (event: any) => {
  chooseSection.classList.add("d-none");
  chosenSection.classList.replace("d-none", "d-flex");
  const userPickedEl = document.createElement("div");

  if (event.target.nodeName === "IMG") {
    userPickedEl.classList.add("chosen_card", event.target.parentNode.classList[1]);

    userPickedEl.innerHTML = `<img src=${event.target.src} alt=${event.target.alt}>`;
  } else {
    userPickedEl.classList.add("chosen_card", event.target.classList[1]);
    userPickedEl.innerHTML = `<img src=${event.target.firstElementChild.src} alt=${event.target.alt}>`;
  }

  userPicked.append(userPickedEl);
  randomHousePick(userPickedEl);

  // end the game
  if (userScoreCounter === 5) {
    result.style.display = "inline-block";
    resultTitle.innerHTML = "YOU WIN";
    userPicked.classList.add("boxShadow")
    restart();
  } else if (houseScoreCounter === 5) {
    result.style.display = "inline-block";
    resultTitle.innerHTML = "YOU LOSE";
    housePicked.classList.add("boxShadow")
    restart();
  } else {
    timeout();
  }

  userScore.innerText = userScoreCounter;
  houseScore.innerHTML = houseScoreCounter;
};

//random house pick
const randomHousePick = (element: any) => {
  const randomHousePickEl = Math.floor(Math.random() * cards.length);

  const name = cardsData[randomHousePickEl].name;
  const path = cardsData[randomHousePickEl].path;

  const housePickedEl = document.createElement("div");
  housePickedEl.classList.add("chosen_card", name);

  housePickedEl.innerHTML = `<img src=${path} alt=${name}>`;

  blank.remove();
  housePicked.append(housePickedEl);

  setScore(element);
};

// compair cards
const setScore = (element: any) => {
  const houseChoice = housePicked.firstElementChild;

  if (element.classList.contains("scissors")) {
    if (houseChoice?.classList.contains("scissors")) {
      return;
    } else if (houseChoice?.classList.contains("paper")) {
      return userScoreCounter++;
    } else if (houseChoice?.classList.contains("rock")) {
      return houseScoreCounter++;
    }
  }

  if (element.classList.contains("paper")) {
    if (houseChoice?.classList.contains("paper")) {
      return;
    } else if (houseChoice?.classList.contains("rock")) {
      return userScoreCounter++;
    } else if (houseChoice?.classList.contains("scissors")) {
      return houseScoreCounter++;
    }
  }

  if (element.classList.contains("rock")) {
    if (houseChoice?.classList.contains("rock")) {
      return;
    } else if (houseChoice?.classList.contains("scissors")) {
      return userScoreCounter++;
    } else if (houseChoice?.classList.contains("paper")) {
      return houseScoreCounter++;
    }
  }
};

// switch pages after compaire
const switchPages = () => {
  const housePickedEl = document.querySelector(".house_picked .chosen_card") as HTMLDivElement;
  const userPickedEl = document.querySelector(".user_picked .chosen_card") as HTMLDivElement;

  chosenSection.classList.replace("d-flex", "d-none");
  chooseSection.classList.replace("d-none", "d-block");

  userPickedEl.remove();
  housePickedEl.remove();
};

const timeout = () => {
  setTimeout(() => {
    switchPages();
  }, 1000);
};

// restart the game
const restart = () => {
  restartBtn.addEventListener("click", () => {
    if (result.style.display === "inline-block") {
      userScoreCounter = 0;
      houseScoreCounter = 0;

      userScore.innerText = userScoreCounter;
      houseScore.innerHTML = houseScoreCounter;

      result.style.display = "none";

      userPicked.classList.remove("boxShadow")
      housePicked.classList.remove("boxShadow")

      switchPages();
    }
  });
};

// openModal
const openModal = () => {
  modalContainer.style.display = "flex";
};

// closeModal
const closeModal = () => {
  modalContainer.style.display = "none";
};

window.addEventListener("click", (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});

// events
cards.forEach((card) => card.addEventListener("click", chooseHandler));
modalOpenBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
