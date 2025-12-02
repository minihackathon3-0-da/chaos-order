import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
class Firebase {
    constructor(){

        this.apiKey = import.meta.API_KEY;
        this.authDomain = import.meta.AUTH_DOMAIN;
        this.projectId = import.meta.PROJECT_ID;
        this.storageBucket = import.meta.STORAGE_BUCKET;
        this.messagingSenderId = import.meta.MASSAGING_SENDER_ID;
        this.appId = import.meta.APP_ID;

        this.firebaseConfig = {
            apiKey: this.apiKey,           
            authDomain: this.authDomain,   
            projectId: this.projectId,     
            storageBucket: this.storageBucket, 
            messagingSenderId: this.messagingSenderId, 
            appId: this.appId,             
        };

        this.app = initializeApp(this.firebaseConfig);
    }
}

export default Firebase;