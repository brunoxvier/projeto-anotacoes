const btnAddLink = document.querySelector('.btn-add-link');
const listaLinks = document.querySelector('.lista-links');

const btnPlayPauseTimer = document.querySelector('.btn-play-pause');
const btnReiniciarTimer = document.querySelector('.btn-reiniciar-timer');
const iconPlayPause = document.querySelector('.btn-play-pause > img');
const secaoModoBtns = document.querySelectorAll('.secao-modo button');
let tempoEmSegundos = 1500;
let intervalId
let modoAtual = 'btn-foco';


btnAddLink.addEventListener('click', () => {
    const linkURL = prompt('Qual URL do link que você gostaria de adicionar?');
    const linkName = prompt('Qual nome você gostaria de dar para o seu link?');
    if(!linkURL || !linkName) return
    
    const listItem = document.createElement('li');
    listItem.classList.add('lista-links-item');

    const link = document.createElement('a');
    link.setAttribute("href", linkURL);
    link.setAttribute("target", '_blank');
    link.setAttribute("rel", 'external');
    link.textContent = linkName;
    link.classList.add('link');

    listItem.appendChild(link);
    listaLinks.appendChild(listItem);
})

function exibirTimerNaTela() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const timerNaTela = document.querySelector('.timer');
    timerNaTela.innerHTML = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
}

btnPlayPauseTimer.addEventListener('click', () => {
    btnPlayPauseTimer.classList.toggle('timer-active');
    if(btnPlayPauseTimer.classList.contains('timer-active')) {
        intervalId = setInterval(contagemRegressiva, 1000);
        iconPlayPause.setAttribute('src', 'images/pause-fill.svg');
    } else {
        clearInterval(intervalId);
        iconPlayPause.setAttribute('src', 'images/play-fill.svg');
    }
})

function contagemRegressiva() {
    if(tempoEmSegundos == 0) {
        reiniciarTimer();
        return;
    }
    tempoEmSegundos -= 1;
    exibirTimerNaTela(); 
}

btnReiniciarTimer.addEventListener('click', reiniciarTimer);

function reiniciarTimer() {
    clearInterval(intervalId);
    if(modoAtual == 'btn-foco') {
        tempoEmSegundos = 1500;
    } else if(modoAtual == 'btn-descanso-curto') {
        tempoEmSegundos = 300;
    } else {
        tempoEmSegundos = 600;
    }

    iconPlayPause.setAttribute('src', 'images/play-fill.svg');
    btnPlayPauseTimer.classList.remove('timer-active');
    exibirTimerNaTela();
}

secaoModoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        modoAtual = btn.className;
        switch(modoAtual) {
            case 'btn-foco': 
                tempoEmSegundos = 1500;
                break;

            case 'btn-descanso-curto':
                tempoEmSegundos = 300;
                break;

            case 'btn-descanso-longo':
                tempoEmSegundos = 600;
                break;
        }
        reiniciarTimer();
    })
});
exibirTimerNaTela();