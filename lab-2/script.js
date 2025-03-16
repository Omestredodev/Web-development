// Seleciona o guarda-chuva e também a área da chuva
const guardaChuva = document.querySelector(".guarda-chuva");
const chuva = document.querySelector(".chuva");

// Variáveis para armazenar as gotas
const gotas = [];

// Função para criar uma nova gota de chuva
function criarGota() {
  let gota = document.createElement("div");
  gota.classList.add("gota");

  let tamanho = Math.random() * 2 + 1;
  let duracao = Math.random() * 2 + 0.5;
  let atraso = Math.random() * 5;

  gota.style.left = `${Math.random() * 100}vw`;
  gota.style.animationDuration = `${duracao}s`;
  gota.style.animationDelay = `-${atraso}s`;
  gota.style.width = `${tamanho}px`;
  gota.style.height = `${tamanho * 10}px`;

  chuva.appendChild(gota);
  gotas.push(gota);
}

// Função para verificar se há colisão entre uma gota e o guarda-chuva
function verificarColisao(gota) {
  const guardaChuvaRect = guardaChuva.getBoundingClientRect(); // Pega a posição do guarda-chuva
  const gotaRect = gota.getBoundingClientRect(); // Pega a posição da gota

  // Verifica se a gota está dentro da área do guarda-chuva
  return (
    gotaRect.bottom > guardaChuvaRect.top && // A gota não está acima do guarda-chuva
    gotaRect.top < guardaChuvaRect.bottom && // A gota não está abaixo do guarda-chuva
    gotaRect.right > guardaChuvaRect.left && // A gota não está à esquerda do guarda-chuva
    gotaRect.left < guardaChuvaRect.right // A gota não está à direita do guarda-chuva
  );
}

// Função para parar a animação das gotas que colidem com o guarda-chuva
function pararGotasColidindo() {
  for (let i = 0; i < gotas.length; i++) {
    const gota = gotas[i];

    if (verificarColisao(gota)) {
      // Quando a gota colide com o guarda-chuva, ela some
      gota.style.animation = "none"; // Remove a animação da gota
      gota.style.opacity = "0"; // Torna a gota invisível
      gotas.splice(i, 1); // Remove a gota do array
      chuva.removeChild(gota); // Remove a gota da tela

      // Cria uma nova gota para substituir a que desapareceu
      criarGota();
    }
  }
}

// Função para atualizar a posição das gotas (verifica a colisão)
function atualizar() {
  pararGotasColidindo(); // Verifica as colisões e para as gotas que tocam o guarda-chuva
}

// Chama a função de atualização a cada quadro
setInterval(atualizar, 16); // Chama a função a cada 16ms (aproximadamente 60 FPS)

// Gera as gotas inicialmente
for (let i = 0; i < 100; i++) {
  criarGota();
}

// Variáveis para o movimento do guarda-chuva
let isDragging = false;
let offsetX, offsetY;

// Evento de clique com o botão direito do mouse para parar a animação das gotas
guardaChuva.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    // botão direito do mouse
    pararGotas();
  }

  // Detectar quando o botão direito do mouse é pressionado para mover o guarda-chuva
  isDragging = true;
  offsetX = e.clientX - guardaChuva.getBoundingClientRect().left;
  offsetY = e.clientY - guardaChuva.getBoundingClientRect().top;

  // Desativa o menu de contexto
  e.preventDefault();
});

// Evento para mover o guarda-chuva enquanto o botão direito estiver pressionado
window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    guardaChuva.style.left = `${x}px`;
    guardaChuva.style.top = `${y}px`;
  }
});

// Evento para finalizar o arraste quando o botão direito for solto
window.addEventListener("mouseup", () => {
  isDragging = false;
});

// Função para parar a animação das gotas
function pararGotas() {
  gotas.forEach((gota) => {
    gota.style.animation = "none"; // Remove a animação das gotas
    gota.style.opacity = "0"; // Torna as gotas invisíveis
  });
}

// Para desabilitar o menu de contexto do botão direito
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
