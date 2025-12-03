import { getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "./firebase.js";


// put = Sachen(Objekte) partial updaten

class PutService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
    }

    // ---- card -----
    // optional: nur Felder updaten (merge)
    //               uid      Obj
    async updateCard(cardId, data) {
        try {
            await setDoc(doc(this.db, "cards", cardId), data, { merge: true });
        } catch (error) {
            console.error("❌ Fehler beim Aktualisieren der Karte:", error);
        }
    }

    // ---- details -----
    async updateCardDetail(cardId, data) {
        try {
            await setDoc(doc(this.db, "cardDetails", cardId), data, { merge: true });
        } catch (error) {
            console.error("❌ Fehler beim Aktualisieren der Kartendetails:", error);
        }
    }

    // ---- category -----
    async updateCategory(catId, data) {
        try {
            await setDoc(doc(this.db, "categorys", catId), data, { merge: true });
        } catch (error) {
            console.error("❌ Fehler beim Aktualisieren der Kategorie:", error);
        }
    }
}


export default PutService;