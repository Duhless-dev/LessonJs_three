document.addEventListener('DOMContentLoaded', () => {

//!Табы

	const tabs = document.querySelectorAll(".tabcontent"),
	tabBtn = document.querySelectorAll(".tabheader__item"),
	tabBtnContainer = document.querySelector(".tabheader__items");


	function hideTabs(){
		tabs.forEach ((item, i) => {
			item.style.display = "none";
			tabBtn[i].classList.remove("tabheader__item_active");
		});
	}
	function addTabs(i = 0){
		tabs[i].style.display = "block";
		tabBtn[i].classList.add("tabheader__item_active");
	}


	hideTabs();
	addTabs();

	tabBtnContainer.addEventListener('click', (e)=>{
		if (e.target && e.target.classList.contains("tabheader__item")){
			tabBtn.forEach((item,i) => {
				if (e.target == item){
					hideTabs();
					addTabs(i);
				}
			});
		}
	});



//!Таймер

const deadLine = "2020-10-30";

function calcTime(){
	const total = Date.parse(deadLine) - new Date();
	const days = Math.floor(total / (1000 * 60 * 60 * 24));
	const hours = Math.floor((total / (1000 * 60 * 60) % 24));
	const minutes = Math.floor((total / 1000 / 60 )% 60);
	const seconds = Math.floor((total / 1000) % 60);
	return {
		total: total,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
		};
}

function getZero(num){
	if (num>=0 && num<10){
		return(`0${num}`);
	} else{
		return(num);
	}
}
function setTime(selector){
	const timer = document.querySelector(selector);
	const days = timer.querySelector("#days");
	const hours = timer.querySelector("#hours");
	const minutes = timer.querySelector("#minutes");
	const seconds = timer.querySelector("#seconds");
	const id = setInterval(upTimer, 1000);

	upTimer();

	function upTimer(){
		const t = calcTime();
		
		if (t.total >=0){
			days.textContent = getZero(t.days);
			hours.textContent = getZero(t.hours);
			minutes.textContent = getZero(t.minutes);
			seconds.textContent = getZero(t.seconds);
		}else{
			clearInterval(id);
		}
	}
}

setTime('.timer');


//!Модальное окно

const modal = document.querySelector(".modal"),
		modalBtn = document.querySelectorAll('[data-modal]'),
		closeBtn = modal.querySelector(".modal__close");


		function modalClose(){
			modal.style.display = "none";
			document.body.style.overflow = "";
		}

		function modalAdd(){
			modal.style.display = "block";
			document.body.style.overflow = "hidden";		
		}
		
		
		function showModalByScroll(){
			if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
				modalAdd();
				window.removeEventListener("scroll", showModalByScroll);
				//clearInterval(modalTimerId);
			}
		}
		
		modalBtn.forEach((btn) => {
			btn.addEventListener("click",() =>{
					modalAdd();
					//clearInterval(modalTimerId);
				});
			});

		closeBtn.addEventListener("click", modalClose);

		modal.addEventListener("click", (e) =>{
			if (e.target && e.target == modal){
				modalClose();
			}
		});
		
		document.addEventListener("keydown", (e) =>{
			if(e.code === "Escape" && modal.style.display == "block"){
				modalClose();
			}
		});

		//const modalTimerId = setTimeout(modalAdd, 5000);

		window.addEventListener("scroll", showModalByScroll);

});

//!Динамические экземпляры Меню
const menuField = document.querySelector(".menu__field"),
		menuContainer = menuField.querySelector(".container");

class MenuItem{
	constructor(img, title, descr, price){
		this.img = img;
		this.title = title;
		this.descr = descr;
		this.price = price;
	}
	createMenuItem(){
		const menuItem = document.createElement('div');
		menuItem.classList.add('menu__item');
		menuItem.innerHTML = `<img src="${this.img}" alt="vegy">
					<h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>`;
		menuContainer.append(menuItem);
	}
}

const menuFitnes = new MenuItem(
	'img/tabs/vegy.jpg',
	'Фитнес',
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	229);

menuFitnes.createMenuItem();



const menuPremium = new MenuItem('img/tabs/elite.jpg', 'Премиум','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '550');

menuPremium.createMenuItem();



const menuPost = new MenuItem('img/tabs/post.jpg', 'Постное','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '430');

menuPost.createMenuItem();