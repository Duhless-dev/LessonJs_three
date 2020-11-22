
import {getZero} from './timer';

function slider(){
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
}

export default slider;