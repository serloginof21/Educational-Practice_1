// Массив с набором фотографий
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

let currentIndex = 0;
const totalPhotos = photos.length;

const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderTitle = document.getElementById('sliderTitle');

function updateSlider() {
    sliderImage.src = photos[currentIndex];
    
    const fileName = photos[currentIndex].split('/').pop();
    sliderImage.alt = `Слайд ${currentIndex + 1}: ${fileName}`;
    
    sliderTitle.textContent = `Изображение ${currentIndex + 1} из ${totalPhotos}`;
    
    sliderImage.classList.add('fade');
    setTimeout(() => {
        sliderImage.classList.remove('fade');
    }, 100);
}

function prevImage() {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        currentIndex = totalPhotos - 1;
    }
    updateSlider();
}

function nextImage() {
    currentIndex = currentIndex + 1;
    if (currentIndex >= totalPhotos) {
        currentIndex = 0;
    }
    updateSlider();
}

updateSlider();

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    }
});

console.log(`Слайдер загружен! Всего фото: ${totalPhotos}`);

// Анимация для переключения фото
const originalUpdateSlider = updateSlider;

updateSlider = function() {
    originalUpdateSlider();
    const imageContainer = document.querySelector('.slider-image-container');
    if (imageContainer) {
        imageContainer.style.transition = 'all 0.3s ease';
        imageContainer.style.transform = 'scale(0.95)';
        imageContainer.style.opacity = '0.7';
        setTimeout(() => {
            imageContainer.style.transform = 'scale(1)';
            imageContainer.style.opacity = '1';
        }, 150);
    }
};
