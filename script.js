const adminPasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd49e4f493b6a000"; // "password321" مشفرة

function submitQuestion() {
    const questionInput = document.getElementById("questionInput").value;
    if (questionInput.trim() === "") return;
    
    const questionData = {
        question: questionInput,
        answered: false
    };

    saveQuestionToFirebase(questionData);
    document.getElementById("questionInput").value = "";
}

function adminLogin() {
    const enteredPassword = document.getElementById("adminPassword").value;
    const enteredHash = sha256(enteredPassword);

    if (enteredHash === adminPasswordHash) {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
        loadUnansweredQuestions();
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
}

function deleteAllQuestions() {
    if (confirm("هل أنت متأكد أنك تريد حذف جميع الأسئلة؟")) {
        clearAllQuestionsFromFirebase();
    }
}

// دالة SHA256 لتشفير كلمة المرور
function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return crypto.subtle.digest("SHA-256", data).then(hash => {
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    });
}
