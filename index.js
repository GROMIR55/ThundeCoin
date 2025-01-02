document.addEventListener("DOMContentLoaded", () => {

    const fullscreenButton = document.getElementById("fullscreen-icon");
    const iframe = document.querySelector("iframe");

    if (fullscreenButton && iframe) {
        fullscreenButton.addEventListener("click", () => {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            } else {
                console.error("Используй нормальный браузер, советую хром или красную лису.");
            }
        });
    } else {
        console.error("Ты куда то не туда нажимаешь");
    }

    const themeSwitch = document.getElementById("theme-switch");
    const themeIcon = document.getElementById("theme-icon");

    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeSwitch.checked = savedTheme === "white";
    themeIcon.textContent = savedTheme === "white" ? "☀️" : "🌚";

    themeSwitch.addEventListener("change", () => {
        const newTheme = themeSwitch.checked ? "white" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeIcon.textContent = newTheme === "white" ? "☀️" : "🌚";
    });

    const translations = {
        en: {
            home: "Home",
            design: "Design",
            memes: "Memes",
            games: "Games",
            quizzes: "Quizzes",
            contact: "Contact",
            customBigText: "<br>Become the richest businessman in<br>Thunder Coin",
            customSmallText: "<br><br>Go from poor to rich businessman!<br>Buy upgrades, complete tasks, invite friends and become the best!<br><br>",
            customButton: "Play!",
            telegram: "Telegram",
            twitter: "Twitter",
            youtube: "YouTube",
            copyright: "Copyright © 2025 ThunderCoin | All rights reserved.",
            customFormText: "Technical support"
        },
        ru: {
            home: "Главная",
            design: "Дизайн",
            memes: "Мемы",
            games: "Игры",
            quizzes: "Викторины",
            contact: "Контакты",
            customBigText: "<br>Станьте самым богатым бизнесменом в<br>Thunder Coin",
            customSmallText: "<br><br>Пройдите путь от бедного бизнесмена до богатого!<br>Покупайте улучшения, выполняйте задания, приглашайте друзей и становитесь лучшим!<br><br>",
            customButton: "Играть!",
            telegram: "Телеграм",
            twitter: "Твиттер",
            youtube: "Ютуб",
            copyright: "Авторские права © 2025 ThunderCoin | Все права защищены.",
            customFormText: "Техническая поддержка"
        },
    };

    const savedLanguage = localStorage.getItem("language") || "en";
    document.documentElement.lang = savedLanguage;

    document.getElementById("language-switch").value = savedLanguage;

    translate(savedLanguage);

    document.getElementById("language-switch").addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem("language", selectedLanguage);
        document.documentElement.lang = selectedLanguage;
        translate(selectedLanguage);
    });

    function translate(language) {
        document.querySelectorAll("[data-translate]").forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });
    }


    const scrollTop = document.getElementById("scrollToTopBtn");

    // Показать кнопку при прокрутке вниз
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTop.style.display = "block";
            scrollTop.style.opacity = 1;
        } else {
            scrollTop.style.opacity = 0;
            setTimeout(() => {
                scrollTop.style.display = "none";
            }, 300);
        }
    });

    scrollTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
