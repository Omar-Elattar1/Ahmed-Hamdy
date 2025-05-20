// index.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تحميل الكاتيجوريز
async function loadCategories() {
  const container = document.getElementById("categories");
  const snapshot = await getDocs(collection(db, "categories"));
  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${data.image}" alt="${data.name_ar}" />
      <h3>${data.name_ar}</h3>
    `;
    card.onclick = () => {
      window.location.href = `category-products.html?category=${encodeURIComponent(data.name_en)}`;
    };
    container.appendChild(card);
  });
}

loadCategories();

// زر تغيير اللغة (عينة فقط)
document.getElementById("langToggle").addEventListener("click", () => {
  alert("تبديل اللغة ليس مفعّلاً بعد.");
});
