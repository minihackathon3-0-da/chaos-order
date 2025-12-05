import GetService from "./getService.js";
import { loadCardTemplate, renderCardFromData } from "../features/board/boards.js";

const getService = new GetService();

async function init(){
    await loadCardTemplate();

    const cards = await getService.getInitAllCards();
    const cardsDetails = await getService.getInitAllCardDetails();
    const categorys = await getService.getInitAllCategorys();

    console.log("cards aus Firestore:", cards);   // 👈 neu

    if (Array.isArray(cards)) {
        console.log("wwwwww, cards.length:", cards.length);
        cards.forEach(card => {
            console.log("render eine Card:", card);
            renderCardFromData(card);
        });
    } else {
        console.warn("cards ist kein Array!", cards);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch(err => console.error("Fehler in init():", err));
});