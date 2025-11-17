document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgAudio');
    const continueBtn = document.getElementById('continueBtn');
    const finalBtn = document.getElementById('finalBtn');
    const openingMessage = document.querySelector('.opening-message');
    const mainContent = document.getElementById('mainContent');
    const closingMessage = document.getElementById('closingMessage');

    const playAudio = () => {
        audio.play().catch(error => {
            console.log('Autoplay prevented, will play on user interaction');
        });
    };

    playAudio();

    document.body.addEventListener('click', () => {
        if (audio.paused) {
            playAudio();
        }
    }, { once: true });

    continueBtn.addEventListener('click', () => {
        openingMessage.style.opacity = '0';
        openingMessage.style.transform = 'translateY(-30px)';
        openingMessage.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            openingMessage.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';

            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease';
                mainContent.style.opacity = '1';
            }, 50);
        }, 800);
    });

    finalBtn.addEventListener('click', () => {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(-30px)';
        mainContent.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            mainContent.classList.add('hidden');
            closingMessage.classList.remove('hidden');
            closingMessage.style.opacity = '0';

            setTimeout(() => {
                closingMessage.style.transition = 'opacity 1s ease';
                closingMessage.style.opacity = '1';
            }, 50);
        }, 800);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.letter-card');
    animatedElements.forEach(el => observer.observe(el));
});
