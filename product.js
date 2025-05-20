import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// عناصر HTML
const productNameElem = document.getElementById("product-name");
const productGallery = document.getElementById("product-gallery");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const productStatus = document.getElementById("product-status");
const productCategory = document.getElementById("product-category");
const specsList = document.getElementById("specs-list");
const notesText = document.getElementById("notes-text");
const quantityInput = document.getElementById("quantity");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const backBtn = document.getElementById("back-btn");

// جلب معرف المنتج من الرابط
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const currentLang = urlParams.get("lang") || "ar";

// تحميل بيانات المنتج من Firebase
async function loadProduct() {
  if (!productId) {
    alert("لم يتم تحديد المنتج.");
    return;
  }

  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert(currentLang === "ar" ? "المنتج غير موجود." : "Product not found.");
      return;
    }

    const product = docSnap.data();

    // الاسم حسب اللغة
    const name = currentLang === "ar" ? product.name_ar : product.name_en;
    productNameElem.textContent = name;
    productDescription.textContent = currentLang === "ar" ? product.description_ar : product.description_en;
    productPrice.textContent = `السعر: ${product.price} ر.س`;
    productStatus.textContent = `الحالة: ${product.status}`;
    productCategory.textContent = `التصنيف: ${product.category}`;

    // المواصفات
    specsList.innerHTML = "";
    if (product.specs) {
      Object.entries(product.specs).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.textContent = `${key}: ${value}`;
        specsList.appendChild(li);
      });
    }

    // ملاحظات إضافية
    notesText.textContent = product.notes || "";

    // صور المنتج (carousel)
    productGallery.innerHTML = "";
    if (product.images && product.images.length > 0) {
      product.images.forEach((imgUrl) => {
        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = name;
        productGallery.appendChild(img);
      });
    } else {
      productGallery.textContent = currentLang === "ar" ? "لا توجد صور." : "No images.";
    }

  } catch (error) {
    console.error("Error loading product:", error);
    alert(currentLang === "ar" ? "حدث خطأ أثناء تحميل المنتج." : "Error loading product.");
  }
}

// إضافة المنتج للسلة في localStorage
function addToCart() {
  const qty = parseInt(quantityInput.value);
  if (isNaN(qty) || qty <= 0) {
    alert(currentLang === "ar" ? "الرجاء إدخال كمية صحيحة." : "Please enter a valid quantity.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({ id: productId, quantity: qty, name: productNameElem.textContent, price: productPrice.textContent });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(currentLang === "ar" ? "تمت إضافة المنتج إلى السلة." : "Product added to cart.");
}

addToCartBtn.addEventListener("click", addToCart);

backBtn.addEventListener("click", () => {
  window.history.back();
});

window.addEventListener("DOMContentLoaded", loadProduct);
