function submitQuestion() {
    let questionText = document.getElementById("questionInput").value;
    if (questionText.trim() === "") return;

    db.collection("questions").add({
        question: questionText,
        answer: ""
    });

    document.getElementById("questionInput").value = "";
}

function fetchQuestions() {
    db.collection("questions").onSnapshot(snapshot => {
        let questionsList = document.getElementById("questionsList");
        let storedQuestions = document.getElementById("storedQuestions");
        questionsList.innerHTML = "";
        storedQuestions.innerHTML = "";

        snapshot.docs.forEach(doc => {
            let data = doc.data();
            let questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.classList.add(data.answer ? "answered" : "unanswered");
            questionDiv.innerHTML = `<p><strong>سؤال:</strong> ${data.question}</p>`;

            if (data.answer) {
                questionDiv.innerHTML += `<p><strong>الإجابة:</strong> ${data.answer}</p>`;
            }

            storedQuestions.appendChild(questionDiv);
            questionsList.appendChild(questionDiv.cloneNode(true));
        });
    });
}

fetchQuestions();
