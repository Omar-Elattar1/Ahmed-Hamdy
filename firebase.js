// تكوين Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveQuestionToFirebase(questionData) {
    db.collection("questions").add(questionData).then(() => {
        console.log("تم حفظ السؤال");
    });
}

function loadUnansweredQuestions() {
    db.collection("questions").where("answered", "==", false).get().then(snapshot => {
        let questionsHTML = "";
        snapshot.forEach(doc => {
            const question = doc.data();
            questionsHTML += `<p>${question.question} <button onclick="deleteQuestion('${doc.id}')">حذف</button></p>`;
        });
        document.getElementById("unanswered-questions").innerHTML = questionsHTML;
    });
}

function deleteQuestion(id) {
    db.collection("questions").doc(id).delete().then(() => {
        loadUnansweredQuestions();
    });
}

function clearAllQuestionsFromFirebase() {
    db.collection("questions").get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
    });
}
