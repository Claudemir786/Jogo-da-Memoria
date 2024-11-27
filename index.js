const botaoComecar = document.getElementById("comecar");
const inicio = document.getElementById("inicio");
const principal = document.getElementById("principal");

botaoComecar.addEventListener("click", () => {
    inicio.style.display = "none";
    principal.style.display = "block";
});

let tentativas = 0;

function atualizaplacar() {
    const placar = document.getElementById("tentativas");
    placar.textContent = tentativas;
}

let cartas = ["bi bi-android", "bi bi-apple", "bi bi-xbox", "bi bi-playstation", "bi bi-nintendo-switch", "bi bi-pc",
    "bi bi-android", "bi bi-apple", "bi bi-xbox", "bi bi-playstation", "bi bi-nintendo-switch", "bi bi-pc"
];

cartas.sort(() => 0.5 - Math.random());

function preencherespacos(cartas) {
    for (let i = 0; i < cartas.length; i++) {
        const cartahtml = document.getElementById(`q-${i + 1}`);
        cartahtml.setAttribute("data-card", cartas[i]);
        cartahtml.innerHTML = `<i class="bi bi-question-circle"></i>`;
        cartahtml.classList.remove("revealed", "matched");
    }
}

let primeiracarta = null;
let segundaacarta = null;

function eventocartas() {
    const todascartas = document.querySelectorAll(".card");

    for (let i = 0; i < todascartas.length; i++) {
        const carta = todascartas[i];

        carta.addEventListener("click", () => {
            if (carta.classList.contains("revealed") || carta.classList.contains("matched")) {
                return;
            }

            const iconClass = carta.getAttribute("data-card");
            carta.innerHTML = `<i class="bi ${iconClass}"></i>`;
            carta.classList.add("revealed");

            if (!primeiracarta) {
                primeiracarta = carta;
            } else if (!segundaacarta && carta !== primeiracarta) {
                segundaacarta = carta;
                checkMatch(primeiracarta, segundaacarta);
            }
        });
    }
}

function checkMatch(q1, q2) {
    const valor1 = q1.getAttribute("data-card");
    const valor2 = q2.getAttribute("data-card");
    tentativas++;
    atualizaplacar();

    if (valor1 === valor2) {
        q1.classList.add("matched");
        q2.classList.add("matched");
        resetSelections();
    } else {
        setTimeout(() => {
            q1.innerHTML = `<i class="bi bi-question-circle"></i>`;
            q2.innerHTML = `<i class="bi bi-question-circle"></i>`;
            q1.classList.remove("revealed");
            q2.classList.remove("revealed");
            resetSelections();
        }, 1000);
    }
}

function resetSelections() {
    primeiracarta = null;
    segundaacarta = null;
}

preencherespacos(cartas);
eventocartas();

function reiniciarjogo() {
    tentativas = 0;
    atualizaplacar();
    cartas.sort(() => 0.5 - Math.random());
    preencherespacos(cartas);

    const todascartas = document.querySelectorAll(".card");
    for (let i = 0; i < todascartas.length; i++) {
        const carta = todascartas[i];
        const novaCarta = carta.cloneNode(true);
        carta.replaceWith(novaCarta);
    }

    primeiracarta = null;
    segundaacarta = null;
    eventocartas();
}

const reiniciar = document.getElementById("reiniciar");
reiniciar.addEventListener("click", reiniciarjogo);

atualizaplacar();
