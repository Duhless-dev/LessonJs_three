const modalContent = document.querySelector(".modal__content"),
inputs = modalContent.querySelectorAll(".modal__input"),
btnClose = modalContent.querySelector(".btn");

function modalAdd(selector){
    const modal = document.querySelector(selector);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";		
}

export function modalClose(selector){
    const modal = document.querySelector(selector);
    modal.style.display = "none";
    document.body.style.overflow = "";
    inputs.forEach(item =>{
    item.style.display = "block";
    });
    modalContent.querySelector(".modal__title").textContent = 'Мы свяжемся с вами как можно быстрее!';
}

export {modalAdd};
export{modalContent, inputs, btnClose};



function modal(selector, triggerSelector){
//!Модальное окно

const modal = document.querySelector(selector),
modalBtn = document.querySelectorAll(triggerSelector);

btnClose.style.display = "block";

modalContent.querySelector(".modal__title").textContent = "Мы свяжемся с вами как можно быстрее!";	


function showModalByScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        modalAdd(selector);
        window.removeEventListener("scroll", showModalByScroll);
        //clearInterval(modalTimerId);
    }
}

modalBtn.forEach((btn) => {
    btn.addEventListener("click",() =>{
            modalAdd(selector);
            //clearInterval(modalTimerId);
        });
    });

modal.addEventListener("click", (e) =>{
    if (e.target && (e.target == modal || e.target.classList.contains('modal__close'))){
        modalClose(selector);
    }
});

document.addEventListener("keydown", (e) =>{
    if(e.code === "Escape" && modal.style.display == "block"){
        modalClose(selector);
    }
});

//const modalTimerId = setTimeout(modalAdd, 5000);

window.addEventListener("scroll", showModalByScroll);
}

export default modal;