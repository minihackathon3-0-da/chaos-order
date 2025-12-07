// dragdrop.js
let currentDraggedCard = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let boardEl = null;

export function initDragAndDrop(boardElement) {
  boardEl = boardElement;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

export function makeCardDraggable(card) {
  card.addEventListener("mousedown", (event) => {
    currentDraggedCard = card;

    const rect = card.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    document.body.style.userSelect = "none";
  });
}

function handleMouseMove(event) {
  if (!currentDraggedCard || !boardEl) return;
  const boardRect = boardEl.getBoundingClientRect();
  // … wie oben …
}

function handleMouseUp() {
  currentDraggedCard = null;
  document.body.style.userSelect = "";
}
