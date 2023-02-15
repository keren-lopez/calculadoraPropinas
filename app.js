const buttonPorcentaje = document.querySelectorAll('.button'); 
const buttonSelected = document.getElementsByClassName('active');  
const reset = document.querySelector('#principal-derecha #button-reset');
const bill = document.querySelector(' #principal-izquierda #bill .input');
const numeroDePersonas = document.querySelector(' #principal-personas #number-people .input');
const mensajeError = document.querySelector('.if-zero-number');
const customTip = document.querySelector('.custom')
const inputs = document.querySelectorAll('.input');
const resultTip = document.querySelector('#result-tip');
const resultTotal = document.querySelector('#result-total');


/*-----------------------------------------Funciones-----------------------------------------------*/

function calcular(){
    let tipPorcPerson;
    let totalPorcPerson;
    let tipPorcentaje;

    if(buttonSelected.length == 0){
        tipPorcentaje = 0;
    }else{
        if(customTip.classList.contains('active')){
            tipPorcentaje = customTip.value;
        }else{
            tipPorcentaje = buttonSelected[0].value;
        }    
    }
    
    tipPorcPerson = (bill.value * tipPorcentaje * 0.01)/numeroDePersonas.value;
    totalPorcPerson = (bill.value/numeroDePersonas.value) + tipPorcPerson;
    tipPorcPerson = tipPorcPerson.toFixed(2);   
    totalPorcPerson = totalPorcPerson.toFixed(2);

    resultTip.innerText = tipPorcPerson;
    resultTotal.innerText = totalPorcPerson;
}


function calcularPropina(){
    buttonPorcentaje.forEach((button) => {
        button.classList.remove('active');
    });
    this.classList.add('active');
    customTip.classList.remove('active');
    calcular();
}


function calcularCustomTip(){
    buttonPorcentaje.forEach((button) => {
        button.classList.remove('active');
    });
    this.classList.add('active');
    
    if((bill.value !== '' || bill.value < 0) && (numeroDePersonas.value !== '' || numeroDePersonas.value > 0) ){
        calcular();
    }
}

/*---------------------------------------Oninput-------------------------------------------------*/

function  resetButton(){
    if(customTip.value === '' && bill.value === '' && numeroDePersonas.value === ''){
        reset.disabled = true;
        reset.classList.remove('has-reset-activated');
        numeroDePersonas.style.borderColor = '';
    }else{
        reset.disabled = false;
        reset.classList.add('has-reset-activated');       
    }
}


function resetAll(){
    buttonPorcentaje.forEach((button) => {
        button.classList.remove('active');
    });

    inputs.forEach((input) => {
        input.value = '';
    });

    resultTip.innerText = '0.00';
    resultTotal.innerText = '0.00';

    reset.disabled = true;
    mensajeError.innerText = ``;
    numeroDePersonas.style.borderColor = ''
    reset.classList.remove('has-reset-activated');
    reset.style.backgroundColor = '';
}


/*---------------------------------------AddeventListeners-------------------------------------------------*/

customTip.addEventListener('click', calcularCustomTip);

buttonPorcentaje.forEach((button) => {
    button.addEventListener('click', calcularPropina);
})


/*---------------------------------------Oninput-------------------------------------------------*/

bill.oninput = function(event){
     resetButton();

    if(customTip.value !== '' && (numeroDePersonas.value !== '' || numeroDePersonas.value > 0) ){
        calcular();
    }
    
}

customTip.oninput = function(){  
     resetButton();
    
    if((bill.value !== '' || bill.value < 0) && (numeroDePersonas.value !== '' || numeroDePersonas.value > 0) ){
        calcular();
    }
}

numeroDePersonas.oninput = function(){
    
     resetButton();

    if(numeroDePersonas.value <= 0 || numeroDePersonas.value === ''){
        mensajeError.innerText = `can't be zero`;
        mensajeError.style.color = 'red';
        numeroDePersonas.style.borderColor = 'red';
        resultTip.innerText = '----';
        resultTotal.innerText = '----';
    }else{
        mensajeError.innerText = ``;
        numeroDePersonas.style.borderColor = '';
        calcular();
    }   
}



/*------------------Reset-Eventos --------------------------------- */
reset.addEventListener('click', resetAll)

reset.addEventListener('mouseenter', ()=>{
    reset.style.backgroundColor = 'var(--lightGrayishCyan )';
});

reset.addEventListener('mouseleave', ()=>{
    reset.style.backgroundColor = '';
});