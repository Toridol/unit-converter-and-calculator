// ПЕРЕМЕННЫЕ ДЛЯ КОНВЕРТЕРА
let currentCategory = '';
let converterValue = '0';
let fromUnit = 'метры';
let toUnit = 'сантиметры';

// ДАННЫЕ ДЛЯ КОНВЕРТАЦИИ
const units = {
    'Длина': ['метры', 'сантиметры', 'километры', 'миллиметры', 'дюймы', 'футы'],
    'Вес': ['килограммы', 'граммы', 'миллиграммы', 'фунты', 'унции', 'тонны'],
    'Температура': ['Цельсий', 'Фаренгейт', 'Кельвин'],
    'Объем': ['литры', 'миллилитры', 'галлоны', 'пинты', 'чашки'],
    'Время': ['часы', 'минуты', 'секунды', 'дни', 'недели', 'месяцы']
};

// ПЕРЕМЕННЫЕ ДЛЯ КАЛЬКУЛЯТОРА
let calcExpression = '0';  // Вся строка: "657+3"

// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
function showScreen(screenId) {
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('converterScreen').style.display = 'none';
    document.getElementById('calculatorScreen').style.display = 'none';
    document.getElementById(screenId).style.display = 'block';
}

function goToHome() {
    showScreen('mainScreen');
    updateNav('home');
}

function openConverter(category) {
    currentCategory = category;
    fromUnit = units[category][0];
    toUnit = units[category][1];

    document.getElementById('converterTitle').textContent = `Конвертер ${category.toLowerCase()}`;
    document.getElementById('fromUnit').textContent = fromUnit;
    document.getElementById('toUnit').textContent = toUnit;

    converterValue = '0';
    document.getElementById('converterValue').textContent = '0';
    document.getElementById('converterResult').textContent = '0';

    showScreen('converterScreen');
    updateNav('converter');
}

function openCalculator() {
    calcExpression = '0';
    document.getElementById('calcDisplay').textContent = '0';

    showScreen('calculatorScreen');
    updateNav('calculator');
}

// НАВИГАЦИЯ
function updateNav(screen) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));

    if (screen === 'home') {
        items[0].classList.add('active');
    } else if (screen === 'calculator') {
        items[1].classList.add('active');
    }
}

// ВЫБОР ЕДИНИЦ
function changeUnit(type) {
    const modal = document.getElementById('unitModal');
    const unitList = document.getElementById('unitList');

    unitList.innerHTML = '';
    units[currentCategory].forEach(unit => {
        const option = document.createElement('div');
        option.className = 'unit-option';
        option.textContent = unit;
        option.onclick = () => {
            if (type === 'from') {
                fromUnit = unit;
                document.getElementById('fromUnit').textContent = unit;
            } else {
                toUnit = unit;
                document.getElementById('toUnit').textContent = unit;
            }
            modal.style.display = 'none';
            calculate();
        };
        unitList.appendChild(option);
    });

    modal.style.display = 'flex';
}

function closeUnitModal() {
    document.getElementById('unitModal').style.display = 'none';
}

function swapUnits() {
    const temp = fromUnit;
    fromUnit = toUnit;
    toUnit = temp;

    document.getElementById('fromUnit').textContent = fromUnit;
    document.getElementById('toUnit').textContent = toUnit;

    calculate();
}

// КОНВЕРТЕР: КЛАВИАТУРА
function addDigit(digit) {
    if (converterValue === '0') {
        converterValue = digit;
    } else {
        converterValue += digit;
    }
    document.getElementById('converterValue').textContent = converterValue;
    calculate();
}

function clearInput() {
    converterValue = '0';
    document.getElementById('converterValue').textContent = '0';
    document.getElementById('converterResult').textContent = '0';
}

function backspace() {
    if (converterValue.length > 1) {
        converterValue = converterValue.slice(0, -1);
    } else {
        converterValue = '0';
    }
    document.getElementById('converterValue').textContent = converterValue;
    calculate();
}

function addDecimal() {
    if (!converterValue.includes('.')) {
        converterValue += '.';
        document.getElementById('converterValue').textContent = converterValue;
        calculate();
    }
}

function toggleSign() {
    if (converterValue.startsWith('-')) {
        converterValue = converterValue.substring(1);
    } else {
        converterValue = '-' + converterValue;
    }
    document.getElementById('converterValue').textContent = converterValue;
    calculate();
}

// КОНВЕРТЕР: РАСЧЕТ
function calculate() {
    const value = parseFloat(converterValue) || 0;
    let result = 0;

    // Простые коэффициенты
    if (currentCategory === 'Длина') {
        if (fromUnit === 'метры' && toUnit === 'сантиметры') result = value * 100;
        else if (fromUnit === 'сантиметры' && toUnit === 'метры') result = value / 100;
        else if (fromUnit === 'метры' && toUnit === 'километры') result = value / 1000;
        else if (fromUnit === 'километры' && toUnit === 'метры') result = value * 1000;
        else if (fromUnit === 'метры' && toUnit === 'миллиметры') result = value * 1000;
        else if (fromUnit === 'миллиметры' && toUnit === 'метры') result = value / 1000;
        else result = value;
    }
    else if (currentCategory === 'Вес') {
        if (fromUnit === 'килограммы' && toUnit === 'граммы') result = value * 1000;
        else if (fromUnit === 'граммы' && toUnit === 'килограммы') result = value / 1000;
        else if (fromUnit === 'килограммы' && toUnit === 'фунты') result = value * 2.20462;
        else if (fromUnit === 'фунты' && toUnit === 'килограммы') result = value / 2.20462;
        else result = value;
    }
    else if (currentCategory === 'Температура') {
        if (fromUnit === 'Цельсий' && toUnit === 'Фаренгейт') result = (value * 9/5) + 32;
        else if (fromUnit === 'Фаренгейт' && toUnit === 'Цельсий') result = (value - 32) * 5/9;
        else if (fromUnit === 'Цельсий' && toUnit === 'Кельвин') result = value + 273.15;
        else if (fromUnit === 'Кельвин' && toUnit === 'Цельсий') result = value - 273.15;
        else result = value;
    }
    else if (currentCategory === 'Объем') {
        if (fromUnit === 'литры' && toUnit === 'миллилитры') result = value * 1000;
        else if (fromUnit === 'миллилитры' && toUnit === 'литры') result = value / 1000;
        else result = value;
    }
    else if (currentCategory === 'Время') {
        if (fromUnit === 'часы' && toUnit === 'минуты') result = value * 60;
        else if (fromUnit === 'минуты' && toUnit === 'часы') result = value / 60;
        else if (fromUnit === 'часы' && toUnit === 'секунды') result = value * 3600;
        else if (fromUnit === 'секунды' && toUnit === 'часы') result = value / 3600;
        else result = value;
    }

    document.getElementById('converterResult').textContent = result.toFixed(4);
}

// КАЛЬКУЛЯТОР: ВВОД (новая логика с отображением операций)
function calcInput(value) {
    const display = document.getElementById('calcDisplay');

    // ОЧИСТКА
    if (value === 'AC') {
        calcExpression = '0';
        display.textContent = '0';
        return;
    }

    // СМЕНА ЗНАКА
    if (value === '±') {
        if (calcExpression !== '0' && calcExpression !== 'Error') {
            // Меняем знак последнего числа в выражении
            if (calcExpression === '0') {
                calcExpression = '-0';
            } else {
                calcExpression = '-' + calcExpression;
            }
            display.textContent = calcExpression;
        }
        return;
    }

    // ПРОЦЕНТ
    if (value === '%') {
        // Процент от текущего выражения
        try {
            const result = eval(calcExpression) / 100;
            calcExpression = String(result);
            display.textContent = calcExpression;
        } catch {
            calcExpression = 'Error';
            display.textContent = 'Error';
        }
        return;
    }

    // ТОЧКА
    if (value === '.') {
        // Добавляем точку к последнему числу
        const lastChar = calcExpression.slice(-1);

        if (['+', '-', '*', '/'].includes(lastChar)) {
            // Если последний символ операция, добавляем "0."
            calcExpression += '0.';
        } else if (!calcExpression.includes('.') ||
                   ['+', '-', '*', '/'].some(op => calcExpression.split(op).pop().includes('.'))) {
            // Проверяем есть ли уже точка в текущем числе
            const parts = calcExpression.split(/[\+\-\*\/]/);
            const currentNumber = parts[parts.length - 1];

            if (!currentNumber.includes('.')) {
                calcExpression += '.';
            }
        }
        display.textContent = calcExpression;
        return;
    }

    // РАВНО
    if (value === '=') {
        try {
            // Вычисляем выражение
            const result = eval(calcExpression);

            // Округляем если много знаков после запятой
            let finalResult = result;
            if (typeof result === 'number') {
                if (result.toString().includes('.') && result.toString().split('.')[1].length > 6) {
                    finalResult = Math.round(result * 1000000) / 1000000;
                }
            }

            calcExpression = String(finalResult);
            display.textContent = calcExpression;
        } catch {
            calcExpression = 'Error';
            display.textContent = 'Error';
        }
        return;
    }

    // ОПЕРАЦИИ (+, -, *, /)
    if (['+', '-', '*', '/'].includes(value)) {
        const lastChar = calcExpression.slice(-1);

        // Если выражение начинается с нуля
        if (calcExpression === '0') {
            calcExpression = '0' + value;
        }
        // Если последний символ уже операция - заменяем её
        else if (['+', '-', '*', '/'].includes(lastChar)) {
            calcExpression = calcExpression.slice(0, -1) + value;
        }
        // Иначе добавляем операцию
        else {
            calcExpression += value;
        }

        display.textContent = calcExpression;
        return;
    }

    // ЦИФРА (0-9)
    if (calcExpression === '0' || calcExpression === 'Error') {
        calcExpression = value;
    } else {
        calcExpression += value;
    }

    display.textContent = calcExpression;
}

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('unitModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeUnitModal();
        }
    });

    goToHome();
});