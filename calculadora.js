'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        const resultado = eval(`${ numeroAnterior }${ operador }${ numeroAtual }`);
        atualizarDisplay(resultado);

        //  if (operador == '+') {
        //  atualizarDisplay(numeroAnterior + numeroAtual);
        //} else if (operador == '-') {
        //  atualizarDisplay(numeroAnterior + numeroAtual);
        //} else if (operador == '*') {
        //  atualizarDisplay(numeroAnterior + numeroAtual);
        //} else if (operador == '/') {
        //  atualizarDisplay(numeroAnterior + numeroAtual);
        //  }
    }
}


const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
        console.log(operador);
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

// botao igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);


// botao limpar CE
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//botao limpar C
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);



const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);



const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');

        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);