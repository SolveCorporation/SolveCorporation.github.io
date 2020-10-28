const canvas = document.getElementById('game'); //Помещаем в переменную canvas
const ctx = canvas.getContext('2d'); //Делаем игру 2д


const ground = new Image(); //Фон
const foodImg = new Image(); //Еда

ground.src = 'img/ground.png'; //Устанавливаем значение для фона
foodImg.src = 'img/food.png'; //Устанавливаем значение для Еда

let box = 32; //Размер одного квадрата на карте

let score = 0; //Очков


//создать объект еды
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box, //Рандом от 1 до 17 и округляем с помощь floor, после умножаем на ширину квадрата
	y: Math.floor((Math.random() * 15 + 3)) * box,
}


//Создать переменную и объек змейки
let snake = [] //хвост и продолжение змеи
snake[0] = { //Объект змеи, где она будет отображаться
	x: 9 * box, //Отобразить по-середине
	y: 10 * box,
}



//Создать обработчик событий нажатия клавиш на всём документе
document.addEventListener('keydown', direction) //При нажатии любой клавиши, вызывается функция direction

let dir;

function direction(event) { //Фукнция с запросом на event, которая имеет много полезного
	//Также внесены некоторые правила:
	//Нельзя двигать змею в противоположную сторону, если идёт движение

	if(event.keyCode == 37 && dir != 'right') //Если нажата клавиша (левая кнопка) - код клавиш 
		dir = 'left'
	else if(event.keyCode == 38 && dir != 'down') //Если нажата клавиша вверх
		dir = 'up'
	else if(event.keyCode == 39 && dir != 'left') //Если нажата клавиша вправо
		dir = 'right'
	else if(event.keyCode == 40 && dir != 'up') //Если нажата клавиша вниз
		dir = 'down'

}



//Обработка сьедание своего-же хвоста
function eatTail(head, arr) { //передаёт голову, и всё тело


	for(let i = 0; i < arr.length; i++) { //Перебираем всё в теле змеи
		if(head.x == arr[i].x && head.y == arr[i].y) //Если голова сталкивается с хвостом
			clearInterval(game); //закончить игру
	}
}




//Сама функция игры, рисование игры
function DrawGame() {
	ctx.drawImage(ground, 0, 0); //Фон
	ctx.drawImage(foodImg, food.x, food.y) //Отображение еды

	//Отображение змеи
	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "red" //Если это первый элемент змеи (голова), то она зелёная, но если нет, то красный элемент
		ctx.fillRect(snake[i].x, snake[i].y, box, box) //Отобразить змею(нарисовать квадрат в заданых координатах)
	}


	//Отображение рекорда(очков)
	ctx.fillStyle = 'White'; //Цвет текста
	ctx.font = '50px Arial'; //Шрифт и размер текста
	ctx.fillText(score, box * 2.5, box * 1.7)


	//Зачем-то создаём переменную для координат змеи
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	//Проверка на то, сьела ли змея еду
	if(snakeX == food.x && snakeY == food.y) { //Если змея на еде
		score++; //Прибавить балл
		//создать объект еды
		food = { //создать новую еду
			x: Math.floor((Math.random() * 17 + 1)) * box, //Рандом от 1 до 17 и округляем с помощь floor, после умножаем на ширину квадрата
			y: Math.floor((Math.random() * 15 + 3)) * box,
		}
	} else {
		//удаление последнего звена в змее
		snake.pop();
	}






	//Управление змеёй
	if(dir == 'left') snakeX -= box; //Если змея влево
	if(dir == 'right') snakeX += box; //Если змея вправо
	if(dir == 'up') snakeY -= box; //Если змея вверх
	if(dir == 'down') snakeY += box; //Если змея вниз


	//Создать новую голову
	let newHead = {
		x: snakeX,
		y: snakeY,
	};


	//Обработчик встречи головы с хвостом
	eatTail(newHead, snake)

	//Создание краёв
	if(snakeX < box)
		snake[0].x = box*17;
	else if(snakeX > box*17)
		snake[0].x = box;
	else if(snakeY < box*3)
		snake[0].y = box*17
	else if(snakeY > box*17)
		snake[0].y = box*3



	snake.unshift(newHead); //Добавить во всю структуру змеи новую переменную в начало



	//clearInterval(game); //Закончить игру, то есть очистить интервал

}




let game = setInterval(DrawGame, 100) //Вызывать функцию DrawGame каждые 100 миллисекунд