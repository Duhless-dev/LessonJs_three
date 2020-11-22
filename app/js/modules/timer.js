function getZero(num){
    if (num>=0 && num<10){
        return(`0${num}`);
    } else{
        return(num);
    }
}

export {getZero};


function timer(deadLine, timerSelector){
    //!Таймер


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

    function setTime(){
        const timer = document.querySelector(timerSelector);
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

    setTime();

}

export default timer;