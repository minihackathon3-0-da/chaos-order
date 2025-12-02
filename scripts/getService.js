import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
import Firebase from "../scripts/firebase.js";


class getService extends Firebase {
    constructor() {
        super();
        this.db = getFirestore(this.app);
        // später löschen
        this.testFirebaseConnection();
    }

    // später löschen
    async testFirebaseConnection() {
        try {
            await setDoc(doc(this.db, "card", "1CVs9IzuVJvHqyhOFG6n"), { 
                timestamp: new Date().toISOString(),
                status: "connected"
            });
            
            console.log("✅ Erfolgreich mit Firebase verbunden und in Firestore geschrieben!");
            
        } catch (error) {
            console.error("❌ FEHLER BEI DER FIREBASE-VERBINDUNG:", error);
        }
    }
}

new getService();