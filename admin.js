// admin.js

// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
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

// كلمة مرور الدخول
const adminPassword = "el4attar#";

// التحقق من كلمة المرور
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const password = document.getElementById("adminPassword").value;
  if (password === adminPassword) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("كلمة المرور غير صحيحة!");
  }
});

// التنقل بين التبويبات
const tabButtons = document.querySelectorAll(".admin-tabs button");
const sections = document.querySelectorAll(".admin-section");

tabButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    sections[idx].classList.add("active");
  });
});

// إضافة كاتيجوري
document.getElementById("addCategoryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameAr = document.getElementById("catNameAr").value;
  const nameEn = document.getElementById("catNameEn").value;
  const image = document.getElementById("catImage").value;

  if (!nameAr || !nameEn || !image) {
    alert("يرجى ملء جميع الحقول.");
    return;
  }

  try {
    await addDoc(collection(db, "categories"), {
      name_ar: nameAr,
      name_en: nameEn,
      image,
      created_at: serverTimestamp()
    });
    alert("تمت إضافة الكاتيجوري بنجاح!");
    e.target.reset();
  } catch (error) {
    console.error("خطأ في إضافة الكاتيجوري:", error);
  }
});

// إضافة منتج
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameAr = document.getElementById("prodNameAr").value;
  const nameEn = document.getElementById("prodNameEn").value;
  const images = document.getElementById("prodImages").value.split(",");
  const descriptionAr = document.getElementById("prodDescAr").value;
  const descriptionEn = document.getElementById("prodDescEn").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const status = document.getElementById("prodStatus").value;
  const category = document.getElementById("prodCategory").value;
  const specs = document.getElementById("prodSpecs").value;
  const notes = document.getElementById("prodNotes").value;

  if (!nameAr || !nameEn || !images.length || isNaN(price)) {
    alert("يرجى تعبئة جميع الحقول الأساسية.");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name_ar: nameAr,
      name_en: nameEn,
      images,
      description_ar: descriptionAr,
      description_en: descriptionEn,
      price,
      status,
      category,
      specs,
      notes,
      created_at: serverTimestamp()
    });
    alert("تمت إضافة المنتج بنجاح!");
    e.target.reset();
  } catch (error) {
    console.error("خطأ في إضافة المنتج:", error);
  }
});

// عرض الطلبات
async function loadOrders() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "orders"));
    snapshot.forEach(doc => {
      const order = doc.data();
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <strong>اسم العميل:</strong> ${order.name || "غير متوفر"}
        <p><strong>رقم الهاتف:</strong> ${order.phone}</p>
        <p><strong>رقم احتياطي:</strong> ${order.altPhone || "لا يوجد"}</p>
        <p><strong>العنوان:</strong> ${order.address}</p>
        <p><strong>عدد المنتجات:</strong> ${order.cart?.length || 0}</p>
      `;
      orderList.appendChild(card);
    });
  } catch (error) {
    console.error("فشل تحميل الطلبات:", error);
  }
}

// تحميل الطلبات عند فتح التبويب
document.querySelector('button[data-tab="orders"]').addEventListener("click", loadOrders);
