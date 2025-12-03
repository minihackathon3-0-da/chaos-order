import { getFirestore, getDocs , collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "./firebase.js";


class GetService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
    }

    
    async getInitAllCards() {
        try {
            return await getDocs(collection(this.db, "cards"));
        } catch (error) {
            console.error("❌ Felher beim laden der Karten:", error);
        }
    }

    async getCard(cardId) {
        try {
            return await getDocs(collection(this.db, "cards", cardId));
        } catch (error) {
            console.error("❌ Felher beim laden der Karten:", error);
        }
    }

    async getInitAllCardDetails() {
        try {
            return await getDocs(collection(this.db, "cardDetails"));
        } catch (error) {
            console.error("❌ Felher beim laden der Kartendetaisl:", error);
        }
    }

    async getCardDetail(cardId) {
        try {
            return await getDocs(collection(this.db, "cardDetails", cardId));
        } catch (error) {
            console.error("❌ Felher beim laden der Kartendetaisl:", error);
        }
    }

    async getInitAllCategorys() {
        try {
            return await getDocs(collection(this.db, "categorys"));
        } catch (error) {
            console.error("❌ Felher beim laden der Kategorien:", error);
        }
    }

      async getCategorys(catId) {
        try {
            return await getDocs(collection(this.db, "categorys", catId));
        } catch (error) {
            console.error("❌ Felher beim laden der Kategorien:", error);
        }
    }
}

export default GetService;