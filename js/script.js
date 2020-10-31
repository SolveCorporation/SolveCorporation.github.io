const canvas = document.getElementById('CenterApps'); //Помещаем в переменную canvas
const ctx = canvas.getContext('2d'); //Делаем игру 2д

function OnClickApplication(type) {
	location.href = type;
};

var ImageSolve = new Image();
ImageSolve.src = 'https://cdn.icon-icons.com/icons2/836/PNG/128/Google_icon-icons.com_66793.png'

function DrawImage() {
	ctx.drawImage(ImageSolve, 0, 0)
};


let game = setInterval(DrawGame, 100) //Вызывать функцию DrawGame каждые 100 миллисекунд