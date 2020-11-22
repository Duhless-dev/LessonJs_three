import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import tabs from './modules/tabs';
import slider from './modules/slider';
import modal from './modules/modal';
import form from './modules/form';





document.addEventListener('DOMContentLoaded', () => {

timer('2020-11-30','.timer');
cards();
calc();
tabs('.tabcontent','.tabheader__item','.tabheader__items', '.tabheader__item_active');
slider();
modal('.modal', '[data-modal]');
form('form');
		
});


