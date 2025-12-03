import GetService from "./getService.js";

const getService = new GetService();

async function init(){
    const cards = await getService.getInitAllCards();
    const cardsDetails = await getService.getInitAllCardDetails();
    const categorys = await getService.getInitAllCategorys();
    const card = await getService.getCard();
    const cardsDetail = await getService.getCardDetails();
    const category = await getService.getCategory();
}

window.init = init;