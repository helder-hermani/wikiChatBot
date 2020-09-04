//NÍVEIS DE BUSCA
// 1º Por hashatg: lê o campo hashtags e procura no texto digitado
// 2º Varre todo o elemento e procura se a chave Key está contida literalmente no texto digitado
// 3º Agrupa conjunto de 3 palavras no texto digitado e procura na chave Body do elemento
// 4º Pasa o dicionário no  conjunto de 3 palavras do texto digitado e procura na chave Body do elemento
// 5º Reordena o conjunto de três palavras e procura na chave Body do elemento
// 6º Passa o dicionário no conjunto reaordenaso de três palavras e procura na chave Body do elemento


//INICIALIZADORES
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
        "botResponses":["Olá, " +currentShift + "! Que bom ter você aqui. Em que posso ajudar?", "Oi, " + currentShift + "! Que bom você confiar em mim! O que desejas saber?"],
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
        "label" : "Limpar a tela",
        "instructions" : "Digite: <i>limpe a tela</i>.",
        "sample" : "limpe a tela",
        "userRequest":["limpe a tela", "limpar tela", "cls", "clear", "limpar a tela"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "",
        "isTool" : false,
        "selfexec": function(){},
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
        "label" : "Pesquisar no Google",
        "instructions" : "Digite: <i>pesquise no google \"termo da busca\"</i> . Observação: use as aspas.",
        "sample" : "pesquise no google \"Helder Hermani\".",
        "userRequest":["pesquise no google", "pesquisar no google", "googleit", "consulte no google", "consultar no google", "consulta no google"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "",
        "isTool" : false,
        "selfexec": function(){},
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
        "label" : "Abrir no YouTube",
        "instructions" : "Digite: <i>youtube \"nome da banda ou música\"</i>.  Observação: use as aspas.",
        "sample":"youtube \"Pink Floyd\"",
        "userRequest":["youtube", "abra no youtube", "consulte no youtube", "toque no youtube", "play no youtube", "tocar no youtube", "procure no youtube", "veja no youtube"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "",
        "isTool" : false,
        "selfexec": function(){},
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
        "label" : "Tocar playlist no YouTube",
        "instructions" : "Digite: <i>playlist \"estilo musical\"</i>.  Observação: use as aspas.",
        "sample": "playlist \"rock\"",
        "userRequest":["playlist"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "",
        "isTool" : false,
        "selfexec": function(){},
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
    },
    {
        "index":4,
        "description":"comando",
        "nameBehaviour":"Gerar exclusão de lançamento futuro de habitação",
        "label" : "Exclusão lçto futuro Habitação",
        "instructions" : "Digite: <i>exlc hab</i> ou <i>excluir lançamento futuro habitação</i>",
        "sample": "excl hab",
        "userRequest":["excl hab", "excluir lançamento futuro habitação"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "../assets/icons/file-excel-regular.svg",
        "isTool" : true,
        "selfexec": function(){
            $chatBotPrompt.value = this.userRequest[0]
            $chatBotPrompt.focus();
        },
        "action" : function(){
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe o número do contrato, com o dígito:";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("rptExclLctoFuturoHabNumContrato");
        }
    },
    {
        "index":5,
        "description":"comando",
        "nameBehaviour":"Gerar formulário de alteração de dados do usuário CaixaTem.",
        "label" : "CaixaTem - Form. atualização",
        "instructions" : "Digite: <i>usr caixatem</i> ou <i>gerar formulario caixatem</i>",
        "sample": "usr caixatem",
        "userRequest":["usr caixatem", "gerar formulario caixatem", "emitir formulario caixatem"],
        "botResponses":"success",
        "enabled" : true,
        "iconUrl" : "../assets/img/caixatem.jpg",
        "isTool" : true,
        "selfexec": function(){
            $chatBotPrompt.value = this.userRequest[0]
            $chatBotPrompt.focus();
        },
        "action" : function(){
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe o número da conta, com dígito, no formato XXXXXXXXXXXXX-X (não informar agência ou produto):";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getAccount");
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
        "checkResponse" : function(userAnswer){},
        "positiveAction":function (){},
        "negativeAction":function (){},
        "unsureAction":function (){},
        "defaultAction":function(){}
    },
    {
        "index":1,
        "nameAction":"startAlleatoryChat",
        "description": "Espera o usuário responder se deseja iniciar conversa aleatória",
        "botsentRequest": ["Em todo caso, tenho assuntos pra conversar. Está a fim de bater um papo?"],
        "positiveResponses":["sim", "claro que sim", "agora", "obviamente"],
        "negativeResponses":["nao", "claro que nao", "absolutamente", "de jeito nenhum"],
        "unsureResponses": ["talvez", "depende", "quem sabe", "pode ser", "vou ver", "vou pensar", "Vou decidir", "o que voce sabe", "sobre o que", "que quer conversar"],
        "checkResponse" : function(userAnswer){
            if (isCancel(userAnswer)){
                quitAwaitMode();
                return;
            }
            botComandsCheckAnswer(userAnswer,this);
        },
        "positiveAction":function (){
            $chatBotDialog.innerHTML += BOTLABEL + "Ah, muleque!</div>"
            setIdleMode();
        },
        "negativeAction":function (){
            console.log("Não quer conversa?");
        },
        "unsureAction":function (){
            console.log("Ô caba indeciso!");
        },
        "defaultAction":function(){
            console.log("Ação default a decidir!");
        }
    },
    {
        "index":2,
        "nameAction":"rptExclLctoFuturoHabNumContrato",
        "description": "Espera que o usuário responda o número do contrato para gerar guia de exclusão do lançamento futuro.",
        "botsentRequest": ["Informe o número do contrato, com o dígito:"],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
            if (isCancel(userAnswer)){
                quitAwaitMode();
                return;
            }
            var numContrato;
            if (userAnswer.length!=13 || isNaN(userAnswer)){
                $chatBotDialog.innerHTML += BOTLABEL +"O valor informado não corresponde a um número válido. O contrato deve ter doze números e o dígito verificador, no formato XXXXXXXXXX-X. Caso deseje continuar, repita o comando.";
                setIdleMode();
            }else{
                currentAwaitDemandItem = setAwaitMode("rptExclLctoFuturoHabNumContrato");
                numContrato = formatAccountNumber(userAnswer);
                $chatBotDialog.innerHTML += BOTLABEL + "Deseja capturar os lançamentos do Rede Caixa? Caso não deseje, será solicitado os dados do lançamento manualmente. Deseja capturar?";
                currentAwaitDemandItem = setAwaitMode("choiceRedeCaixaExclLctoFutCapture");
            }
        },
        "positiveAction":function (){},
        "negativeAction":function (){},
        "unsureAction":function (){},
        "defaultAction":function(){}
    },
    {
        "index":3,
        "nameAction":"choiceRedeCaixaExclLctoFutCapture",
        "description": "Verifica se deseja capturar do rede caixa os lançamentos futuro habitacionais para exclusão.",
        "botsentRequest": ["Deseja capturar as telas do Rede Caixa?"],
        "positiveResponses":["sim", "ok", "claro"],
        "negativeResponses":["nao", "de jeito nenhum"],
        "unsureResponses": ["talvez", "nao sei", "pode ser"],
        "checkResponse" : function(userAnswer){
            if (isCancel(userAnswer)){
                quitAwaitMode();
                return;
            }
            botComandsCheckAnswer(userAnswer,this);
        },
        "positiveAction":function (){
            $chatBotDialog.innerHTML += BOTLABEL + "Ok, vamos capturar os dados.</div>"
        },
        "negativeAction":function (){
            $chatBotDialog.innerHTML += BOTLABEL + "Ok, por favor me informe os dados.</div>"
        },
        "unsureAction":function (){
            $chatBotDialog.innerHTML += BOTLABEL + "Bom, como você não tem certeza, voltarei para meu estado inicial.</div>"
            setIdleMode();
        },
        "defaultAction":function(){
            $chatBotDialog.innerHTML += BOTLABEL + "Bom, como você não tem certeza, voltarei para meu estado inicial.</div>"
            setIdleMode();
        }
    },
    {
        "index":4,
        "nameAction":"caixaTemForm-getAccount",
        "description": "Recebe número da conta NSGD para gerar formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("unidMov","3880"); 
                    localStorage.setItem("operProd","1288"); 
                    localStorage.setItem("conta",formatAccountNumber(userAnswer)); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe o tipo de documento de identificação:";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getRGType");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":5,
        "nameAction":"caixaTemForm-getRGType",
        "description": "Recebe tipo de RG para gerar formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("RGTipo", userAnswer.toUpperCase()); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe o número do documento de identidade:";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getRGNumber");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":6,
        "nameAction":"caixaTemForm-getRGNumber",
        "description": "Recebe o número do RG para gerar formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("RGNumero", userAnswer.toUpperCase()); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe o órgão emissor do documento de identidade:";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getRGIssuer");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":7,
        "nameAction":"caixaTemForm-getRGIssuer",
        "description": "Recebe o órgão emissor do RG para gerar formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("RGEmissor", userAnswer.toUpperCase()); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe a data de emissão do documento de identidade:";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getRGDateIssue");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":8,
        "nameAction":"caixaTemForm-getRGDateIssue",
        "description": "Recebe a data de emissão do RG para gerar formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("RGDataEmissao", userAnswer); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Informe a cidade de assinatura:";
                    $chatBotPrompt.value = "João Pessoa";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getCity");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":9,
        "nameAction":"caixaTemForm-getCity",
        "description": "Recebe a cidade de assinatura do formulário na geraração do formulário de alteração de cadastro no CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    localStorage.setItem("local", userAnswer.toUpperCase() + ", "); 
                    $chatBotDialog.innerHTML += BOTLABEL +"Agora cole aqui a tela do cadastro de usuário no CaixaTem (na tela do cadastro, pressione CTRL + A para selecionar tudo, CTRL + C para copiar, e cole aqui, na nossa caixa de diálogo).";
                    $chatBotDialog.scroll(0,scrollPos);
                    currentAwaitDemandItem = setAwaitMode("caixaTemForm-getFormScreen");
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
        }
    },
    {
        "index":10,
        "nameAction":"caixaTemForm-getFormScreen",
        "description": "Captura os dados da tela de usuários do CaixaTem para gerar o formulário de alteração de usuários do CaixaTem.",
        "botsentRequest": [],
        "positiveResponses":[],
        "negativeResponses":[],
        "unsureResponses": [],
        "checkResponse" : function(userAnswer){
                    if (isCancel(userAnswer)){
                        quitAwaitMode();
                        return;
                    }
                    var resultScreen = getCaixaTemScreenFields(userAnswer);
                    
                    localStorage.setItem("CPF",resultScreen.CPF);
                    localStorage.setItem("titular",resultScreen.Nome);
                    localStorage.setItem("fone",resultScreen.Fone);
                    localStorage.setItem("CEP",resultScreen.CEP);
                    localStorage.setItem("email",resultScreen.Email);
                    localStorage.setItem("dia",resultScreen.Dia);
                    localStorage.setItem("mes",resultScreen.Mes);
                    localStorage.setItem("ano",resultScreen.Ano);

                    localStorage.setItem("rptName","rptFormCaixaTem");
                    window.open("../reports/report.html","_blank");


                    $chatBotDialog.innerHTML += BOTLABEL +"Abri o formulário em outra janela. Caso necessário, os campos preenchidos podem ser editados no próprio formulário.";
                    $chatBotDialog.scroll(0,scrollPos);
                    setIdleMode();
        },
        "positiveAction":function (){
        },
        "negativeAction":function (){
        },
        "unsureAction":function (){
        },
        "defaultAction":function(){
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


// ================================IMPLEMENTAÇÃO DOS COMANDOS NA TELA DE FERRAMENTAS=================================
buildToolsScreen();
function buildToolsScreen(){
    var i =0;
    var commandItens = botCommands.filter(function(el){
        return el.enabled == true &&  el.isTool == true;
    })

    for(i=0;i<=commandItens.length-1;i++){
        var $lineTool = document.createElement("div");
        var $img = document.createElement("img");
        var $toolLabel = document.createElement("p"); 

        $img.classList.add("divAtendente-ColorPattern");
        $toolLabel.classList.add("p-tools-label");
        $lineTool.classList.add("div-tools-line");
        $lineTool.id = commandItens[i].index;
        
        $img.setAttribute("src",commandItens[i].iconUrl);
        $toolLabel.innerHTML = commandItens[i].label;

        $lineTool.appendChild($img);
        $lineTool.appendChild($toolLabel);

        $lineTool.addEventListener("click", (evt)=>{
            debugger;
            botCommands[parseInt(evt.currentTarget.id)].selfexec();
            closeAllFloatingFrames();
        })
    
        $frameTools.appendChild($lineTool);
    }
    
}

// ================================VALIDAÇÃO DE CAMPOS PARA INCLUSÃO/ALTERAÇÃO DE CONTEUDO=================================
function validateReqFields(){
    var $reqFields = document.querySelectorAll("input[required]");
    var i=0;
    var error=false;

    //Validação do select segmento
    if (error==false){
        if($selSegment.value.trim()==""){
            error=true;
            $selSegment.classList.add("requiredField");
            $selSegment.focus();
        }else{
            error=false;
            $selSegment.classList.remove("requiredField");
        }
    }

    //Validação dos campos required
    if (error==false){
        for(i=0;i<=$reqFields.length-1;i++){
            if ($reqFields[i].value.trim()==""){
                error=true;
                $reqFields[i].classList.add("requiredField");
                $reqFields[i].focus();
                break;
            }else{
                error=false;
                $reqFields[i].classList.remove("requiredField");
            }
        }
    }

    //Validação do editor de conteúdo
    if (error==false){
        if($bodyContent.innerHTML.trim()==""){
            error=true;
            $bodyContent.classList.add("requiredField");
            $bodyContent.focus();
        }else{
            error=false;
            $bodyContent.classList.remove("requiredField");
        }
    }

    return !error;
}

// ================================FILE SAVER - SALVAR NOVA BASE DE DADOS (JSON)=================================

function saveJSONDataBase() {
    // let texto = document.getElementById("texto").value;
    // let titulo = document.getElementById("titulo").value;
    let blob = new Blob([$divPreSavedContent.textContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "conteudowiki.js");
 }



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

    // debugger;

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

    // debugger;
    
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

function setIdleMode(){
    botCurrentStatus = botStatus.get("idle");
    $chatBotAvatarStatus.textContent="Disponível...";
}

function setAwaitMode(nameAction){
    botCurrentStatus = botStatus.get("await");
    $chatBotAvatarStatus.textContent="Esperando...";

    var elementReturn = botDemands.filter(function(el){
        return el.nameAction == nameAction;
    })

    return elementReturn[0];
}

function botComandsCheckAnswer(userAnswer, comandObj){
var isDefault = true;
    userAnswer = sanitizeMsgFull(userAnswer);

    var isPositive = comandObj.positiveResponses.filter(function(el){
        return sanitizeMsgFull(el) == userAnswer;
    });
    isPositive = isPositive.length;

    var isNegative = comandObj.negativeResponses.filter(function(el){
        return sanitizeMsgFull(el) == userAnswer;
    });
    isNegative = isNegative.length;

    var isUnsure = comandObj.unsureResponses.filter(function(el){
        return sanitizeMsgFull(el) == userAnswer;
    });
    isUnsure = isUnsure.length;

    if (isPositive){
        comandObj.positiveAction();
    }else if(isNegative){
        comandObj.negativeAction();
    }else if (isUnsure){
        comandObj.unsureAction();
    }else{
        comandObj.defaultAction();
    }
}

function isCancel(msg){
    if (msg == "cancelar" || msg == "cancel" || msg == "cancela" || msg == "cancele" || msg == "desistir" || msg == "desista" || msg == "desisti" || msg == "desiste" || msg == "abortar" || msg == "aborta" || msg == "aborte" || msg == "sair" || msg == "saia"){
        return true;
    }else{
        return false;
    }
}

function quitAwaitMode(){
    $chatBotDialog.innerHTML += BOTLABEL + "Ok, cancelando o processamento. Voltado ao estado \"disponível\".</div>"
    setIdleMode();
}