import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA0_bm9VEhf6bcgRGUQVYn-qrS2u9GGq3A",
    authDomain: "tictactoe-45624.firebaseapp.com",
    projectId: "tictactoe-45624",
    storageBucket: "tictactoe-45624.appspot.com",
    messagingSenderId: "291151382663",
    appId: "1:291151382663:web:c10ec1cd8bd6541108d022",
    measurementId: "G-K37ELNGWNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
