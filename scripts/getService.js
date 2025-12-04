import { getFirestore, getDocs , collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "../firebase.js";


// get = Sachen(Objekte) bekommen
class GetService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
    }

    // ---- card -----
    // lade alle
    async getInitAllCards() {
        try {
            const snapshot = await getDocs(collection(this.db, "cards"));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Karten:", error);
        }
    }

    // lade einzelne
    //            uid
    async getCard(cardId) {
        try {
            const snapshot = await getDoc(collection(this.db, "cards", cardId));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Karte:", error);
        }
    }

    // ---- details -----
    async getInitAllCardDetails() {
        try {
            const snapshot = await getDocs(collection(this.db, "cardDetails"));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Kartendetails:", error);
        }
    }

    async getCardDetail(cardId) {
        try {
            const snapshot = await getDoc(collection(this.db, "cardDetails", cardId));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Kartendetails:", error);
        }
    }

    // ---- category -----
    async getInitAllCategorys() {
        try {
            const snapshot = await getDocs(collection(this.db, "categorys"));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Kategorien:", error);
        }
    }

      async getCategorys(catId) {
        try {
            const snapshot = await getDoc(collection(this.db, "categorys", catId));
            return snapshot.docs.map(d => ({
                uid: d.uid,
                ...d.data()
            }));
        } catch (error) {
            console.error("❌ Felher beim laden der Kategorie:", error);
        }
    }
}

export default GetService;