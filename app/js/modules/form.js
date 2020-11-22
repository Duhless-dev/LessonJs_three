import{modalContent, inputs, btnClose} from './modal';
import{postData} from '../services/services';

function form(formSelector){
    //!Формы - отправка данных
   
    const forms = document.querySelectorAll(formSelector);
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

            const json = JSON.stringify(object);

            postData('http://localhost:3000/requests', json).then(data => {
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
}

export default form;