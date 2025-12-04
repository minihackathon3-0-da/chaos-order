import { getFirestore, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "../firebase.js";

// delete = Sachen(Objekte) löschen

class PostService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
    }

    // zum löschen braucht man die uid!

    // ---- card -----
    //               uid
    async deleteCard(cardId) {
        try {
            await deleteDoc(doc(this.db, "cards", cardId));
        } catch (error) {
            console.error("❌ Fehler beim Löschen der Karte:", error);
        }
    }

    // ---- details -----
    async deleteCardDetail(cardId) {
        try {
            await deleteDoc(doc(this.db, "cardDetails", cardId));
        } catch (error) {
            console.error("❌ Fehler beim Löschen der Kartendetails:", error);
        }
    }

    // ---- category -----
    async deleteCategory(catId) {
        try {
            await deleteDoc(doc(this.db, "categorys", catId));
        } catch (error) {
            console.error("❌ Fehler beim Löschen der Kategorie:", error);
        }
    }
}


export default PostService;