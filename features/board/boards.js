const board = document.querySelector(".board");
const addButton = document.getElementById("add-card-btn");
const cardTextInput = document.getElementById("card-text-input"); // 👈 neu

let cardTemplate = "";
let cardCounter = 1;
let test = "Mina";

// Template laden
async function loadCardTemplate() {
  const res = await fetch("cards.html");
  cardTemplate = await res.text();
}
loadCardTemplate();

// Card aus Template erzeugen
function createCardFromTemplate() {
  hello(test);
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
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  card.style.left = x + "px";
  card.style.top = y + "px";

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

    const rect = card.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    document.body.style.userSelect = "none"; // Text-Auswahl verhindern
  });
}
