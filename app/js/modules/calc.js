function calc(){
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
}

export default calc;