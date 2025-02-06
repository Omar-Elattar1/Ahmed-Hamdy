<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الصفحة الرسمية للشيخ أحمد حمدي</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            direction: rtl;
            text-align: center;
            background-color: #f5f5f5;
        }
        .container {
            width: 60%;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .social-links a {
            display: inline-block;
            text-decoration: none;
            color: white;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            font-weight: bold;
        }
        .tiktok { background: #ff0050; }
        .instagram { background: #e1306c; }
        .youtube { background: #ff0000; }
        input, button {
            padding: 10px;
            margin: 10px 0;
            width: 80%;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            padding: 10px;
            border-radius: 5px;
        }
        .admin {
            display: none;
            margin-top: 30px;
            padding: 10px;
            background: #ddd;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
            color: #28a745;
        }
        .credit {
            font-size: 14px;
            color: gray;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>الصفحة الرسمية للشيخ أحمد حمدي</h1>

        <form id="questionForm">
            <input type="text" id="questionInput" placeholder="اكتب سؤالك هنا..." required>
            <button type="submit">إرسال</button>
        </form>

        <div class="social-links">
            <a href="https://www.tiktok.com/@ahmedhamdy_06" class="tiktok" target="_blank">تيك توك</a>
            <a href="https://www.instagram.com/ahamdy243" class="instagram" target="_blank">إنستجرام</a>
            <a href="https://youtube.com/@ahmedhamdy1585" class="youtube" target="_blank">يوتيوب</a>
        </div>

        <h2>الأسئلة والإجابات:</h2>
        <ul id="questionsList"></ul> <!-- عرض الأسئلة في الصفحة العامة -->

        <button onclick="adminLogin()">تسجيل دخول كأدمن</button>

        <div class="admin" id="adminPanel">
            <h2>لوحة التحكم (للإجابة على الأسئلة)</h2>
            <ul id="adminQuestionsList"></ul> <!-- عرض الأسئلة التي لم يتم الإجابة عليها فقط -->
            <button onclick="deleteAllQuestions()">مسح جميع الأسئلة</button>
        </div>

        <div class="footer">صلِّ على النبي ﷺ</div>
        <div class="credit">تم التصميم بواسطة عمر</div>
    </div>

    <script>
        async function sha256(text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async function adminLogin() {
            let password = prompt("أدخل كلمة المرور:");
            if (!password) return;
            
            let hash = await sha256(password);
            const storedHash = "9d60e7c9c9d52d26762ff5b56a12f22971e4743d4a5a22916bb47d03a74dfe93"; // Hash لكلمة السر "admin123"

            if (hash === storedHash) {
                document.getElementById('adminPanel').style.display = "block";
            } else {
                alert("كلمة المرور خاطئة!");
            }
        }

        document.getElementById('questionForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            let questionInput = document.getElementById('questionInput');
            let questionText = questionInput.value.trim();
            
            if (questionText !== "") {
                let questions = JSON.parse(localStorage.getItem('questions')) || [];
                questions.push({ question: questionText, answer: "" });
                localStorage.setItem('questions', JSON.stringify(questions));
                
                questionInput.value = "";
                displayQuestions();
            }
        });

        function displayQuestions() {
            let questionsList = document.getElementById('questionsList');
            let adminQuestionsList = document.getElementById('adminQuestionsList');
            
            questionsList.innerHTML = "";
            adminQuestionsList.innerHTML = "";
            
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            
            // عرض جميع الأسئلة في الصفحة العامة (التي تم الإجابة عليها وغير الإجابة عليها)
            questions.forEach((q) => {
                let li = document.createElement('li');
                if (q.answer) {
                    li.innerHTML = `<strong>س: ${q.question}</strong><br>ج: ${q.answer}`;
                } else {
                    li.innerHTML = `<strong>س: ${q.question}</strong><br>لم تتم الإجابة بعد.`;
                }
                questionsList.appendChild(li);
            });

            // عرض الأسئلة التي لم يتم الإجابة عليها فقط في لوحة الأدمن
            questions.forEach((q, index) => {
                if (!q.answer) {
                    let adminLi = document.createElement('li');
                    adminLi.innerHTML = `<strong>س: ${q.question}</strong> 
                        <button onclick="editAnswer(${index})">أضف إجابة</button>`;
                    adminQuestionsList.appendChild(adminLi);
                }
            });
        }

        function editAnswer(index) {
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            let newAnswer = prompt("اكتب الإجابة:");

            if (newAnswer) {
                questions[index].answer = newAnswer;
                localStorage.setItem('questions', JSON.stringify(questions));
                displayQuestions();
            }
        }

        function deleteAllQuestions() {
            localStorage.removeItem('questions');  // مسح جميع الأسئلة من الـ localStorage
            displayQuestions();  // إعادة تحميل الأسئلة (اللي هتكون فارغة الآن)
            alert("تم مسح جميع الأسئلة.");
        }

        displayQuestions();
    </script>
</body>
</html>
