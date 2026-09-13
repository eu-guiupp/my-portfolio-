/* =========================================
   PORTFÓLIO GUILHERMY
   JavaScript
========================================= */


/* =========================================
   1. CAIXA DO TÍTULO
   Movimento suave seguindo o mouse
========================================= */

const highlightBox = document.querySelector(".highlight-box");

if (highlightBox) {

    document.addEventListener("mousemove", (event) => {

        const mouseX =
            (event.clientX / window.innerWidth - 0.5);

        const mouseY =
            (event.clientY / window.innerHeight - 0.5);

        const moveX = mouseX * 6;
        const moveY = mouseY * 6;

        highlightBox.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

}


/* =========================================
   2. TERMINAL
   Efeito de digitação
========================================= */

const terminal = document.querySelector(".terminal-body");

if (terminal) {

    terminal.style.opacity = "0";

    setTimeout(() => {

        terminal.style.transition =
            "opacity 0.8s ease";

        terminal.style.opacity = "1";

    }, 500);

}


/* =========================================
   3. ELEMENTOS DE CÓDIGO
   Movimento sutil
========================================= */

const decorations =
    document.querySelectorAll(".code-decoration");

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    decorations.forEach((element, index) => {

        const intensity =
            (index + 1) * 4;

        element.style.transform =
            `translate(
                ${x * intensity}px,
                ${y * intensity}px
            )`;

    });

});


/* =========================================
   4. REVEAL AO ENTRAR NA PÁGINA
========================================= */

const heroElements = [
    document.querySelector(".eyebrow"),
    document.querySelector(".hero-title"),
    document.querySelector(".hero-info"),
    document.querySelector(".hero-actions"),
    document.querySelector(".stack")
];


heroElements.forEach((element, index) => {

    if (!element) return;

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition = `
        opacity 0.8s ease,
        transform 0.8s ease
    `;

    setTimeout(() => {

        element.style.opacity = "1";

        element.style.transform =
            "translateY(0)";

    }, 200 + (index * 150));

});


/* =========================================
   5. PROJETOS
   Reveal conforme aparecem na tela
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


const projectObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-project"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


projectCards.forEach((card) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(35px)";

    card.style.transition = `
        opacity 0.7s ease,
        transform 0.7s ease
    `;

    projectObserver.observe(card);

});


/* =========================================
   6. CLASSE DOS PROJETOS VISÍVEIS
========================================= */

const projectStyle =
    document.createElement("style");

projectStyle.innerHTML = `

    .project-card.show-project {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(projectStyle);


/* =========================================
   7. SCROLL SUAVE
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   8. CURSOR NO TERMINAL
========================================= */

const cursor =
    document.querySelector(".terminal-cursor");

if (cursor) {

    setInterval(() => {

        cursor.style.opacity =
            cursor.style.opacity === "0"
                ? "1"
                : "0";

    }, 500);

}


/* =========================================
   9. ANO AUTOMÁTICO DO FOOTER
========================================= */

const footer =
    document.querySelector(".footer");

if (footer) {

    const spans =
        footer.querySelectorAll("span");

    if (spans.length > 0) {

        spans[0].textContent =
            `© ${new Date().getFullYear()} Guilhermy`;

    }

}
/* =========================================
   10. RECADOS / COMENTÁRIOS
   Formulário + lista salva em localStorage
========================================= */

const STORAGE_KEY = "portfolio_comments";

const commentForm =
    document.getElementById("commentForm");

const commentList =
    document.getElementById("commentList");


function escapeHtml(str) {

    return String(str).replace(
        /[&<>"']/g,
        (match) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        }[match])
    );

}


function loadComments() {

    try {

        return (
            JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
        );

    } catch (err) {

        return [];

    }

}


function saveComments(comments) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(comments)
        );

    } catch (err) {

        // localStorage indisponível — ignora

    }

}


function formatTime(dateString) {

    const date = new Date(dateString);

    if (isNaN(date)) return "";

    const day = date.toLocaleDateString("pt-BR");

    const hour = date.toLocaleTimeString(
        "pt-BR",
        { hour: "2-digit", minute: "2-digit" }
    );

    return `${day} · ${hour}`;

}


function timeAgo(dateString) {

    const date = new Date(dateString);

    if (isNaN(date)) return "";

    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) return "agora";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `há ${minutes} min`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `há ${hours} h`;

    const days = Math.floor(hours / 24);

    if (days < 7) return `há ${days} dia${days > 1 ? "s" : ""}`;

    return formatTime(dateString);

}


/* Paleta de cor para os avatares */
const AVATAR_COLORS = [
    ["#a855f7", "#7c3aed"],
    ["#4ade80", "#16a34a"],
    ["#facc15", "#eab308"],
    ["#60a5fa", "#2563eb"],
    ["#f472b6", "#db2777"],
    ["#fb923c", "#ea580c"]
];


function avatarColor(name) {

    let hash = 0;

    const str = String(name || "?");

    for (let i = 0; i < str.length; i++) {

        hash = (hash * 31 + str.charCodeAt(i)) >>> 0;

    }

    return AVATAR_COLORS[hash % AVATAR_COLORS.length];

}


function avatarStyle(name) {

    const colors = avatarColor(name);

    return (
        "background: linear-gradient(135deg, " +
            colors[0] + ", " + colors[1] +
        ");"
    );

}


function normalizeComment(comment) {

    return {
        name: comment.name || "?",
        message: comment.message || "",
        date: comment.date || new Date().toISOString(),
        likes: Number(comment.likes) || 0,
        liked: Boolean(comment.liked),
        replies: Array.isArray(comment.replies)
            ? comment.replies
            : []
    };

}


function renderComments(comments) {

    if (!commentList) return;

    commentList.innerHTML = "";

    if (comments.length === 0) {

        commentList.innerHTML =
            `<p class="comment-empty">` +
            `// nenhum recado ainda... sê o primeiro! 😎` +
            `</p>`;

        return;

    }


    const ordered = comments.slice().reverse();

    ordered.forEach((comment, display) => {

        const realIndex = comments.length - 1 - display;

        const current = normalizeComment(comment);

        const item = document.createElement("div");

        item.className = "comment-item";

        item.dataset.index = realIndex;

        const initial = escapeHtml(
            (current.name || "?")
                .trim()
                .charAt(0)
                .toUpperCase() || "?"
        );

        let repliesHtml = "";

        if (current.replies.length > 0) {

            repliesHtml = current.replies.map((reply) => {

                const replyData = normalizeComment(reply);

                const replyInitial = escapeHtml(
                    (replyData.name || "?")
                        .trim()
                        .charAt(0)
                        .toUpperCase() || "?"
                );

                return `
                    <div class="comment-reply">
                        <span class="reply-avatar" style="${avatarStyle(replyData.name)}">
                            ${replyInitial}
                        </span>
                        <span class="reply-text">
                            <b>${escapeHtml(replyData.name)}</b>
                            <span class="reply-time">${timeAgo(replyData.date)}</span>
                            <span class="reply-msg">${escapeHtml(replyData.message)}</span>
                        </span>
                    </div>`;

            }).join("");

        }


        item.innerHTML = `

            <span class="comment-avatar" style="${avatarStyle(current.name)}">
                ${initial}
            </span>

            <div class="comment-body">

                <div class="comment-meta">

                    <span class="comment-name">
                        ${escapeHtml(current.name)}
                    </span>

                    <span class="comment-time">
                        ${timeAgo(current.date)}
                    </span>

                </div>

                <p class="comment-msg">
                    ${escapeHtml(current.message)}
                </p>

                <div class="comment-actions">

                    <button
                        type="button"
                        class="comment-like ${current.liked ? "liked" : ""}"
                        data-index="${realIndex}"
                    >
                        <span class="like-icon">♥</span>
                        <span class="like-count">${Math.max(0, current.likes)}</span>
                    </button>

                    <button
                        type="button"
                        class="comment-reply-btn"
                        data-index="${realIndex}"
                    >
                        💬 Responder
                    </button>

                </div>

                <div class="comment-replies">
                    ${repliesHtml}
                </div>

            </div>

        `;

        commentList.appendChild(item);

    });

}


/* --- Ações: curtir e responder --- */

function handleCommentLike(index, button) {

    const comments = loadComments();

    const comment = comments[index];

    if (!comment) return;

    const wasLiked = Boolean(comment.liked);

    comment.likes = Math.max(
        0,
        (Number(comment.likes) || 0) + (wasLiked ? -1 : 1)
    );

    comment.liked = !wasLiked;

    saveComments(comments);

    button.classList.toggle("liked", !wasLiked);

    const count = button.querySelector(".like-count");

    if (count) {

        count.textContent =
            String(Math.max(0, comment.likes));

    }

    button.classList.remove("bump");

    void button.offsetWidth;

    button.classList.add("bump");

}


function toggleReplyForm(index, button) {

    const item = button.closest(".comment-item");

    const existing = item.querySelector(".reply-form");

    if (existing) {

        existing.remove();

        return;

    }

    const form = document.createElement("form");

    form.className = "reply-form";

    form.dataset.index = index;

    form.innerHTML = `

        <input
            class="reply-name"
            placeholder="seu nick..."
            maxlength="40"
            required
        />

        <textarea
            class="reply-message"
            rows="2"
            placeholder="sua resposta aí..."
            maxlength="300"
            required
        ></textarea>

        <button type="submit" class="reply-submit">Responder ↩</button>

    `;

    item.appendChild(form);

    const firstInput = form.querySelector(".reply-name");

    if (firstInput) firstInput.focus();

}


/* Delegação de cliques na lista de recados */
commentList.addEventListener("click", (event) => {

    const likeButton = event.target.closest(".comment-like");

    if (likeButton) {

        handleCommentLike(Number(likeButton.dataset.index), likeButton);

        return;

    }

    const replyButton = event.target.closest(".comment-reply-btn");

    if (replyButton) {

        toggleReplyForm(Number(replyButton.dataset.index), replyButton);

    }

});


/* Enviar resposta (thread) */
commentList.addEventListener("submit", (event) => {

    const form = event.target.closest(".reply-form");

    if (!form) return;

    event.preventDefault();

    const index = Number(form.dataset.index);

    const name = form.querySelector(".reply-name").value.trim();

    const message = form.querySelector(".reply-message").value.trim();

    if (!name || !message) return;

    const comments = loadComments();

    const comment = comments[index];

    if (!comment) return;

    comment.replies = Array.isArray(comment.replies)
        ? comment.replies
        : [];

    comment.replies.push({
        name: name,
        message: message,
        date: new Date().toISOString()
    });

    saveComments(comments);

    renderComments(comments);

});


if (commentForm) {

    commentForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nameInput =
            document.getElementById("commentName");

        const messageInput =
            document.getElementById("commentMessage");

        const name = nameInput.value.trim();

        const message = messageInput.value.trim();

        if (!name || !message) return;

        const comments = loadComments();

        comments.push({
            name: name,
            message: message,
            date: new Date().toISOString()
        });

        saveComments(comments);

        renderComments(comments);

        commentForm.reset();

    });

    // Renderiza os recados salvos ao abrir
    renderComments(loadComments());

}


/* =========================================
   11. COMPARTILHAR
   Web Share API (celular) + copiar link
========================================= */

const shareButton =
    document.getElementById("shareBtn");

if (shareButton) {

    shareButton.addEventListener("click", async () => {

        const shareData = {
            title: "Guilhermy — Desenvolvedor Web",
            text: "Conhece o portfólio do Guilhermy! 💜",
            url: window.location.href
        };

        // Celular / navegadores com Web Share API
        if (navigator.share) {

            try {

                await navigator.share(shareData);

            } catch (err) {

                // Usuário cancelou — sem ação

            }

            return;

        }


        // Desktop sem Web Share → copia o link
        const oldText = shareButton.textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                shareButton.textContent = "Link copiado! ✅";

            } catch (err) {

                copyFallback();

            }

        } else {

            copyFallback();

        }

        setTimeout(() => {

            shareButton.textContent = oldText;

        }, 2200);


        function copyFallback() {

            const temp = document.createElement("textarea");

            temp.value = window.location.href;

            document.body.appendChild(temp);

            temp.select();

            try {

                document.execCommand("copy");

                shareButton.textContent = "Link copiado! ✅";

            } catch (err) {

                window.prompt("Copia o link aí 👇", window.location.href);

            }

            document.body.removeChild(temp);

        }

    });

}


/* =========================================
   12. MENU MOBILE (hambúrguer)
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navigation =
    document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

        document.body.style.overflow =
            isOpen ? "hidden" : "";

    });

    // Fecha o menu ao clicar num link
    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Abrir menu");

            document.body.style.overflow = "";

        });

    });

}

/* =========================================
   13. JOGO — DESCUBRA QUEM EU SOU
========================================= */

const GAME_QUESTIONS = [
    {
        question: "Quem você acha que eu sou?",
        options: [
            "Um desenvolvedor júnior 💻",
            "Um astronauta em treino 🚀",
            "O próximo Messi ⚽"
        ],
        answer: 0,
        reveal: "Desenvolvedor Júnior",
        wrong: [
            "hmm... quase! tenta de novo 🤔",
            "boa tentativa, mas não é isso 😄",
            "só mais uma vez, tu chega lá! 💪"
        ]
    },
    {
        question: "E fora do código, no que mais eu mexo?",
        options: [
            "Corto e edito vídeos 🎬",
            "Canto no chuveiro 🎤",
            "Faço bolo de morango 🍰"
        ],
        answer: 0,
        reveal: "Editor de Vídeos",
        wrong: [
            "não, tá frio... 🥶",
            "quase que isso, mas não 😄",
            "tenta a opção que brilha mais 👀"
        ]
    },
    {
        question: "E com pessoas e equipes, eu...?",
        options: [
            "Me comunico e lidero 🗣️",
            "Fico escondido atrás do PC 🙈",
            "Só falo em binário 🤖"
        ],
        answer: 0,
        reveal: "Comunicação e Liderança",
        wrong: [
            "longe disso! eu adoro falar 🗣️",
            "haha, sou bem comunicativo 😄",
            "tipo mais gente boa, sabe? 💬"
        ]
    },
    {
        question: "Qual é o meu combo de superpoderes?",
        options: [
            "HTML, CSS e JavaScript",
            "Magia e poção de força 🧙",
            "Um só compromisso: dormir 😴"
        ],
        answer: 0,
        reveal: "HTML + CSS + JavaScript",
        wrong: [
            "esse é o bronze, pera aí 😅",
            "bem que eu queria! 🧙",
            "criatividade também conta, tenta de novo 💡"
        ]
    }
];

let gameIndex = 0;

const gameBox = document.getElementById("gameBox");
const gameResult = document.getElementById("gameResult");
const gameCount = document.getElementById("gameCount");
const gameBar = document.getElementById("gameBar");
const gameQuestion = document.getElementById("gameQuestion");
const gameHint = document.getElementById("gameHint");
const gameOptionsEl = document.getElementById("gameOptions");
const gameFeedback = document.getElementById("gameFeedback");
const gameTraitsList = document.getElementById("gameTraits");
const gameRestart = document.getElementById("gameRestart");


function renderGameQuestion() {

    if (gameIndex >= GAME_QUESTIONS.length) {

        showGameResult();

        return;

    }

    const question = GAME_QUESTIONS[gameIndex];

    gameCount.textContent =
        (gameIndex + 1) + "/" + GAME_QUESTIONS.length;

    gameBar.style.width =
        (gameIndex / GAME_QUESTIONS.length * 100) + "%";

    gameQuestion.textContent = question.question;

    gameHint.textContent = "toca na resposta certa 👇";

    gameFeedback.textContent = "";

    gameFeedback.className = "game-feedback";

    gameOptionsEl.innerHTML = "";

    question.options.forEach((label, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "game-option";

        button.textContent = label;

        button.addEventListener("click", () => {
            handleGameAnswer(index, question);
        });

        gameOptionsEl.appendChild(button);

    });

}


function handleGameAnswer(index, question) {

    const options =
        gameOptionsEl.querySelectorAll(".game-option");

    if (index === question.answer) {

        // Acertou!
        options.forEach((option) => {
            option.disabled = true;
        });

        gameOptionsEl
            .querySelectorAll(".game-option")
            [index].classList.add("correct");

        gameFeedback.textContent =
            "+1 desbloqueado: " + question.reveal + " 💡";

        gameFeedback.className = "game-feedback ok";

        setTimeout(() => {

            gameIndex += 1;

            renderGameQuestion();

        }, 950);

    } else {

        // Errou — dá uma moral
        const message =
            question.wrong[index % question.wrong.length];

        gameFeedback.textContent = message;

        gameFeedback.className = "game-feedback bad";

        options[index].classList.add("wrong");

        options[index].disabled = true;

    }

}


function showGameResult() {

    gameBox.hidden = true;

    gameResult.hidden = false;

    gameBar.style.width = "100%";

    const traits = [
        "Desenvolvedor Júnior",
        "Editor de Vídeos",
        "Comunicação & Liderança",
        "Trabalho em equipe & criatividade",
        "HTML + CSS + JavaScript"
    ];

    gameTraitsList.innerHTML = "";

    traits.forEach((trait) => {

        const item = document.createElement("li");

        item.textContent = trait;

        gameTraitsList.appendChild(item);

    });

}


if (gameRestart) {

    gameRestart.addEventListener("click", () => {

        gameIndex = 0;

        gameResult.hidden = true;

        gameBox.hidden = false;

        renderGameQuestion();

    });

}


// Inicia o jogo (se existir na página)
if (gameBox && gameResult) {

    renderGameQuestion();

}
