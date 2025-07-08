import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvyAoar8_8JueY-DP44cIXoY-FwBBKBWU",
    authDomain: "radio-app-2e7d7.firebaseapp.com",
    projectId: "radio-app-2e7d7",
    storageBucket: "radio-app-2e7d7.firebasestorage.app",
    messagingSenderId: "693869800166",
    appId: "1:693869800166:web:124de6b20bb9034e542927",
    measurementId: "G-ET7LL5C5LZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);


export { app, auth, analytics };
