let SeuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2'); 
let lateral = document.querySelector('.d-1-direita');
let numeros = document.querySelector('.d-1-3');

let EtapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa(){

    let etapa = etapas[EtapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;


    for (let i = 0; i<etapa.numeros; i++){
        if (i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    SeuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = ''; 
    numeros.innerHTML = numeroHtml;
}

function AtualizaInterface() {
    let etapa = etapas[EtapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true; 
        } else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        SeuVotoPara.style.display = 'block';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido} <br> Vice: ${candidato.vice}`;
        aviso.style.display = 'block';

        let fotosHtml = ''; 
        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-imagem"> <img src="imagens/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = fotosHtml; 
    } else{
        SeuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class ="aviso-grande pisca">VOTO NULO</div>'
    }
      
}
function clicou (n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else {
            AtualizaInterface();
        }
    }
}
function branco (){
    if(numero === ''){
        votoBranco = true;
        SeuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class ="aviso-grande pisca">VOTO EM BRANCO</div>'
    } else{
        alert('Para votar em BRANCO o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.');
    }
}
function corrige (){
    comecarEtapa();
}
function confirma (){

    let etapa = etapas[EtapaAtual];
    let votoConfirmado = false;


    if(votoBranco === true){
        votoConfirmado = true;
    } else if( numero.length === etapa.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado){
        EtapaAtual ++;
        if(etapas[EtapaAtual] !== undefined){
            comecarEtapa(); 
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-grande fim">FIM!</div>';
        }
    }
}

comecarEtapa();