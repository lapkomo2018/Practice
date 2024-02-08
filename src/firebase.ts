import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0_bm9VEhf6bcgRGUQVYn-qrS2u9GGq3A",
    authDomain: "tictactoe-45624.firebaseapp.com",
    projectId: "tictactoe-45624",
    storageBucket: "tictactoe-45624.appspot.com",
    messagingSenderId: "291151382663",
    appId: "1:291151382663:web:c10ec1cd8bd6541108d022",
    measurementId: "G-K37ELNGWNH"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
