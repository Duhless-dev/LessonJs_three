 function tabs(tabsSelector, tabsBtnSelector, tabsParrentSelector, tabActiveSelector){
    const tabs = document.querySelectorAll(tabsSelector),
	tabBtn = document.querySelectorAll(tabsBtnSelector),
	tabBtnContainer = document.querySelector(tabsParrentSelector);

	function hideTabs(){
		tabs.forEach ((item, i) => {
			item.style.display = "none";
			tabBtn[i].classList.remove(tabActiveSelector.slice(1));
		});
	}
	function addTabs(i = 0){
		tabs[i].style.display = "block";
		tabBtn[i].classList.add(tabActiveSelector.slice(1));
	}


	hideTabs();
	addTabs();

	tabBtnContainer.addEventListener('click', (e)=>{
		if (e.target && e.target.classList.contains(tabsBtnSelector.slice(1))){
			tabBtn.forEach((item,i) => {
				if (e.target == item){
					hideTabs();
					addTabs(i);
				}
			});
		}
	});
 }

 export default tabs;