let data = [{
        face: 'img/okkam.jpg',
        name: 'У.Оккам',
        quote: 'Нельзя применять многочисленности без необходимости.',
        text: 'Мы не должны принимать какое-либо положение как не подлежащее обоснованию, если только это не логический вывод, или нечто, проверенное на опыте, или же благочестивое предписание, требующее от нас поступать именно так, а не иначе…'
    },
    {
        face: 'img/show.jpg',
        name: 'Б.Шоу',
        quote: 'Бойся человека, Бог которого живёт на небесах!',
        text: 'Все автобиографии лживы. Ни один человек не может быть плох настолько, чтобы рассказать о себе при жизни правду, втянув в это дело, как того и требует правда, свою семью, друзей и коллег. И ни один человек не может быть настолько добродетельным, чтобы рассказать правду потомству в документе, который он держит при себе до тех пор, пока не останется никого, кто бы мог противоречить ему.'
    },
    {
        face: 'img/letov.jpg',
        name: 'Е.Летов',
        quote: 'Придуманным миром удобней управлять.',
        text: 'Я, знаете, очень пессимистически настроен — как-то вот не верю в то (а тем более после того, что содеяно), что всё человечество разом внезапно поумнеет и начнёт жить по-другому. Единственная надежда — на то, что выживут хотя бы несколько хороших людей, живых людей. Но я думаю, что они просто возникнут как новый этап эволюции, может, это будут вовсе и не люди. Жизнь всё равно продолжится — смерти нет.'
    },
    {
        face: 'img/berdyaev.jpg',
        name: 'Н.Бердяев',
        quote: 'Злейший враг свободы — сытый и довольный раб.',
        text: 'История лишь в том случае имеет смысл, если будет конец истории, если будет в конце воскресение, если встанут мертвецы с кладбища мировой истории и постигнут всем существом своим, почему они истлели, почему страдали в жизни и чего заслужили для вечности, если весь хронологический ряд истории вытянется в одну линию и для всего найдется окончательное место.'
    },
];

let page = 0; // страница по умолчанию

let rootElem = document.getElementById('root');
let galContainer = document.createElement('div');
let film = document.createElement('div');
let pointContainer = document.createElement('div');

galContainer.classList.add('galContainer');
film.classList.add('film');
pointContainer.classList.add('pointContainer');

data.forEach(function (elem) {
    let cardElem = document.createElement('div');
    let faceElem = document.createElement('div');
    let nameElem = document.createElement('p');
    let quoteElem = document.createElement('p');
    let textElem = document.createElement('p');
    let point = document.createElement('div');

    cardElem.classList.add('card');
    faceElem.classList.add('face');
    nameElem.classList.add('name');
    quoteElem.classList.add('quote');
    textElem.classList.add('text');
    point.classList.add('point');

    faceElem.innerHTML = `<img src = '${elem.face}'>`; // это можно было бы сделать и поизящнее, не правда ли?
    nameElem.innerText = elem.name;
    quoteElem.innerText = elem.quote;
    textElem.innerText = elem.text;

    cardElem.appendChild(faceElem);
    cardElem.appendChild(nameElem);
    cardElem.appendChild(quoteElem);
    cardElem.appendChild(textElem);

    film.appendChild(cardElem);
    pointContainer.appendChild(point);
    pointListener(point); // вешаем прослушивалку на каждую point
});

galContainer.appendChild(film);
rootElem.appendChild(galContainer);
rootElem.appendChild(pointContainer);

function pointListener(point) {
    point.addEventListener('click', function () {
        page = points.indexOf(this);
        film.style.marginLeft = `-${page}00%`;
        pointPainter();
    });
};

function pointPainter() { // раскрашиваем кнопки
    document.querySelector('.active').classList.remove('active');
    points[page].classList.add('active');
};

function resize() { // проверяем изменение ширины экрана и подгоняем размеры элементов
    film.style.width = data.length * galContainer.offsetWidth + 'px';
    document.querySelectorAll('.card')
        .forEach(elem => elem.style.width = window.innerWidth + 'px');
};

// ниже - элементы навигации //

document.querySelector('.point').classList.add('active'); // вешаем active на первую point
let points = [...document.querySelectorAll('.point')]; // отработает после data.forEach, так что всё ок

let rightBtn = document.createElement('div');
let leftBtn = document.createElement('div');
rightBtn.addEventListener('click', goRight);
leftBtn.addEventListener('click', goLeft);
rightBtn.classList.add('rightBtn');
leftBtn.classList.add('leftBtn');
leftBtn.innerText = '<';
rightBtn.innerText = '>';

rootElem.appendChild(leftBtn);
rootElem.appendChild(rightBtn);

function goLeft() {
    if (page == 0) {
        return
    };
    page--;
    film.style.marginLeft = `-${page}00%`;
    pointPainter();
};

function goRight() {
    if (page == data.length - 1) {
        return
    };
    page++;
    film.style.marginLeft = `-${page}00%`;
    pointPainter();
};

window.addEventListener('resize', resize);

resize();