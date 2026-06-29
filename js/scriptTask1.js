// Основная функция проверки дня рождения
function checkBirthday() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    
    if (validateDate(day, month, year)) {
        showSuccessMessage(day, month, year);
    }
}

// Главная функция проверки даты
function validateDate(day, month, year) {
    if (!isFieldsFilled(day, month, year)) return false;
    
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (!isYearValid(yearNum)) return false;
    if (!isMonthValid(monthNum)) return false;
    if (!isDayValid(dayNum, monthNum, yearNum)) return false;
    if (!isDateNotInFuture(dayNum, monthNum, yearNum)) return false;
    
    return true;
}

// Проверка заполнения полей
function isFieldsFilled(day, month, year) {
    if (!day || !month || !year) {
        alert('⚠️ Ошибка! Пожалуйста, выберите день, месяц и год рождения.');
        return false;
    }
    return true;
}

// Проверка корректности года
function isYearValid(yearNum) {
    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
        alert(`⚠️ Ошибка! Год должен быть от 1900 до ${currentYear}. Вы выбрали ${yearNum} год.`);
        return false;
    }
    return true;
}

// Проверка корректности месяца
function isMonthValid(monthNum) {
    if (monthNum < 1 || monthNum > 12) {
        alert(`⚠️ Ошибка! Месяц должен быть от 1 до 12. Вы выбрали ${monthNum}.`);
        return false;
    }
    return true;
}

// Проверка корректности дня
function isDayValid(dayNum, monthNum, yearNum) {
    const maxDays = getDaysInMonth(monthNum, yearNum);
    
    if (dayNum < 1 || dayNum > maxDays) {
        const monthName = getMonthName(monthNum);
        const leapInfo = (monthNum === 2) ? ` (${isLeapYear(yearNum) ? 'високосный год' : 'невисокосный год'})` : '';
        
        alert(`❌ Ошибка! В ${monthName} ${maxDays} дней${leapInfo}. Вы выбрали ${dayNum} число.\n\nПожалуйста, выберите день от 1 до ${maxDays}.`);
        return false;
    }
    return true;
}

// Проверка того, что дата не в будущем
function isDateNotInFuture(dayNum, monthNum, yearNum) {
    const today = new Date();
    const selectedDate = new Date(yearNum, monthNum - 1, dayNum);
    
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
        const formattedToday = formatDate(today);
        const formattedSelected = formatDate(selectedDate);
        
        alert(`❌ Ошибка! Вы выбрали будущую дату: ${formattedSelected}\n\n📅 Сегодня: ${formattedToday}\n\nДата рождения не может быть в будущем!`);
        return false;
    }
    return true;
}

// Определение дня недели
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day);
    const daysOfWeek = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
        'Четверг', 'Пятница', 'Суббота'
    ];
    return daysOfWeek[date.getDay()];
}

// Определение високосного года
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Получение максимального количества дней в месяце
function getDaysInMonth(month, year) {
    const days31 = [1, 3, 5, 7, 8, 10, 12];
    const days30 = [4, 6, 9, 11];
    
    if (days31.includes(month)) {
        return 31;
    } else if (days30.includes(month)) {
        return 30;
    } else if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return 0;
    }
}

// Расчет возраста пользователя
function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Форматирование даты для вывода
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Получение названия месяца (Именительный падеж)
function getMonthName(monthNumber) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[monthNumber - 1];
}

// Получение названия месяца (Родительный падеж)
function getMonthNameGenitive(monthNumber) {
    const monthsGenitive = [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
        'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ];
    return monthsGenitive[monthNumber - 1];
}

// Правильное склонение слова "год"
function getAgeWord(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет';
    }
    
    switch (lastDigit) {
        case 1: return 'год';
        case 2:
        case 3:
        case 4: return 'года';
        default: return 'лет';
    }
}

// Функция вывода даты звёздочками в консоль
function printBirthdayToConsole(day, month, year) {
    console.log('вывод даты рождения в консоль');
    console.log(''); // Пустая строка для отступа
    
    const dayStr = String(parseInt(day)).padStart(2, '0');
    const monthStr = String(parseInt(month)).padStart(2, '0');
    const yearStr = String(year);
    
    const patterns = {
        '0': ['***','* *','* *','* *','***'],
        '1': ['  *','  *','  *','  *','  *'],
        '2': ['***','  *','***','*  ','***'],
        '3': ['***','  *','***','  *','***'],
        '4': ['* *','* *','***','  *','  *'],
        '5': ['***','*  ','***','  *','***'],
        '6': ['***','*  ','***','* *','***'],
        '7': ['***','  *','  *','  *','  *'],
        '8': ['***','* *','***','* *','***'],
        '9': ['***','* *','***','  *','***']
    };
    
    console.log('ДЕНЬ:');
    console.log('-----');
    const dayDigits = dayStr.split('');
    for (let row = 0; row < 5; row++) {
        let line = '';
        for (let digit of dayDigits) {
            line += patterns[digit][row] + ' ';
        }
        console.log(line);
    }
    
    console.log('');
    console.log('МЕСЯЦ:');
    console.log('-------');
    const monthDigits = monthStr.split('');
    for (let row = 0; row < 5; row++) {
        let line = '';
        for (let digit of monthDigits) {
            line += patterns[digit][row] + ' ';
        }
        console.log(line);
    }
    
    console.log('');
    console.log('ГОД:');
    console.log('-----');
    const yearDigits = yearStr.split('');
    for (let row = 0; row < 5; row++) {
        let line = '';
        for (let digit of yearDigits) {
            line += patterns[digit][row] + ' ';
        }
        console.log(line);
    }
    
    console.log(''); // Пустая строка в конце
    console.log('========================');
}

// Показ сообщения об успехе
function showSuccessMessage(day, month, year) {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    const monthName = getMonthNameGenitive(monthNum);
    const dayOfWeek = getDayOfWeek(dayNum, monthNum, yearNum);
    const isLeap = isLeapYear(yearNum);
    const age = calculateAge(dayNum, monthNum, yearNum);
    
    const leapText = isLeap ? '✅ Високосный' : '❌ Не високосный';
    
    alert(`✅ Дата рождения корректна!

Ваша дата рождения: ${dayNum} ${monthName} ${yearNum} года

День недели: ${dayOfWeek}
Год: ${leapText}
Ваш возраст: ${age} ${getAgeWord(age)}`);

    // Отрисовка даты рождения в консоли
    printBirthdayToConsole(day, month, year);
}

// Заполнение выпадающих списков
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, заполняем списки...');
    
    fillDaySelect();
    fillYearSelect();
    addCheckButtonListener();
});

// Заполнение списка дней
function fillDaySelect() {
    const daySelect = document.getElementById('day');
    if (daySelect) {
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Для проверки
        console.log('Дни заполнены');
    }
}

// Заполнение списка годов
function fillYearSelect() {
    const yearSelect = document.getElementById('year');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }

        // Для проверки
        console.log('Года заполнены');
    }
}

// Обработчик кнопки
function addCheckButtonListener() {
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkBirthday);

        // Для проверки
        console.log('Обработчик кнопки добавлен');
    }
}