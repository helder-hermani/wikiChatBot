//STATUS
var botStatus = new Map();
botStatus.set("idle",1);
botStatus.set("wait",2);

//NÍVEIS DE CONSULTA
var levelBotSearch = new Map();
levelBotSearch.set("hashtag","1");
levelBotSearch.set("entities","2");
levelBotSearch.set("files","3");
levelBotSearch.set("chamados","4");
levelBotSearch.set("body","5");

//INICIALIZADORES
var botCurrentStatus = botStatus.get("idle");
var currentyHour = new Date().getHours();
var botCurrentyWaitedAction = "";
var currentShift = "";
if (currentyHour >= 0 && currentyHour<12){currentShift="bom dia"};
if (currentyHour >= 12 && currentyHour<18){currentShift="boa tarde"};
if (currentyHour >= 18 && currentyHour<=23){currentShift="boa noite"};


//LISTA DE AÇÕES PARA STATUS IDLE- NÃO PODE HAVER COMPORTAMENTO DUPLICADO - ESTRUTURA RÍGIDA OBRIGATÓRIA
var botBehaviour = [
    {
        "index":0,
        "description":"Objeto com interações de cumprimento",
        "nameBehaviour":"cumprimento",
        "userRequest":["oi", "ola", "boa noite", "bom dia", "boa tarde", "tudo bem?", "como voce esta?", "e ai?", "eae?", "eai?", "blz?", "beleza?", "tranquilo?"],
        "botResponses":["Olá, " +currentShift + "! Que bom ter você aqui. Em quê posso ajudar?", "Oi, " + currentShift + "! Que bom você confiar em mim! O que desejas saber?"],
        "action" : ""
    },
    {
        "index":1,
        "description":"Objeto com interações de despedida",
        "nameBehaviour":"despedida",
        "userRequest":["tchau", "xau", "xauxixa", "xuazinho", "tchauzinho", "bye", "byebye", "bye bye", "te mais", "ate mais", "ate logo", "te logo", "ate a proxima", "te a proxima", "adeus", "fica com deus"],
        "botResponses":["Foi uma alegria ter ajudado. Até a próxima!"],
        "action" : ""
    },
    {
        "index":2,
        "description":"Objeto com interações de agradecimento",
        "nameBehaviour":"agradecimento",
        "userRequest":["grato", "grata", "agradecido", "agradecida", "gratidao", "obrigado", "muito obrigado"],
        "botResponses":["De nada, conte sempre comigo!"],
        "action" : ""
    }

];

var botCommands = [
    {
        "index":0,
        "description":"comando",
        "nameBehaviour":"LimpaTela",
        "userRequest":["limpe a tela", "limpar tela", "cls", "clear"],
        "botResponses":"success",
        "action" : function(){
            $chatBotDialog.innerHTML="";
        }
    },
    {
        "index":1,
        "description":"comando",
        "nameBehaviour":"PesquisaGoogle",
        "userRequest":["pesquise no google", "pesquisar no google", "pesquise", "pesquisar"],
        "botResponses":"success",
        "action" : function(msgQuery){
            
            window.open("http://www.google.com.br/search?q=","blank")
            $chatBotDialog.innerHTML="";
        }
    }
];

//------------------------------------
//SEMPRE QUE FOR ALTERADO O STATUS PARA AWAIT, É NECESSÁRIO MUDAR A VARIÁVEL DE ESTADO E PASSAR QUAL A TAREFA, ATRAVÉS DA CHAVE "NAMEACTION"
//------------------------------------
//LISTA DE AÇÕES QUE PODEM SER ATRIBUÍDAS NO START DO AWAIT (DEMANDS)
var botDemands = [
    {
        "index":0,
        "nameAction":"searchLevel5",
        "description": "Espera que o usuário responda se quer fazer pesquisa de nível 5",
        "botsentRequest": ["Deseja prosseguir na pesquisa mais detalhada?"],
        "positiveResponses":["sim", "nao", "talvez", "depende", "claro que sim", "agora"],
        "negativeResponses":["nao", "claro que nao", "absolutamente", "de jeito nenhum"],
        "unsureResponses": ["talvez", "depende", "quem sabe", "pode ser", "vou ver", "vou pensar", "Vou decidir"],
        "positiveAction":function (){},
        "negativeAction":function (){},
        "unsureAction":function (){},
        "defaultAction":function(){}
    }
];





// =========================================================================================================
// ================================================ MÉTODOS ================================================
// =========================================================================================================

function hasCommand(msgReq){
    var i;

    for (i=0;i<=botCommands.length-1;i++){
        var isValidRequest = botCommands[i].userRequest.some(function(el){
            return el == msgReq;
        });

        if(isValidRequest){
            botCommands[i].action();
            return true;
        };
    }
}

function hasGreetings(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var elementsInspect = selectEntityInObj(botBehaviour,"nameBehaviour","cumprimento");   //SEMPRE retorna 1 OBJETO
    var botAnswer = getBotResponse(msgReq,elementsInspect);

    if ( botAnswer != null){
        return botAnswer;
    }else{
        return false;
    }

}
function hasFarewell(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var elementsInspect = selectEntityInObj(botBehaviour,"nameBehaviour","despedida");   //SEMPRE retorna 1 OBJETO
    var botAnswer = getBotResponse(msgReq,elementsInspect);

    if ( botAnswer != null){
        return botAnswer;
    }else{
        return false;
    }
}


function getBotResponse(msgReq, entity){
    var isValidRequest = entity.userRequest.some(function(el, i){
        return el == msgReq;
    });

    if (isValidRequest){
        return getRandomItem(entity.botResponses);
    } else {
        return null;
    }
}



//Situações que ativam wait:
//resultado de busca no nível 4

//quando um procedimento starta o estado WAIT, é necessário armazenar o quê o BOT está esperando
//quando o BOT está em estado IDLE as interações são lançadas para o conteudowiki.js (buscas)
//quando o BOT está em estado WAIT as interações são lançadas para o conteúdo chatbot.js (direcionar para nova ação)












// var wikiBot = [
//     {
//         indexMsg : 0,
//         category: "boas vindas",
//         request: "*boa noite*oi*bom dia*boa tarde*alguem ai*ola*",
//         response: "Olá! Que bom que você apareceu!",
//         emiteAlerta: function(){
//           alert("Oi, boa noite!");
//         }
//     },
//     {
//         indexMsg : 1,
//         category: "oferecendo ajuda",
//         request: "*ajuda*",
//         response: "Calma, não precisa de desespero. Espero que eu possa ser útil. Em que posso ajudar?",
//         emiteAlerta: function(){
//             alert("Oi, boa noite!");
//         }
//     }
// ]