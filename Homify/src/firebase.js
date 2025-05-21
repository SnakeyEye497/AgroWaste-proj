import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1io5bIViyPXVM50Xx3-JorT22CrlnH7Y",
    authDomain: "ecoharvest-6de5b.firebaseapp.com",
    projectId: "ecoharvest-6de5b",
    storageBucket: "ecoharvest-6de5b.firebasestorage.app",
    messagingSenderId: "142594517129",
    appId: "1:142594517129:web:6d491c4cac333a63cb7e58"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
