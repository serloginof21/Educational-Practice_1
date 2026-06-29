// ТВОЙ МАССИВ С ФОТО
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

// Элементы для счётчика
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
totalSlidesSpan.textContent = photos.length;

// Контейнер для слайдов
const wrapper = document.getElementById('swiperWrapper');

// СОЗДАЁМ СЛАЙДЫ ИЗ ТВОИХ ФОТО
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

// ИНИЦИАЛИЗАЦИЯ SWIPER
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

    // Пагинация (точки)
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

    // Событие при смене слайда — обновляем счётчик
    on: {
        slideChange: function () {
            const realIndex = this.realIndex + 1;
            currentSlideSpan.textContent = realIndex;
        },
    },
});

// Начальный счётчик
currentSlideSpan.textContent = 1;

// Лог в консоль
console.log(`✅ Слайдер Swiper загружен! Всего фото: ${photos.length}`);
console.log('📸 Используй кнопки или стрелки клавиатуры ← →');
console.log('🔄 Автопрокрутка каждые 4 секунды');

// АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
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