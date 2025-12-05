import PostService from "../../scripts/postService.js";
import PutService from "../../scripts/putService.js";

const postService = new PostService();
const putService = new PutService();
const board = document.querySelector(".board");
const addButton = document.getElementById("add-card-btn");
const cardTextInput = document.getElementById("card-text-input"); // 👈 neu

let cardTemplate = "";
let cardCounter = 1;
let test = "Mina";
let zIndexCounter = 1

// Template laden
export async function loadCardTemplate() {
  const res = await fetch("cards.html");
  cardTemplate = await res.text();
}

// Card aus Template erzeugen
function createCardFromTemplate() {
  hello(test); // TODO: löschen wenn nicht gebraucht wird
  if (!cardTemplate) return;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = cardTemplate.trim();
  const card = wrapper.firstElementChild;

  // Titel (wie gehabt)
  const titleEl = card.querySelector("h3");
  if (titleEl) {
    titleEl.textContent = `Card #${cardCounter}`;
  }
  cardCounter++;

  // 👇 Text aus Input ins <p> schreiben (falls vorhanden)
  const pEl = card.querySelector("p");
  if (pEl && cardTextInput) {
    const value = cardTextInput.value.trim();
    pEl.textContent = value || "Standardtext für diese Karte.";
  }

  board.appendChild(card);
  cardTextInput.value = "";
  // random Position
  const boardRect = board.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const maxX = boardRect.width - cardRect.width;
  const maxY = boardRect.height - cardRect.height;
  const randomColor = getRandomColor();
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  card.style.left = x + "px";
  card.style.top = y + "px";
  card.style.backgroundColor = randomColor;
  buildCardJson(x, y, titleEl, randomColor);
  // 👉 HIER: Card draggable machen
  makeCardDraggable(card);
}

addButton.addEventListener("click", createCardFromTemplate);

// globales mousemove: wenn gerade eine Card gezogen wird, bewegen
document.addEventListener("mousemove", (event) => {
  if (!currentDraggedCard) return;

  const boardRect = board.getBoundingClientRect();

  let x = event.clientX - boardRect.left - dragOffsetX;
  let y = event.clientY - boardRect.top - dragOffsetY;

  // Card im Board halten
  const maxX = boardRect.width - currentDraggedCard.offsetWidth;
  const maxY = boardRect.height - currentDraggedCard.offsetHeight;

  x = Math.max(0, Math.min(maxX, x));
  y = Math.max(0, Math.min(maxY, y));

  currentDraggedCard.style.left = x + "px";
  currentDraggedCard.style.top = y + "px";
});

// mouseup: Drag beenden
document.addEventListener("mouseup", () => {
  if (!currentDraggedCard) return;

  updateCardPosition(currentDraggedCard)
  currentDraggedCard = null;
  document.body.style.userSelect = "";
});

let currentDraggedCard = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function makeCardDraggable(card) {
  // mousedown auf der Card starten den Drag
  card.addEventListener("mousedown", (event) => {
    currentDraggedCard = card;

    zIndexCounter++;
    card.style.zIndex = zIndexCounter;

    const rect = card.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    document.body.style.userSelect = "none"; // Text-Auswahl verhindern
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// erstellt ein Obj um es speichern zu können
function buildCardJson(xPos, yPos, titleEl, randomColor){
  const id = Date.now();
  const nameText = titleEl ? titleEl.textContent : "";

  const cardObj = {
    id: id,
    name: nameText,
    color: randomColor,
    x: xPos,
    y: yPos,
  };

  postService.createCard(cardObj);
}

// render die karten beim onlaod
export function renderCardFromData(cardDataOrArray) {
  if (!cardTemplate) {
    console.error("Kein Card-Template geladen");
    return;
  }

  const list = Array.isArray(cardDataOrArray) ? cardDataOrArray : [cardDataOrArray];

  list.forEach(cardData => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = cardTemplate.trim();
    const card = wrapper.firstElementChild;
    card.dataset.id = cardData.id;
    card.dataset.name = cardData.name;
    card.dataset.color = cardData.color;
    card.dataset.uid = cardData.uid;

    const titleEl = card.querySelector("h3");
    if (titleEl) {
      titleEl.textContent = cardData.name || `Card #${cardCounter}`;
    }
    cardCounter++;

    const pEl = card.querySelector("p");
    if (pEl) {
      pEl.textContent = cardData.text || "Standardtext für diese Karte.";
    }

    card.style.position = "absolute";
    card.style.left = (cardData.x ?? 0) + "px";
    card.style.top = (cardData.y ?? 0) + "px";

    if (cardData.color) {
      card.style.backgroundColor = cardData.color;
    }

    makeCardDraggable(card);
    board.appendChild(card);
  });
}

function updateCardPosition(card){
  const cardObj = {
    id: card.dataset.id,
    name: card.dataset.name,
    color: card.dataset.color,
    x: parseFloat(card.style.left),
    y: parseFloat(card.style.top),
  };

  putService.updateCard(card.dataset.uid, cardObj);
}
