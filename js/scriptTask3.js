const photos = [
    "../photos/32.jpg",
    "../photos/33.png",
    "../photos/Dune Night.jpg",
    "../photos/Dune.jpg",
    "../photos/Morning Breeze.jpg",
    "../photos/Surf Dark.png",
    "../photos/Surf.png",
    "../photos/Twilight Breeze.jpg"
];

const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
totalSlidesSpan.textContent = photos.length;

const wrapper = document.getElementById('swiperWrapper');

photos.forEach((photo, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const img = document.createElement('img');
    img.src = photo;
    img.alt = '';
    img.draggable = false;

    slide.appendChild(img);
    wrapper.appendChild(slide);
});

const swiper = new Swiper('.mySwiper', {
    // Базовые параметры
    loop: true,
    speed: 700,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    // Навигация
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Дополнительные параметры
    grabCursor: false,
    keyboard: {
        enabled: true,
    },

    // Событие при смене слайда
    on: {
        slideChange: function () {
            const realIndex = this.realIndex + 1;
            currentSlideSpan.textContent = realIndex;
        },
    },
});

// Начальный счётчик
currentSlideSpan.textContent = 1;

console.log(`✅ Слайдер Swiper загружен! Всего фото: ${photos.length}`);
console.log('📸 Используй кнопки или стрелки клавиатуры ← →');
console.log('🔄 Автопрокрутка каждые 4 секунды');

document.addEventListener('DOMContentLoaded', function () {
    const elements = [
        document.querySelector('.card-title'),
        document.querySelector('.slider-wrapper'),
        document.querySelector('.slider-counter'),
        document.querySelector('.back-btn'),
    ];

    elements.forEach((el, i) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'all 0.7s ease';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + i * 150);
        }
    });
});