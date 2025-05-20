// تغيير اللغة - مؤقت (يمكن تطويره لاحقاً)
const langToggle = document.getElementById("langToggle");
const categoriesTitle = document.getElementById("categoriesTitle");
let currentLang = "ar";

langToggle.addEventListener("click", () => {
  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    categoriesTitle.textContent = "Categories";
    langToggle.textContent = "ع / EN";
  } else {
    currentLang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    categoriesTitle.textContent = "التصنيفات";
    langToggle.textContent = "EN / ع";
  }
  // يمكنك تحديث محتويات أخرى حسب اللغة لاحقاً
});

// استدعاء Firebase
import { db } from "./firebase-config.js"; // يفترض أن في هذا الملف إعداد Firebase

const categoriesGrid = document.getElementById("categoriesGrid");

// دالة لجلب التصنيفات من Firestore
async function loadCategories() {
  try {
    const querySnapshot = await db.collection("categories").orderBy("order", "asc").get();

    if (querySnapshot.empty) {
      categoriesGrid.innerHTML = "<p>لا توجد تصنيفات.</p>";
      return;
    }

    categoriesGrid.innerHTML = ""; // نفضي المحتوى القديم

    querySnapshot.forEach((doc) => {
      const category = doc.data();
      const categoryName = currentLang === "ar" ? category.nameAr : category.nameEn;

      const categoryCard = document.createElement("div");
      categoryCard.classList.add("category-card");

      categoryCard.innerHTML = `
        <img src="${category.image}" alt="${categoryName}" class="category-image" />
        <div class="category-info">
          <h3 class="category-name">${categoryName}</h3>
        </div>
      `;

      categoryCard.addEventListener("click", () => {
        window.location.href = `category-products.html?categoryId=${doc.id}`;
      });

      categoriesGrid.appendChild(categoryCard);
    });
  } catch (error) {
    categoriesGrid.innerHTML = `<p>حدث خطأ أثناء جلب التصنيفات: ${error.message}</p>`;
  }
}

// تحميل التصنيفات عند فتح الصفحة
loadCategories();
