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
        "userRequest":["oi", "ola", "boa noite", "bom dia", "boa tarde"],
        "botResponses":["Olá, " +currentShift + "! Que bom ter você aqui. Em quê posso ajudar?", "Oi, " + currentShift + "! Que bom você confiar em mim! O que desejas saber?"],
        "action" : ""
    },
    {
        "index":1,
        "description":"Objeto com interações de cumprimento",
        "nameBehaviour":"cumprimento",
        "userRequest":["tudo bem?", "como voce esta?", "e ai?", "eae?", "eai?", "blz?", "beleza?", "tranquilo?"],
        "botResponses":["Aqui tudo ótimo! Obrigado por ter me chamado.", "Tudo bem comigo. Espero que eu possa ser útil", "Tudo bem, obrigado por perguntar. Se precisar de algo, é só falar."],
        "action" : ""
    },
    {
        "index":2,
        "description":"Objeto com interações de despedida",
        "nameBehaviour":"despedida",
        "userRequest":["tchau", "xau", "xauxixa", "xuazinho", "tchauzinho", "bye", "byebye", "bye bye", "te mais", "ate mais", "ate logo", "te logo", "ate a proxima", "te a proxima", "adeus", "fica com deus"],
        "botResponses":["Foi uma alegria ter ajudado. Até a próxima!"],
        "action" : ""
    },
    {
        "index":3,
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
        "userRequest":["pesquise no google", "pesquisar no google", "googleit", "consulte no google", "consultar no google", "consulta no google"],
        "botResponses":"success",
        "action" : function(msgQuery){
                        var quote = getQuoteInStr(msgQuery);
                        if (quote==null){
                            $chatBotDialog.innerHTML += BOTLABEL +"Desculpa, mas o que gostaria de pesquisar? Certifique-se de colocar os termos da pesquisa entre aspas.";
                            $chatBotDialog.scroll(0,scrollPos)
                        }else{
                            window.open("http://www.google.com.br/search?q="+quote,"blank")
                            $chatBotDialog.innerHTML += BOTLABEL + "Ok. Você deve ter percebido que abri a consulta em outra janela.";
                            $chatBotDialog.scroll(0,scrollPos)
                        }
                    }
    },
    {
        "index":2,
        "description":"comando",
        "nameBehaviour":"PesquisaYoutube",
        "userRequest":["toque no youtube", "abra no youtube", "consulte no youtube", "ouvir", "tocar", "youtube", "play no youtube", "tocar no youtube", "procure no youtube", "veja no youtube"],
        "botResponses":"success",
        "action" : function(msgQuery){
                        var quote = getQuoteInStr(msgQuery);
                        if (quote==null){
                            $chatBotDialog.innerHTML += BOTLABEL +"Desculpa, mas o que gostaria de tocar? Certifique-se de colocar o nome da banda ou música entre aspas.";
                            $chatBotDialog.scroll(0,scrollPos)
                        }else{
                            quote.replace(" ","+");
                            window.open("https://www.youtube.com/results?search_query="+quote,"blank")
                            $chatBotDialog.innerHTML += BOTLABEL + "Ok. Você deve ter percebido que abri o youtube em outra janela.";
                            $chatBotDialog.scroll(0,scrollPos)
                        }
                    }
        },
    {
        "index":3,
        "description":"comando",
        "nameBehaviour":"TocarJazz no Youtube",
        "userRequest":["playlist jazz"],
        "botResponses":"success",
        "action" : function(msgQuery){
                        // var quote = getQuoteInStr(msgQuery);
                        // if (quote==null){
                        //     $chatBotDialog.innerHTML += BOTLABEL +"Desculpa, mas o que gostaria de tocar? Certifique-se de colocar o nome da banda ou música entre aspas.";
                        //     $chatBotDialog.scroll(0,scrollPos)
                        // }else{
                        //     quote.replace(" ","+");
                        // debugger;
                            window.open("https://www.youtube.com/watch?v=_sI_Ps7JSEk","blank")
                            $chatBotDialog.innerHTML += BOTLABEL + "Ok. Você deve ter percebido que abri o youtube em outra janela. Espero que tenha gostado!";
                            $chatBotDialog.scroll(0,scrollPos)
                        // }
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
    var isValidRequest;

    isValidRequest=searchValuesInMsg(botCommands,"userRequest",msgReq);  //procura se pelo menos um elemento da propriedade userRequest do objeto botComands pode ser encontrado na mensagem do usuário

    if(isValidRequest[0]){
        debugger;
        isValidRequest[1].action(msgReq);
        // botCommands[isValidRequest[1]].action(msgReq);
        return true;
    };
}

function hasGreetings(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;

    isValidRequest = searchValuesInMsg(botBehaviour,"userRequest",msgReq, "nameBehaviour", "cumprimento");

    if(isValidRequest[0]==true){
        return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }
}

function hasFarewell(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;

    debugger;
    isValidRequest = searchValuesInMsg(botBehaviour,"userRequest",msgReq,"nameBehaviour","despedida");

    if(isValidRequest[0]==true){
        return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }
}

function hasThanks(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;

    debugger;
    isValidRequest = searchValuesInMsg(botBehaviour,"userRequest",msgReq,"nameBehaviour","agradecimento");

    if(isValidRequest[0]==true){
        return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }
}


function getBotResponse(entity){
    return getRandomItem(entity.botResponses);
}

// function getBotResponse(msgReq, entity){
//     var isValidRequest = entity.userRequest.some(function(el, i){
//         return el == msgReq;
//     });

//     if (isValidRequest){
//         return getRandomItem(entity.botResponses);
//     } else {
//         return null;
//     }
// }



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