// تغيير اللغة مؤقت (مثل category.js)
const langToggle = document.getElementById("langToggle");
const categoryTitle = document.getElementById("categoryTitle");
const backBtn = document.getElementById("backBtn");
let currentLang = "ar";

langToggle.addEventListener("click", () => {
  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    categoryTitle.textContent = "Category Products";
    backBtn.textContent = "Back to Catalog";
    langToggle.textContent = "ع / EN";
  } else {
    currentLang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    categoryTitle.textContent = "منتجات التصنيف";
    backBtn.textContent = "العودة للكتالوج";
    langToggle.textContent = "EN / ع";
  }
});

// زر العودة للكتالوج (صفحة التصنيفات)
backBtn.addEventListener("click", () => {
  window.location.href = "category.html";
});

// استيراد Firebase
import { db } from "./firebase-config.js";

const productsGrid = document.getElementById("productsGrid");

// استخراج معرف الكاتيجوري من الرابط
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("categoryId");

// جلب بيانات الكاتيجوري لعرض اسمه
async function loadCategoryName() {
  if (!categoryId) {
    categoryTitle.textContent = currentLang === "ar" ? "منتجات التصنيف" : "Category Products";
    return;
  }
  try {
    const doc = await db.collection("categories").doc(categoryId).get();
    if (!doc.exists) {
      categoryTitle.textContent = currentLang === "ar" ? "منتجات التصنيف" : "Category Products";
      return;
    }
    const category = doc.data();
    categoryTitle.textContent = currentLang === "ar" ? category.nameAr : category.nameEn;
  } catch (error) {
    categoryTitle.textContent = currentLang === "ar" ? "منتجات التصنيف" : "Category Products";
  }
}

// جلب المنتجات حسب التصنيف
async function loadProducts() {
  if (!categoryId) {
    productsGrid.innerHTML = currentLang === "ar" ? "<p>معرف التصنيف غير موجود.</p>" : "<p>Category ID missing.</p>";
    return;
  }

  try {
    const querySnapshot = await db.collection("products")
      .where("categoryId", "==", categoryId)
      .orderBy("nameAr")
      .get();

    if (querySnapshot.empty) {
      productsGrid.innerHTML = currentLang === "ar" ? "<p>لا توجد منتجات في هذا التصنيف.</p>" : "<p>No products found in this category.</p>";
      return;
    }

    productsGrid.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const name = currentLang === "ar" ? product.nameAr : product.nameEn;
      const price = product.price.toFixed(2);
      const status = product.status; // متوفر، نفد، قريبا
      let statusText = "";
      if (currentLang === "ar") {
        if (status === "available") statusText = "متوفر";
        else if (status === "soldout") statusText = "نفد";
        else if (status === "coming") statusText = "قريبًا";
      } else {
        if (status === "available") statusText = "Available";
        else if (status === "soldout") statusText = "Sold Out";
        else if (status === "coming") statusText = "Coming Soon";
      }

      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

            productCard.innerHTML = `
        <img src="${product.images[0]}" alt="${name}" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">${name}</h3>
          <p class="product-price">${price} ر.س</p>
          <p class="product-status">${statusText}</p>
        </div>
      `;

      // عند الضغط على كرت المنتج ننتقل لصفحة التفاصيل مع معرف المنتج
      productCard.addEventListener("click", () => {
        window.location.href = `product.html?productId=${doc.id}&lang=${currentLang}`;
      });

      productsGrid.appendChild(productCard);
    });

  } catch (error) {
    console.error("Error loading products:", error);
    productsGrid.innerHTML = currentLang === "ar" 
      ? "<p>حدث خطأ أثناء تحميل المنتجات.</p>" 
      : "<p>Error loading products.</p>";
  }
}

// عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  loadCategoryName();
  loadProducts();
});

