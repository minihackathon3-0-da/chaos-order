// main.js         # Einstieg: App starten, DOM-Elemente holen, Features initialisieren

import {
  initDragAndDrop,
  makeCardDraggable,
} from "./features/board/dragdrop.js";

const boardEl = document.getElementById("board");

initDragAndDrop(boardEl); // hier drin werden document.addEventListener(...) gesetzt

function addCard(text) { // Mina wird das gebraucht? 
  const card = createGoalCardElement({ id, text });
  boardEl.appendChild(card);
  makeCardDraggable(card);
}
