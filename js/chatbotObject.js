//NÍVEIS DE BUSCA
// 1º Por hashatg: lê o campo hashtags e procura no texto digitado
// 2º Varre todo o elemento e procura se a chave Key está contida literalmente no texto digitado
// 3º Agrupa conjunto de 3 palavras no texto digitado e procura na chave Body do elemento
// 4º Pasa o dicionário no  conjunto de 3 palavras do texto digitado e procura na chave Body do elemento
// 5º Reordena o conjunto de três palavras e procura na chave Body do elemento
// 6º Passa o dicionário no conjunto reaordenaso de três palavras e procura na chave Body do elemento

//STATUS
var botStatus = new Map();
botStatus.set("idle",1);
botStatus.set("await",2);

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
    },
    {
        "index":4,
        "description":"Objeto com interações de erro na compreensão",
        "nameBehaviour":"erro na compreensão",
        "userRequest":["voce nao entendeu", "entendeu errado", "nao foi isso que quis dizer", "nao foi isso que eu quis dizer", "nao foi isso o que eu quis dizer", "nao era isso que eu queria", "nao era isso o que eu queria", "me expressei errado", "me expressei mal", "mal entendido", "esta equivocado", "me equivoquei", "voce esta enganado", "nao atendeu ao que eu queria", "nao atendeu ao que eu procurava", "nao era o que eu procurava", "nao e o que me interessa"],
        "botResponses":["Desculpe-me. Talvez eu não tenha entendido muito bem. Por favor, tente fazer a pergunta novamente, utilizando palavras mais significativas."],
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
            $chatBotDialog.innerHTML="<div style='border: solid 1px rgba(0,0,0,.2); width:75%; height: auto; margin: 3% auto 0 0;border-radius: 10px; padding: 1% 2%;'><p style='font-weight: bold; color: #040242; margin: 3% 0 0 0; padding:0;'>Helper:</p>Olá, em que possoa ajudar? Caso deseje um suporte mais especializado, selecione o atendente clicando no avatar.</div>" +
                                        "<div id='spinner-container'><div class='lds-ellipsis lds-ellipsis-hide'><div></div><div></div><div></div><div></div></div></div>";
            toggleSpinner();
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
//Retorna uma string como resultado --> elemento 0 a string de resposta, elemento 1 a qtd de itens encontrados
function searchByHashatg(msgReq){   //Retona uma array com 2 elementos. O primeiro, string com resposta, o segundo um array de tabelas, se tiver encontrado mais de 1 resultado
    var isValidRequest;
    var i = 0;
    var botAnswer=""; //"<p>Consegui encontrar o(s) seguintes(s) resultado(s):<p>";
    var tableResult;
    var setOfTablesResult=[];

    isValidRequest = searchValuesInMsg(msgReq,robotDBWiki, "Hashtags", "Active", true, true);
    // isValidRequest = searchValuesInMsg(msgReq,wikiContents, "Hashtags", "Active", true, true);

    if (isValidRequest[0]==true){    
        if (isValidRequest[1].length==1){
            botAnswer = "<p>Ok, encontrei o seguinte resultado:</p>" + buildAnswerResult(isValidRequest[1][0]);
        }else{        
            for (i=0; i<=isValidRequest[1].length-1;i++){
                tableResult = buildTableResult("wikiContents", isValidRequest[1][i].Index, isValidRequest[1][i].Title, isValidRequest[1][i].Description, "Inc: " + isValidRequest[1][i].DateUpload + " | ID: " + isValidRequest[1][i].Id);
                setOfTablesResult.push(tableResult);
            }
            botAnswer += "<p>Consegui encontrar o(s) seguintes(s) resultado(s):</p>";
        }
        return [botAnswer, setOfTablesResult];
        // return [botAnswer, isValidRequest[1].length];
    }else{
        return ["Desculpe-me, não consegui encontrar nenhum assunto com esse marcador.", 0];
    }
}

function hasCommand(msgReq){
    var isValidRequest;

    isValidRequest= searchValuesInMsg(msgReq, botCommands,"userRequest", "enabled", true);  //procura se pelo menos um elemento da propriedade userRequest do objeto botComands pode ser encontrado na mensagem do usuário

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
    }else{
        return false;
    }

    return processBotResponse;
}

function hasMissUnderstand(msgReq){ //Verifica se há cumprimento e retorna uma das respostas programadas em Response
    var isValidRequest;
    var i=0;
    var processBotResponse="";

    debugger;

    isValidRequest = searchValuesInMsg(msgReq, botBehaviour,"userRequest", "nameBehaviour", "erro na compreensão", true);

    if(isValidRequest[0]==true){
        for(i=0;i<=isValidRequest[1].length-1;i++){
            processBotResponse += BOTLABEL + toggleBotSex(getBotResponse(isValidRequest[1][i]));
        }
    }else{
        return false;
    }

    return processBotResponse;
}

function startSearching(msgReq){    //retorna um array. Elemento 0 = quantidade itens econtrados / Elemento 1 = resposta (se qtd elementos <=1)
                                                                                                //Ou conjunto de tabelas, se qtd resultado entre 2 e 5
    var processBotResponse = [];
    var tableResult="";
    var setOfTablesResult=[];
    var i=0;
    var iLimitReturnItens=0;
    var resultSearch = searchContentFromMsg(msgReq, robotDBWiki); //receberá um array contendo cada elemento encontrado e seu score proporcional
    
    processBotResponse[0]= resultSearch.length;

    debugger;
    
    if (resultSearch.length<=0){ //Se não encontrou nenhum elemento
        processBotResponse[1]="Desculpa, não consegui encontrar nada a respeito. Tente ser um pouco mais preciso ou mencionar palavras mais relevantes sobre o assunto que deseja tratar. Talvez em uma busca por hashtag eu consiga encontrar algo mais exato. Verifique também se minha especialidade está adequada ao assunto em questão."
    } else if (resultSearch.length==1){ //Se encontrou apenas 1 elemento
        processBotResponse[1]= "Certo, creio que encontrei algo relacionado. A única coisa que consegui identificar com base na sua mensagem foi essa: ";
        processBotResponse[1]+=buildAnswerResult(resultSearch[0][1]);
    } else if (resultSearch.length>1){ //se encontrou mais de dois itens
        resultSearch.length<=5 ? iLimitReturnItens=resultSearch.length-1 : iLimitReturnItens=4;
        for (i=iLimitReturnItens; i>=0;i--){ //Monta o conjunto de tabelas, em ordem crescente de significância (maior score proporcional para o menor)
            tableResult = buildTableResult("wikiContents", resultSearch[i][1].Index, resultSearch[i][1].Title, resultSearch[i][1].Description, "Inc: " + resultSearch[i][1].DateUpload + " | ID: " + resultSearch[i][1].Id);
            setOfTablesResult.push(tableResult);
        }
        processBotResponse[1]=setOfTablesResult;
    }

    
    
    //se encontrou mais de 5 elementos

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


// CONSTRUINDO UMA RESPOSTA ENCONTRADA NO BANCO
function buildAnswerResult(itemObjeto){
    var answer= "";
    var links = "";
    var hashtags="";
    var i;

    for (i=0;i<=itemObjeto.Link.length-1;i++){
        links += "<a href='" + itemObjeto.Link[i] + "' target='_blank'>" + itemObjeto.Link[i] + "</a><br>";
    }

    for (i=0;i<=itemObjeto.Hashtags.length-1;i++){
        hashtags += itemObjeto.Hashtags[i] + " ";
    }
    
    answer = "<p style='font-weight: bold;'>" + itemObjeto.Title + "</p>";
    answer += "<p><i>" + itemObjeto.Description + "</i></p>";
    answer += "<p>" + itemObjeto.Body + "</p>";
    answer += "<hr style='border: solid 1px black; width: 50%; margins: 0 auto'></br>"
    answer += "Categoria: " + itemObjeto.Category + "</br>";
    answer += "Segmento: " + itemObjeto.Segment + "</br>";
    answer += "Hashtags: " + hashtags + "</br>";
    answer += "Links: " + links + "</br>";
    answer += "Data inclusão: " + itemObjeto.DateUpload + "</br>";
    answer += "ID: " + itemObjeto.Id + "</br>";

    return answer;


}
