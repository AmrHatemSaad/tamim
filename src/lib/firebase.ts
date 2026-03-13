import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7HGoFzuzSPYMAoK6vnsGNteejXsB6ids",
  authDomain: "tamim-f4b34.firebaseapp.com",
  projectId: "tamim-f4b34",
  storageBucket: "tamim-f4b34.firebasestorage.app",
  messagingSenderId: "931429823053",
  appId: "1:931429823053:web:21459f6957c2b66e4de204",
  measurementId: "G-38GGT2YTEB"
};

// تشغيل الفايربيز
const app = initializeApp(firebaseConfig);

// تصدير الأدوات اللي هنستخدمها
export const db = getFirestore(app); // قاعدة البيانات
export const storage = getStorage(app); // مخزن الصور