<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صفحة Omar</title>
    <link rel="stylesheet" href="omar.css">
</head>
<body>

<header>
    <div>
        <img src="./photo.jpg" width="150px" height="150px" alt="photo">
    </div>

    <p>
        <div><u>Iam</u></div>
        <b><span style="color:brown;"><div>Omar Yasser Elattar</div></span></b>
        <br>
        <div><u>Studies</u></div>
        <div>in <b>M.S.L.S</b></div>
        <br> 
        <div><u>Works</u></div>
        <div>in Video Montage</div>
        <div>and <span style="color:blue"><b>Photoshop</b></span></div>
        <br> 
        <u><div>Writing Podcasts</div></u>
    </p>
    <hr>
</header>

<main>
    <section id="contact">
        <h4>Contact Me</h4>

        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $name = htmlspecialchars($_POST["name"]);
            $email = htmlspecialchars($_POST["email"]);
            $password = htmlspecialchars($_POST["password"]);
            $message = htmlspecialchars($_POST["message"]);
            $gender = htmlspecialchars($_POST["gender"]);
            $country = htmlspecialchars($_POST["country"]);
            $helpOptions = isset($_POST["help"]) ? implode(", ", $_POST["help"]) : "None";

            // عرض البيانات بعد الإرسال
            echo "<h2>تم استقبال البيانات بنجاح!</h2>";
            echo "<p><b>الاسم:</b> $name</p>";
            echo "<p><b>البريد الإلكتروني:</b> $email</p>";
            echo "<p><b>الرسالة:</b> $message</p>";
            echo "<p><b>الجنس:</b> $gender</p>";
            echo "<p><b>الدولة:</b> $country</p>";
            echo "<p><b>المساعدة في:</b> $helpOptions</p>";

            // حفظ البيانات في ملف نصي
            $data = "Name: $name\nEmail: $email\nGender: $gender\nCountry: $country\nMessage: $message\nHelp With: $helpOptions\n--------------------\n";
            file_put_contents("submissions.txt", $data, FILE_APPEND);
        }
        ?>

        <!-- نموذج التواصل -->
        <form action="" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br><br>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br><br>

            <label for="message">Message:</label>
            <textarea name="message" id="message" cols="30" rows="5" required></textarea>
            <br><br>

            <h4>Gender</h4>
            <input type="radio" name="gender" value="Male" required> Male
            <input type="radio" name="gender" value="Female" required> Female
            <br><br>

            <h4>Country</h4>
            <select name="country">
                <option value="Egypt">Egypt</option>
                <option value="Qatar">Qatar</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Morocco">Morocco</option>
            </select>
            <br><br>

            <h4>I can help you with:</h4>
            <input type="checkbox" name="help[]" value="Podcast"> Podcast <br>
            <input type="checkbox" name="help[]" value="Graphic Design"> Photo Graphic Designing <br>
            <input type="checkbox" name="help[]" value="Video Montage"> Video montage <br>
            <input type="checkbox" name="help[]" value="Sponsorship"> Sponsor <br><br>

            <input type="submit" value="Send">
        </form>

        <hr>
        <h4>Contact Info</h4>
        <p><b>Phone:</b> +201027795920</p>
        <p><b>Telegram:</b> <a href="https://t.me/yourtelegram">Your Telegram</a></p>
        <p><b>Socials:</b></p>
        <a href="https://www.facebook.com/profile.php?id=100051007188187">Facebook</a><br>
        <a href="https://www.instagram.com/invites/contact/?i=19g9l84b0qlru&utm_content=jk06eyb">Instagram</a><br>
        <a href="https://www.tiktok.com/@o_el3attar">TikTok</a><br>
        <a href="mailto:omarelattar308@gmail.com">Email Me</a>
        <hr>
    </section>

    <section id="about">
        <h3>About Me</h3>
        <h4>My Skills</h4>
        <ul>
            <li>Programming</li>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Python</li>
            </ul>
            <li>Montage</li>
            <li>Designing</li>
            <li>Writing</li>
            <li>Psychology Studies</li>
        </ul>
    </section>

    <section id="grades">
        <h4>Grades</h4>
        <table border="1" width="30%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Semester</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Omar</td>
                    <td>First Semester</td>
                    <td>97.5%</td>
                </tr>
                <tr>
                    <td>Yasser</td>
                    <td>Second Semester</td>
                    <td>99.2%</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Total</td>
                    <td>98.5%</td>
                </tr>
            </tfoot>
        </table>
    </section>
</main>

<footer>
    <p>All rights reserved &copy; 2025</p>
</footer>

</body>
</html>
