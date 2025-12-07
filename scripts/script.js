import GetService from "./getService.js";
import { loadCardTemplate, renderCardFromData } from "../features/board/boards.js";

const getService = new GetService();

async function init() {
   
    await loadCardTemplate();

    const cards = await getService.getInitAllCards();
    const cardsDetails = await getService.getInitAllCardDetails();
    const categorys = await getService.getInitAllCategorys();

    if (Array.isArray(cards)) {
        cards.forEach(card => {
            renderCardFromData(card);
        });
    } else {
        console.warn("cards ist kein Array!", cards);
    }
    render();
}
 
document.addEventListener("DOMContentLoaded", () => {
    init().catch(err => console.error("Fehler in init():", err));
});


function render() {
    renderHeader();
    renderFooter(); 
}

import { getHeaderTemplate, getFooterTemplate } from './templates.js';

function renderHeader() {
    const headerRef = document.getElementById('header');
    if (headerRef) {
        headerRef.innerHTML = getHeaderTemplate();
    } else {
        console.error('Header-Element nicht gefunden!');
    }
}


function renderFooter() {
    const footerRef = document.getElementById('footer');
    if (footerRef) {
        footerRef.innerHTML = getFooterTemplate();
    } else {
        console.error('Footer-Element nicht gefunden!');
    }
    console.log(footerRef);
}

