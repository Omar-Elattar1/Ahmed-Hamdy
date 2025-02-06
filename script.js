// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// إرسال السؤال إلى Firebase
function submitQuestion() {
    const questionInput = document.getElementById("questionInput");
    const questionText = questionInput.value.trim();

    if (questionText === "") {
        alert("يرجى إدخال سؤال!");
        return;
    }

    db.collection("questions").add({
        question: questionText,
        answered: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("تم إرسال السؤال بنجاح!");
        questionInput.value = ""; // تفريغ الحقل بعد الإرسال
        loadQuestions(); // تحديث القائمة
    }).catch(error => {
        console.error("خطأ في إرسال السؤال:", error);
    });
}

// تحميل الأسئلة وعرضها للجميع
function loadQuestions() {
    db.collection("questions").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        let questionsHTML = "";
        snapshot.forEach(doc => {
            const question = doc.data();
            questionsHTML += `<p>${question.question}</p>`;
        });
        document.getElementById("questions-list").innerHTML = questionsHTML;
    });
}

// تحميل الأسئلة عند فتح الموقع
document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
});
