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

const deadLine = "2020-11-30";

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
		modalContent = document.querySelector(".modal__content"),
		inputs = modalContent.querySelectorAll(".modal__input"),
		btnClose = modalContent.querySelector(".btn");


		function modalClose(){
			modal.style.display = "none";
			document.body.style.overflow = "";
			inputs.forEach(item =>{
			item.style.display = "block";
		});

		btnClose.style.display = "block";

		modalContent.querySelector(".modal__title").textContent = "Мы свяжемся с вами как можно быстрее!";	
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

		modal.addEventListener("click", (e) =>{
			if (e.target && (e.target == modal || e.target.classList.contains('modal__close'))){
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
						<div class="menu__item-total"><span>${(this.price * 28.2).toFixed(2)}</span> грн/день</div>
					</div>`;
		menuContainer.append(menuItem);
	}
}


axios.get('http://localhost:3000/menu')
	.then(data =>{
		data.data.forEach(({img, title, descr, price}) =>{
			new MenuItem(img, title, descr, price).createMenuItem();
		});
	});
		

//!Формы - отправка данных
const postData = async(url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			'Content-type': "aplication/json"
		},
		body: data
	});
};
const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Сообщение отправлено!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        buildPostData(item);
	 });
	 
	 function modalSuccess(mess){
		 
		inputs.forEach(item =>{
			item.style.display = "none";
		});

		btnClose.style.display = "none";

		modalContent.querySelector(".modal__title").textContent = `${mess}`;

	 }
    function buildPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
				statusMessage.style.display = "block";
				statusMessage.style.margin = "30px auto";
				statusMessage.src = message.loading;
            form.insertAdjacentElement("afterend",statusMessage);
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
			postData('server.php',JSON.stringify(object))
				.then(data =>{
					console.log(data);
					modalSuccess(message.success, inputs, btnClose, modalContent);
         		
					statusMessage.remove();
					}).catch(() => {
						statusMessage.textContent = message.failure;
					}).finally(()=>{
						form.reset();
					});
        });
	 }

//!Cлайдер

const sliderWrapper = document.querySelector(".offer__slider"),
	slides = sliderWrapper.querySelectorAll(".offer__slide"),
	arrowLeft = sliderWrapper.querySelector(".offer__slider-prev"),
	arrowRight = sliderWrapper.querySelector(".offer__slider-next"),
	slideId = sliderWrapper.querySelector("#current"),
	slideTotal = sliderWrapper.querySelector("#total"),
	sliderInner = sliderWrapper.querySelector(".offer__slider-inner"),
	width = window.getComputedStyle(sliderWrapper).width,
	offerSlider = document.querySelector(".offer__slider"),
	dotsWrapper = document.createElement("ul"),
	dots = [];
	let id = 1;
	let offset = 0;


	function showHideSlide(index, w){

		if(index > slides.length){
			id = 1;
			offset = 0;
			w = '0px';
		}

		if(index < 1){
			id = slides.length ;
			offset = -(strNotDigits(w)* (slides.length -1));
			w = '0px';
		 }

		 slideId.textContent = getZero(id);	
		 dotCurrent();
		 offset+= strNotDigits(w);
		 sliderInner.style.transform = `translateX(${offset}px)`;
	 }



	function dotCurrent(){
		dots.forEach((item) =>{
			item.style.backgroundColor= "#fff"; 
			if(+item.getAttribute('data-index') == id){
				item.style.backgroundColor= "#000";
			}
		 });
	}

	function dotCurrentShow(index, pos){
		slideId.textContent = getZero(index);
		id = index;
		offset = -pos;	
		dotCurrent();
		sliderInner.style.transform = `translateX(${offset}px)`;	
	}

	function changeSlide(n, s){
		showHideSlide(id += n,`${s}${width}`);
	}

	function strNotDigits(str){	
			return +str.replace(/px/g,'');	
	}


	offerSlider.style.position = "relative";

	dotsWrapper.classList.add("carousel-indicators");

	for(let i = 0; i < slides.length; i++){
		const dot = document.createElement("li");
		dot.classList.add("dot");
		dot.setAttribute('data-index', i + 1);
		dots[i] = dot;
		dotsWrapper.append(dot);
	}

	offerSlider.append(dotsWrapper);

	slideTotal.textContent = getZero(slides.length);

	showHideSlide(id, '0px');

	sliderInner.style.cssText = `
		width:${100 * slides.length}%;
		display: flex;
		transition: all 1s`;

	sliderWrapper.style.overflow = "hidden";

	

	arrowRight.addEventListener('click',()=>{
			changeSlide(1,'-');
	});

	arrowLeft.addEventListener('click',()=>{
			changeSlide(-1,'');		
	});

	dotsWrapper.addEventListener('click', (e)=>{
		if(e && e.target.classList.contains("dot")){
			let idDot = +(e.target.getAttribute('data-index'));
			dotCurrentShow(idDot, (idDot - 1) * strNotDigits(width));
		}
	});




	//Калькулятор
const calcResult = document.querySelector(".calculating__result span");
let calcWeight, calcHeight, calcAge, calcSex, calcRatio;


function calcLocalInit(parrentSelector){
	parrentSelector = document.querySelector(parrentSelector);
	let selector = parrentSelector.querySelectorAll(`div`);
	selector.forEach((elem) =>{
		elem.classList.remove("calculating__choose-item_active");
		if(elem.getAttribute("data-ratio") === localStorage.getItem("calcRatio")){
			elem.classList.add("calculating__choose-item_active");
		}
		if(elem.getAttribute("id")=== localStorage.getItem("calcSex")){
			elem.classList.add("calculating__choose-item_active");
		}
	});
	
}

function calcEat(){
	if (!calcWeight || !calcHeight || !calcAge || !calcSex || !calcRatio){
		calcResult.textContent = "Хуй";
		return;	
	}
	
	if (calcSex === "female"){
		calcResult.textContent = Math.round((447.6  + (9.2 * calcWeight) + (3.1 * calcHeight) - (4.3 * calcAge))*calcRatio);
	}else{
		calcResult.textContent = Math.round((88.36 + (13.4 * calcWeight) + (4.8 * calcHeight) - (5.7 * calcAge))*calcRatio);
	}
}

function calcInformationGet(parrentSelector){
	parrentSelector = document.querySelector(parrentSelector);
	let selector = parrentSelector.querySelectorAll(`div`);

	parrentSelector.addEventListener('click',(e) =>{
		if (e.target && e.target.classList.contains("calculating__choose-item")){
			selector.forEach((elem) =>{
				elem.classList.remove("calculating__choose-item_active");
			});
			e.target.classList.add("calculating__choose-item_active");


			if(e.target.getAttribute("data-ratio")){
				calcRatio = +e.target.getAttribute("data-ratio");
				localStorage.setItem("calcRatio", calcRatio);
			}else{
				calcSex = e.target.getAttribute("id");
				localStorage.setItem("calcSex", calcSex);
			}
		}
		calcEat();
	});
}

function calcInformationDinamyc(){
	const parrentSelector = document.querySelector(".calculating__choose_medium");
	const input = parrentSelector.querySelectorAll("input");

	input.forEach((elem) =>{
		elem.addEventListener("input",(e)=>{
			if (e.target.value.match(/\D/g)){
				e.target.style.border = "3px solid red";
			}else{
				e.target.style.border = "none";
				switch(e.target.getAttribute("id")){
					case "height":
						calcHeight = +e.target.value;
						break;
					case "weight":
						calcWeight = +e.target.value;
						break;
					case "age":
						calcAge = +e.target.value;
						break;
				}
			}
			calcEat();	
		});
	});
}



if (localStorage.getItem("calcSex")){
	calcSex = localStorage.getItem("calcSex");
}else{
	calcSex = "female";
	localStorage.setItem("calcSex","female");
}

if (localStorage.getItem("calcRatio")){
	calcRatio = +localStorage.getItem("calcRatio");
}else{
	calcRatio = 1.375;
	localStorage.setItem("calcRatio","1.375");
}


calcLocalInit("#gender");
calcLocalInit(".calculating__choose_big");
calcInformationGet("#gender");
calcInformationGet(".calculating__choose_big");
calcInformationDinamyc();
calcEat();
		
});


