let etapas = [
    {
        titulo:"VEREADOR",
        numeros:5,
        candidatos:[
            {
                numero:'38111',
                name: "Fulano de tal",
                partido: "ABC",
                fotos:[
                    {url:'bnc3.jpg',legendas: "Vereador", small:false}
                ]
            },
            {
                numero:'77222',
                name: "beltrano da silva",
                partido: "DEFG",
                fotos:[
                    {url:'bnc2.jpg',legendas: "Vereador", small:false}
                ]
            },
        ]
    },
    {
        titulo: "PREFEITO",
        numeros: 2,
        candidatos:[
            {
                numero:'99',
                name:"Ciclano",
                partido:"ABC",
                vice:"Cic",
                fotos:[
                    {url:"bnc2_1.jpg",legendas:"Prefeito"},
                    {url:"bnc3_1.jpg",legendas:"Vice-Prefeito", small:true}
                ]
            },
            {
                numero: '84',
                name: "Zulano",
                partido:"QWERTY",
                vice:"Zul",
                fotos:[
                    {url:"bnc1.jpg",legendas:"Prefeito"},
                    {url:"bnc1_2.png",legendas:"Vice-Prefeito", small:true}
                ]
            }
        ]
    }
];

let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");

let etapaAtual = 0;
let numero = '';
let vtBranco = false;
let votos = [];
function comecaEtapa(){
let etapa =etapas[etapaAtual];

let numeroHtml = '';
numero = '';
vtBranco = false;


for (let i = 0; i < etapa.numeros; i++) {
    if(i === 0){
        numeroHtml += '<div class="numero pisca"></div>';
    }else{
    numeroHtml += '<div class="numero"></div> ';
    }
    
}

seuVotoPara.style.display ='none';
cargo.innerHTML = etapa.titulo;
descricao.innerHTML = '';
aviso.style.display ='none';
lateral.innerHTML = '';
numeros.innerHTML = numeroHtml;


}
function atualizaInterface(){
    let etapa =etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];

        seuVotoPara.style.display ='block';
        descricao.innerHTML = `Nome: ${candidato.name} <br> Partido: ${candidato.partido}`;
        aviso.style.display ='block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="./imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legendas}</div>`
            
        }

        lateral.innerHTML = fotosHtml
    } else{
        seuVotoPara.style.display ='block';
        aviso.style.display ='block';
        descricao.innerHTML = '<div class= "aviso-grande pisca">VOTO NULO</div>';
    }
}



function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}
function branco(){
    if(numero === ''){
        vtBranco = true;
        seuVotoPara.style.display ='block';
        aviso.style.display ='block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class= "aviso-grande pisca">VOTO EM BRANCO</div>';
    } else{
        alert("Para votar em BRANCO, não pode ter digitado nenhum numero!");
    }
}
function corrige(){
    comecaEtapa();
}
function confirma(){
    let etapa =etapas[etapaAtual];
    let vtConfirmado = false;

    if(vtBranco === true){
        vtConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'branco'
        });
    } else if (numero.length === etapa.numeros){
        vtConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if(vtConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecaEtapa();
        }else{
           
            document.querySelector('.tela').innerHTML = '<div class= "aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecaEtapa();