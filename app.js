let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let vidas = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function actualizarVidas() {
    let corazones = document.querySelectorAll('.corazon');

    for (let i = 0; i < vidas; i++) {
        corazones[i].classList.remove('corazon-vacio');
        corazones[i].classList.add('corazon-lleno');
    }

    for (let i = vidas; i < 3; i++) {
        corazones[i].classList.remove('corazon-lleno');
        corazones[i].classList.add('corazon-vacio');
    }
}

function perderVida() {
    vidas--;
    actualizarVidas();

    if (vidas === 0) {
        asignarTextoElemento('p', 'Perdiste todas las vidas. El número secreto era: ' + numeroSecreto);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('valorUsuario').setAttribute('disabled', 'true');
        document.getElementById('intentar').setAttribute('disabled', 'true'); // Deshabilitar el botón de intentar
    }
}


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('valorUsuario').setAttribute('disabled', 'true');
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        perderVida();
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el numero generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    vidas = 3;
    actualizarVidas();
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    // limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de números
    // Generar el número aleatorio
    // Inicializar el número intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('valorUsuario').removeAttribute('disabled');
}

condicionesIniciales();
