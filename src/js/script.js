document.addEventListener('DOMContentLoaded', function () {
    const carrossel = document.querySelector('.carrossel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carrossel-indicators');

    const totalCards = cards.length;
    let currentIndex = 0;
    let visibleCards = 5; // Número de cards visíveis (central + 2 de cada lado)

    // Criar indicadores
    function createIndicators() {
        for (let i = 0; i < totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carrossel-indicator');
            if (i === currentIndex) indicator.classList.add('active');

            indicator.addEventListener('click', () => {
                currentIndex = i;
                updatecarrossel();
            });

            indicatorsContainer.appendChild(indicator);
        }
    }

    // Posicionar os cards no carrossel
    function positionCards() {
        const centerIndex = Math.floor(visibleCards / 2);

        cards.forEach((card, index) => {
            // Calcular a posição relativa ao card central
            let position = (index - currentIndex + centerIndex) % totalCards;
            if (position < 0) position += totalCards;

            // Definir estilos baseados na posição
            if (position === centerIndex) {
                // Card central
                card.style.transform = 'translateX(0) scale(1)';
                card.style.zIndex = '10';
                card.style.opacity = '1';
            } else if (position === centerIndex - 1 || position === centerIndex + 1) {
                // Cards adjacentes
                const direction = position === centerIndex - 1 ? -1 : 1;
                card.style.transform = `translateX(${direction * 120}px) scale(0.9)`;
                card.style.zIndex = '5';
                card.style.opacity = '0.9';
            } else if (position === centerIndex - 2 || position === centerIndex + 2) {
                // Cards mais distantes
                const direction = position === centerIndex - 2 ? -1 : 1;
                card.style.transform = `translateX(${direction * 220}px) scale(0.8)`;
                card.style.zIndex = '1';
                card.style.opacity = '0.7';
            } else {
                // Cards não visíveis
                card.style.transform = 'translateX(0) scale(0)';
                card.style.zIndex = '0';
                card.style.opacity = '0';
            }
        });
    }

    // Atualizar indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carrossel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Atualizar o carrossel
    function updatecarrossel() {
        positionCards();
        updateIndicators();
    }

    // Navegação
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updatecarrossel();
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % totalCards;
        updatecarrossel();
    }

    // Event listeners
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    // Navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });

    // Inicialização
    createIndicators();
    updatecarrossel();
});