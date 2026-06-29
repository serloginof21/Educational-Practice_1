document.addEventListener('DOMContentLoaded', function() {
    
    // Эффект при наведении на карточки
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
    
    // Функция для перехода на страницу задания
    function navigateToTask(taskNumber) {
        window.location.href = `pages/task${taskNumber}.html`;
    }
    
    // Обход всех кнопок с атрибутом data-task
    const taskButtons = document.querySelectorAll('[data-task]');
    
    // Обработчик для каждой кнопки
    taskButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const taskNumber = this.getAttribute('data-task');

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            navigateToTask(taskNumber);
        });
    });
});