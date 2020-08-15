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

//BANCO AUXÍLIAR DE INFORMAÇÕES (CARREGAMENTO NA MEMÓRIA PRECEDENTE)
var memMusicStyles = {
        "jazz": ["https://www.youtube.com/watch?v=_sI_Ps7JSEk","https://www.youtube.com/watch?v=eXNggLMo5nE&t=2960s","https://www.youtube.com/watch?v=neV3EPgvZ3g"],
        "rock": ["https://www.youtube.com/watch?v=IDZ6GXRH7ss","https://www.youtube.com/watch?v=35lcD_G8pWc","https://www.youtube.com/watch?v=G_yvBTFzngE","https://www.youtube.com/watch?v=RZdy_e-vJYA","https://www.youtube.com/watch?v=4MgzOfhxC88","https://www.youtube.com/watch?v=26nsBfLXwSQ","https://www.youtube.com/watch?v=C8Ne6MUseaY&t=23s","https://www.youtube.com/watch?v=kI4dUyuvPTk"]
    };



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
        "botResponses":["Aqui tudo ótimo! Obrigad$$$@@@ por ter me chamado.", "Tudo bem comigo. Espero que eu possa ser útil", "Tudo bem, obrigad$$$@@@ por perguntar. Se precisar de algo, é só falar."],
        "action" : ""
    },
    {
        "index":2,
        "description":"Objeto com interações de despedida",
        "nameBehaviour":"despedida",
        "userRequest":["tchau", "xau", "xauxixa", "xuazinho", "tchauzinho", "bye", "byebye", "bye bye", "te mais", "ate mais", "ate logo", "te logo", "ate a proxima", "te a proxima", "adeus", "fica com deus"],
        "botResponses":["Foi uma alegria ter ajudado. Até a próxima!", "Fico agradecid$$$@@@ por ter ajudado. Até breve!"],
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
        "instructions" : "Digite: <i>limpe a tela</i>.",
        "sample" : "limpe a tela",
        "userRequest":["limpe a tela", "limpar tela", "cls", "clear", "limpar a tela"],
        "botResponses":"success",
        "enabled" : true,
        "action" : function(){
            $chatBotDialog.innerHTML="";
        }
    },
    {
        "index":1,
        "description":"comando",
        "nameBehaviour":"PesquisaGoogle",
        "instructions" : "Digite: <i>pesquise no google \"termo da busca\"</i> . Observação: use as aspas.",
        "sample" : "pesquise no google \"Helder Hermani\".",
        "userRequest":["pesquise no google", "pesquisar no google", "googleit", "consulte no google", "consultar no google", "consulta no google"],
        "botResponses":"success",
        "enabled" : true,
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
        "instructions" : "Digite: <i>youtube \"nome da banda ou música\"</i>.  Observação: use as aspas.",
        "sample":"youtube \"Pink Floyd\"",
        "userRequest":["youtube", "abra no youtube", "consulte no youtube", "toque no youtube", "play no youtube", "tocar no youtube", "procure no youtube", "veja no youtube"],
        "botResponses":"success",
        "enabled" : true,
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
        "nameBehaviour":"Tocar Playlist no Youtube",
        "instructions" : "Digite: <i>playlist \"estilo musical\"</i>.  Observação: use as aspas.",
        "sample": "playlist \"rock\"",
        "userRequest":["playlist"],
        "botResponses":"success",
        "enabled" : true,
        "action" : function(msgQuery){
                        var quote = getQuoteInStr(msgQuery);
                        var linkMusicAddress=""

                        if (quote==null){
                            $chatBotDialog.innerHTML += BOTLABEL +"Desculpa, mas o que estilo de música gostaria de ouvir? Certifique-se de colocar o nome do estilo entre aspas.";
                            $chatBotDialog.scroll(0,scrollPos)
                        }else{
                            debugger;
                            if (quote=="jazz"){linkMusicAddress=getRandomItem(memMusicStyles.jazz)};
                            if (quote=="rock"){linkMusicAddress=getRandomItem(memMusicStyles.rock)};
                            window.open(linkMusicAddress,"blank");
                            $chatBotDialog.innerHTML += BOTLABEL + "Ok. Você deve ter percebido que abri o youtube em outra janela. Espero que tenha gostado!";
                            $chatBotDialog.scroll(0,scrollPos)
                        }
        }
    }
];

// ================================IMPLEMENTAÇÃO DOS COMANDOS NA TELA DE AJUDA=================================
buildHelpScreen();
function buildHelpScreen(){
    var i=0;
    var n=0;
    var auxStr="";
    var commandLine=[];
    var divCommandsContainer = document.createElement("div");

    divCommandsContainer.classList.add("containerHelp");
    

    for(i=0;i<=botCommands.length-1;i++){
        auxStr="";
        commandLine[i]=document.createElement("p");
        commandLine[i].innerHTML = "<b>" + botCommands[i].userRequest[0] + "</b> : " + botCommands[i].instructions + " <u>Use também:</u><br>";
        debugger;
        for (n=0;n<=botCommands[i].userRequest.length-2;n++){
            auxStr += botCommands[i].userRequest[n+1] + ", ";
        }

        var sample = document.createElement("spam");
        sample.classList.add("commandsSample");
        sample.innerHTML = "Exemplo: " + botCommands[i].sample;

        commandLine[i].innerHTML += auxStr;

        commandLine[i].appendChild(sample);

        divCommandsContainer.appendChild(commandLine[i]);
    }

    $frameHelp.appendChild(divCommandsContainer);
}

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

    isValidRequest=searchValuesInMsg(msgReq, botCommands,"userRequest", "enabled", true);  //procura se pelo menos um elemento da propriedade userRequest do objeto botComands pode ser encontrado na mensagem do usuário

    if(isValidRequest[0]){
        isValidRequest[1][0].action(msgReq);
        // isValidRequest[1].action(msgReq);
        // botCommands[isValidRequest[1]].action(msgReq);
        return true;
    };
}

function hasGreetings(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;
    var i=0;
    var processBotResponse="";

    isValidRequest = searchValuesInMsg(msgReq, botBehaviour,"userRequest", "nameBehaviour", "cumprimento", true);

    if(isValidRequest[0]==true){
        for(i=0;i<=isValidRequest[1].length-1;i++){
            processBotResponse += BOTLABEL + toggleBotSex(getBotResponse(isValidRequest[1][i]));
        }
        // return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }

    return processBotResponse;
}

function hasFarewell(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;
    var i=0;
    var processBotResponse="";

    isValidRequest = searchValuesInMsg(msgReq, botBehaviour,"userRequest", "nameBehaviour", "despedida", true);

    if(isValidRequest[0]==true){
        for(i=0;i<=isValidRequest[1].length-1;i++){
            processBotResponse += BOTLABEL + toggleBotSex(getBotResponse(isValidRequest[1][i]));
        }
        // return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }

    return processBotResponse;
}

function hasThanks(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;
    var i=0;
    var processBotResponse="";

    isValidRequest = searchValuesInMsg(msgReq, botBehaviour,"userRequest", "nameBehaviour", "agradecimento", true);

    if(isValidRequest[0]==true){
        for(i=0;i<=isValidRequest[1].length-1;i++){
            processBotResponse += BOTLABEL + toggleBotSex(getBotResponse(isValidRequest[1][i]));
        }
        // return getBotResponse(isValidRequest[1]);
    }else{
        return false;
    }

    return processBotResponse;
}


function getBotResponse(entity){
    return getRandomItem(entity.botResponses);
}

function toggleBotSex(botAnswer){
    if (botSex=="m"){
        return botAnswer.replace("$$$@@@","o");
    }else{
        return botAnswer.replace("$$$@@@","a");
    }
}