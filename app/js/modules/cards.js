function cards(){
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
}

export default cards;
