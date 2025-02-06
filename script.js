const adminPasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd49e4f493b6a000"; // "password321" مشفرة

// إرسال السؤال إلى Firebase
function submitQuestion() {
    const questionInput = document.getElementById("questionInput").value.trim();
    
    if (questionInput === "") {
        alert("يرجى إدخال سؤال!");
        return;
    }

    const questionData = {
        question: questionInput,
        answered: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("questions").add(questionData)
        .then(() => {
            console.log("تم حفظ السؤال بنجاح");
            document.getElementById("questionInput").value = "";
            loadQuestions(); // إعادة تحميل الأسئلة بعد الإرسال
        })
        .catch(error => {
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

// تسجيل دخول الأدمن
function adminLogin() {
    const enteredPassword = document.getElementById("adminPassword").value;
    sha256(enteredPassword).then(enteredHash => {
        if (enteredHash === adminPasswordHash) {
            document.getElementById("admin-login").style.display = "none";
            document.getElementById("admin-panel").style.display = "block";
            loadUnansweredQuestions();
        } else {
            alert("كلمة المرور غير صحيحة!");
        }
    });
}

// تحميل الأسئلة غير المجابة للأدمن
function loadUnansweredQuestions() {
    db.collection("questions").where("answered", "==", false).get().then(snapshot => {
        let questionsHTML = "";
        snapshot.forEach(doc => {
            const question = doc.data();
            questionsHTML += `<p>${question.question} 
                <button onclick="deleteQuestion('${doc.id}')">حذف</button>
                <button onclick="answerQuestion('${doc.id}')">إجابة</button>
            </p>`;
        });
        document.getElementById("unanswered-questions").innerHTML = questionsHTML;
    });
}

// حذف سؤال معين
function deleteQuestion(id) {
    db.collection("questions").doc(id).delete().then(() => {
        loadUnansweredQuestions();
    });
}

// وضع إجابة لسؤال معين
function answerQuestion(id) {
    const answer = prompt("اكتب الإجابة:");
    if (answer) {
        db.collection("questions").doc(id).update({
            answer: answer,
            answered: true
        }).then(() => {
            loadUnansweredQuestions();
            loadQuestions();
        });
    }
}

// حذف جميع الأسئلة
function deleteAllQuestions() {
    if (confirm("هل أنت متأكد أنك تريد حذف جميع الأسئلة؟")) {
        db.collection("questions").get().then(snapshot => {
            snapshot.forEach(doc => {
                doc.ref.delete();
            });
        });
    }
}

// دالة SHA-256 لتشفير كلمة المرور
async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// تحميل الأسئلة عند فتح الموقع
document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
});
