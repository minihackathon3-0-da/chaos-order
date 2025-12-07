import { getFirestore, addDoc , collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "../firebase.js";

// post = Sachen(Objekte) neu anlegen

class PostService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
    }

    // ---- card -----
    //               card
    async createCard(cardData) {
        try {
            await addDoc(collection(this.db, "cards"), cardData);
        } catch (error) {
            console.error("❌ Fehler beim Erstellen der Karte:", error);
        }
    }

    // ---- details -----
    //                     card
    async createCardDetail(detailData) {
        try {
            await addDoc(collection(this.db, "cardDetails"), detailData);
        } catch (error) {
            console.error("❌ Fehler beim Erstellen der Kartendetails:", error);
        }
    }

    // ---- category -----
    //                  categoryObj
    async createCategory(catData) {
        try {
            await addDoc(collection(this.db, "categorys"), catData);
        } catch (error) {
            console.error("❌ Fehler beim Erstellen der Kategorie:", error);
        }
    }

}


export default PostService;