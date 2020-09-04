// ================================INICIALIZADORES DE INTERFACE=================================
//STATUS
var botStatus = new Map();
botStatus.set("idle","Disponível...");
botStatus.set("await","Em espera da resposta...");
botStatus.set("edit","Aguardando exportação da base editada");

var currentAwaitDemandItem;
var responseBot="";
const SETALLEATORY = false;

var botSex = "m";
var botNameSection = "Helper";
// var botCurrentStatus = changeBotStatus("idle");
var botCurrentStatus = botStatus.get("idle");
var $spinner = document.querySelector(".lds-ellipsis");
var $main = document.querySelector("#main");
var $spinnerContainer = document.querySelector("#spinner-container");
var $chatbotSendMsgIcon = document.querySelector(".chatbot-icon-sendMsg");
var $chatBotDialog = document.querySelector("#chatbot-dialog");
var $chatBotPrompt = document.querySelector("#textChatbotPrompt");
var $chatBotAvatar = document.querySelector(".chatbot-header-avatar");
var $chatBotFrameChangeAvatar = document.querySelector("#frame-changeAvatar");

var $chatBotHeader = document.querySelector(".chatbot-header");
var $chatBotAvatarPic = document.querySelector(".robot-avatar-pic");
var $chatBotAvatarName = document.querySelector(".robot-name");
var $chatBotAvatarStatus = document.querySelector(".robot-activeStatus");
var $chatbotSettingsHelpIcon = document.querySelectorAll(".chatbot-icon-botSettingsHelp");

var $iconHelp = document.querySelector("#iconHelp");
var $frameHelp = document.querySelector("#frame-help");

var $iconTools = document.querySelector("#iconTools");
var $frameTools = document.querySelector("#frame-tools");


var $msgScreen = document.querySelector("#msgScreen");



var $iconSettings = document.querySelector("#iconSettings");
var $iconOkClose = document.querySelector("#iconOkClose");
var $contentNotFound = document.querySelector("#contentNotFound");
var $confirmationMsg = document.querySelector("#confirmationMsg");
var $frameSettings = document.querySelector("#frame-settings");
var $settingsAction = document.querySelector("#settingsAction");
var $serchIcon = document.querySelector(".icon-content-search");
var $txtID = document.querySelector("#txtId");
var $txtIndex = document.querySelector("#txtIndex");
var $selSegment = document.querySelector("#selSegment");
var $txtTitle = document.querySelector("#txtTitle");
var $txtDescription = document.querySelector("#txtDescription");
var $txtLinks = document.querySelector("#txtLinks");
var $txtHashtags = document.querySelector("#txtHashtags");
var $chkActive = document.querySelector("#chkActive");
var $txtDateUpdate = document.querySelector("#txtDateUpdate");
var $txtAuthor = document.querySelector("#txtAuthor");


var $btnSaveContent = document.querySelector("#btnSalvarContent");
var $btnExportContent = document.querySelector("#btnExportContent");
var $formContent = document.querySelector("#setting-div-form-content");
var $bodyContent = document.querySelector("#sampleeditor");

var $divPreSavedContent = document.querySelector(".div-preSavedContent");


var $itemResult=[];
var readytoAnswer=false;    //em implementação

var robotDBWiki = wikiContents;   //Base a ser pesquisada. ALterar ao alterar o atendente, conforme a propriedade Segment. Inicializa como toda a base.

var scrollPos = 10000;
var msgSent = "";
var prevMsg = "";
var botResponseSuccess = false;
const TIMELAGRESPONSE = 800;
const DATABASEPATH = "<p style='color: #FF0000;'>C:\\Users\\helde\\Documents\\<br>projetos_dev\\wikiepitacio\\js</p>";
const MSGINCLUDEDSUCESS = " com sucesso, porém a base de dados <b><u>NÃO</u></b> está atualizada. <p>Após concluir todas as ações desejadas, clique em \"Armazenar Banco\" e siga as instruções para armazenar as alterações de forma definitiva.</p>";
// const MSGINCLUDEDSUCESS = " com sucesso.<p>Salve o arquivo baixado na pasta:<p>" + DATABASEPATH + "</p> sem fazer qualquer alteração.<p>Se necessário, sobrescreva o arquivo anterior existente, ou salve-o como backup.</p>";
const USERLABEL = "<div style='border: solid 1px rgba(0,0,0,.2); width:75%; height: auto; margin: 3% 0 0 auto;border-radius: 10px; padding: 1% 2%;'><p style='font-weight: bold; color: #FF720C; margin: 0; padding:0;'>Você:</p>";
var BOTLABEL = "<div class='div-botLabel'><p style='font-weight: bold; color: #040242; margin: 3% 0 0 0; padding:0;'>" + botNameSection +":</p>";
const COMMANDINSTRUCTIONS = "<p>Digite uma pergunta ou um assunto que deseja saber. Utilize frases objetivas, contendo as palavras principais sobre o assunto de interesse. Exemplo: encerramento FIES.</p>"+
                            "<p>Pesquise também por hashtag. Exemplo: #encerramentofies</p>"+
                            "<p>Caso deseje, utilize também algum comando, para executar uma determinada ação. Lista de comandos:<p>";
                            


clearLocalStorage();


// ================================CRIAÇÃO DOS ATENDENTES - FLOATING MENU=================================
var botAtendentes = [
    {
        "index": 0,
        "name": "Helper Man",
        "alias": "Helper",
        "headColor" : "var(--bot-helper01-primary)",
        "borderColor":"#000000",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url('assets/img/avatar-man-tie.jpg')",
        "especialidade":"Habitação",
        "genre":"m",
        "segment": "habitação",
        "initial":false
    },
    {
        "index": 1,
        "name": "Helper Lady",
        "alias": "Helper",
        "headColor" : "var(--bot-helper02-primary)",
        "borderColor":"var(--bot-helper02-primary)",
        "fontcolor": "#000000",
        "opacity": 0.7,
        "avatarUrl" : "url('assets/img/avatar-woman.png')",
        "especialidade":"Pessoas Física",
        "genre":"f",
        "segment": "PF",
        "initial":false
    },
    {
        "index": 2,
        "name": "Helper Guy",
        "alias": "Helper",
        "headColor" : "var(--bot-helper03-primary)",
        "borderColor":"var(--bot-helper03-primary)",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url('assets/img/avatar-guy.png')",
        "especialidade":"Pessoa Jurídica",
        "genre":"m",
        "segment": "PJ",
        "initial":false
    },
    {
        "index": 3,
        "name": "Helper Girl",
        "alias": "Helper Girl",
        "headColor" : "var(--bot-helper04-primary)",
        "borderColor":"var(--bot-helper04-primary)",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url('assets/img/black-woman-avatar.jpg')",
        "especialidade":"Atendimento/Social",
        "genre":"f",
        "segment": "Social",
        "initial":false
    },
    {
        "index": 4,
        "name": "Helper Robot",
        "alias": "Helper Robot",
        "headColor" : "var(--bot-helper05-primary)",
        "borderColor":"var(--bot-helper05-primary)",
        "fontcolor": "#000000",
        "opacity": 0.7,
        "avatarUrl" : "url('assets/img/avatar-robot.jpg')",
        "especialidade":"Todos Segmentos",
        "genre":"m",
        "segment": false,
        "initial":true
    }
];

initAtendentes();

function initAtendentes(){
    var i=0;
    var n=0;
    var atendimentoDiv;
    var $atendimentoNewLine;
    var atendimentoAvatar;
    var atendimentoColorPattern;
    var atendimentoNameDiv;
    var atendimentoNameDivPName;
    var atendimentoNameDivPEsp;
    var atendimentoCheck;
    var divEl=[];
    var $linesAtendentes=[];
    var $checkIcons=[];

    //Montando o bot inicial
    var inicialBot = botAtendentes.filter(function(el){
        return el.initial==true;
    })

    buildBot(inicialBot[0].index);

    for (i=0;i<=botAtendentes.length-1;i++){
        atendimentoDiv = document.createElement("div");
        atendimentoDiv.classList.add("divAtendente-line");
        atendimentoDiv.id=i;

        atendimentoAvatar = document.createElement("div");
        atendimentoAvatar.classList.add("robot-avatar-pic");
        atendimentoAvatar.style.backgroundImage = botAtendentes[i].avatarUrl;

        atendimentoColorPattern = document.createElement("div");
        atendimentoColorPattern.classList.add("divAtendente-ColorPattern");
        atendimentoColorPattern.style.backgroundColor = botAtendentes[i].headColor;

        atendimentoNameDiv = document.createElement("div");
        atendimentoNameDivPName = document.createElement("p");
        atendimentoNameDivPEsp = document.createElement("p");
        atendimentoNameDivPName.style.fontSize="16px";
        atendimentoNameDivPName.textContent = botAtendentes[i].name;
        atendimentoNameDivPEsp.textContent =  botAtendentes[i].especialidade;
        // atendimentoNameDivPEsp.textContent = "(" + botAtendentes[i].especialidade +")";

        atendimentoNameDiv.appendChild(atendimentoNameDivPName);
        atendimentoNameDiv.appendChild(atendimentoNameDivPEsp);

        atendimentoNameDiv.classList.add("divAtendente-Name");

        atendimentoCheck = document.createElement("img");
        atendimentoCheck.setAttribute("src","/assets/icons/check-circle-regular.svg");
        atendimentoCheck.classList.add("divAtendente-check");

        atendimentoDiv.appendChild(atendimentoAvatar);
        atendimentoDiv.appendChild(atendimentoColorPattern);
        atendimentoDiv.appendChild(atendimentoNameDiv);
        atendimentoDiv.appendChild(atendimentoCheck);
        $chatBotFrameChangeAvatar.appendChild(atendimentoDiv);
    }
    
    //adicionando os eventos de seleção de bot/avatar
    $checkIcons = document.querySelectorAll(".divAtendente-check")
    $linesAtendentes = document.querySelectorAll(".divAtendente-line")

    for(i=0;i<=$linesAtendentes.length-1;i++){
        $linesAtendentes[i].addEventListener("click", function(evt){
            for (n=0;n<=$linesAtendentes.length-1;n++){
                $linesAtendentes[n].children[3].classList.remove("divAtendente-check-enabled");
                buildBot(parseInt(evt.currentTarget.id));
            }
            evt.currentTarget.children[3].classList.add("divAtendente-check-enabled");
        })
    }
}


// ================================CRIAÇÃO A JANELA (FRAME) DE AJUDA/HELP=================================
const textBody = document.createElement("p");
textBody.innerHTML = COMMANDINSTRUCTIONS;

$frameHelp.appendChild(textBody);


// ================================IMPLEMENTAÇÃO DAS OPÇÕES DE AÇÃO PARA INCREMENTO/ALTERAÇÃO DE CONTEÚDO=================================

buildSelOption($settingsAction, ROBOTWIKIACTIONS);




// ================================FORMULÁRIO DE INCLUSÃO DE CONTEÚDO (BOTÃO SETTINGS)=================================
buildSelOption($selSegment, SEGMENTOS);

function buildSelOption(selectElement, CONSTSOURCE){
    var i=0;
    // debugger;

    for(i=0;i<=CONSTSOURCE.length-1;i++){
        var $newOption = document.createElement("option");
        $newOption.textContent=CONSTSOURCE[i].description;
        $newOption.value=CONSTSOURCE[i].value;
        selectElement.appendChild($newOption);
    }
}

$settingsAction.addEventListener("change", function(){
    $serchIcon.classList.remove("icon-content-search-hide");
    $txtID.classList.add("txtReduced");
    $contentNotFound.classList.remove("contentNotFound-show");
    clearAllFormFields();
    disableAllFormFields();

    var selectedAction = ROBOTWIKIACTIONS.filter(function(el){
        return el.value == $settingsAction.value;
    })

    selectedAction[0].onChange();
})

$btnSaveContent.addEventListener("click", function(){
    var selectedAction = ROBOTWIKIACTIONS.filter(function(el){
        return el.value == $settingsAction.value;
    })

    selectedAction[0].onClick();
})


$btnExportContent.addEventListener("click", ()=>{
    exportDataBase();
    $confirmationMsg.innerHTML = "Informações exportadas com sucesso.<p>Após o download do arquivo conteudowiki.js, copie-o para a pasta:</p>" + DATABASEPATH + "sem fazer qualquer alteração.<p>Se necessário, sobrescreva o arquivo existente (ou salve-o como backup).</p>";
    showMsgScreen();
    // botCurrentStatus = botStatus.get("idle");
    botCurrentStatus = changeBotStatus("idle");
})


$serchIcon.addEventListener("click", function(){
    findRegisterWiki();
})

$txtID.addEventListener("keyup", function(evt){
    if(evt.keyCode==13){
        findRegisterWiki();
    }
})


$iconOkClose.addEventListener("click",()=>{
    $msgScreen.classList.remove("msgScreen-show");
    if (botCurrentStatus == botStatus.get("idle")){
        clickSettingsIcon();
    }else{
        clearAllFormFields();
        // debugger;
        // disableAllFormFields();
        disableAllFormFields([$btnExportContent]);
        $frameSettings.scroll(0,0);
    }
})



// ================================EVENTOS DE EXIBIÇÃO DAS TELAS ADICIONAIS (AVATAR/HELP/SETTINGS)=================================
$chatBotAvatar.addEventListener("click", function(){
    closeAllFloatingFrames($chatBotFrameChangeAvatar.id);
    $chatBotFrameChangeAvatar.classList.toggle("frame-float-show");
})

$iconHelp.addEventListener("click", function(){
    closeAllFloatingFrames($frameHelp.id);
    $frameHelp.classList.toggle("frame-float-show");
})

$iconTools.addEventListener("click", function(){
    closeAllFloatingFrames($frameTools.id);
    $frameTools.classList.toggle("frame-float-show");
})

$iconSettings.addEventListener("click", function(){
    if (botCurrentStatus == botStatus.get("edit")){
        exportDataBase();
        $confirmationMsg.innerHTML = "As alterações realizadas foram exportadas com sucesso.<p>Após o download do arquivo conteudowiki.js, copie-o para a pasta:</p><p>" + DATABASEPATH + "</p> sem fazer qualquer alteração.<p>Se necessário, sobrescreva o arquivo existente (ou salve-o como backup).</p>";
        showMsgScreen();
        botCurrentStatus = changeBotStatus("idle");
        // botCurrentStatus = botStatus.get("idle");
    }else if (botCurrentStatus == botStatus.get("idle")){
        clickSettingsIcon();
    }
})

$chatBotDialog.addEventListener("mouseover", function(){
    closeAllFloatingFrames();
})

// ================================FUNCOES ADICIONAIS========================================

function clickSettingsIcon(){
    $settingsAction.value="";
    $formContent.classList.remove("setting-div-form-content-show");
    clearAllFormFields();
    closeAllFloatingFrames($frameSettings.id);
    $frameSettings.classList.toggle("frame-float-show");
    $frameSettings.scroll(0,0);
}

function buildBot(indexBot){
    var x=0;

    $chatBotAvatarPic.style.backgroundImage = botAtendentes[indexBot].avatarUrl;
    // $chatBotAvatarPic.classList.add("abc");
    $chatBotHeader.style.backgroundColor = botAtendentes[indexBot].headColor;
    $chatBotHeader.style.border = "solid 1px " + botAtendentes[indexBot].borderColor;
    $chatBotAvatarName.children[0].style.color = botAtendentes[indexBot].fontcolor;
    $chatBotAvatarName.children[1].style.color = botAtendentes[indexBot].fontcolor;
    $chatBotAvatarName.children[1].textContent = botAtendentes[indexBot].especialidade;
    // $chatBotAvatarName.children[1].textContent = "(" + botAtendentes[indexBot].especialidade +")";
    $chatBotAvatarStatus.children[0].style.color = botAtendentes[indexBot].fontcolor;
    $chatBotFrameChangeAvatar.style.border = "solid 1px " + botAtendentes[indexBot].headColor;
    $chatBotFrameChangeAvatar.classList.remove("frame-float-show");
    $chatbotSendMsgIcon.style.fill = botAtendentes[indexBot].headColor;
    // $chatbotSendMsgIcon.style.backgroundColor = botAtendentes[indexBot].headColor;

    for (x=0;x<=$chatbotSettingsHelpIcon.length-1;x++){
        $chatbotSettingsHelpIcon[x].style.fill=botAtendentes[indexBot].fontcolor;
        $chatbotSettingsHelpIcon[x].style.opacity=botAtendentes[indexBot].opacity;
    }

    botSex=botAtendentes[indexBot].genre;
    botNameSection=botAtendentes[indexBot].name + " (" + botAtendentes[indexBot].especialidade + ")";
    BOTLABEL = "<div class='div-botLabel'><p style='font-weight: bold; color: #040242; margin: 3% 0 0 0; padding:0;'>" + botNameSection +":</p>";

    //Redimensiona conforme o segmento do robô selecionado
    if (botAtendentes[indexBot].segment){
        robotDBWiki = wikiContents.filter(function(el){
            return (sanitizeMsg(el.Segment) == sanitizeMsg(botAtendentes[indexBot].segment) && el.IsDBContent==true);
        })
    }else{
        robotDBWiki = wikiContents.filter(function(el){
            return el.IsDBContent==true;
        })
        // robotDBWiki = wikiContents;
    }
}

function closeAllFloatingFrames(exception){
    var i=0;
    var $allFloatFrames = document.querySelectorAll(".frame-float");

    // debugger;

    for(i=0;i<=$allFloatFrames.length-1;i++){
        if ($allFloatFrames[i].id != exception){$allFloatFrames[i].classList.remove("frame-float-show")};
    }
}

function toggleSpinner(){
    $spinnerContainer = document.querySelector("#spinner-container");
    $spinner = document.querySelector(".lds-ellipsis");
    // debugger;
    $spinnerContainer.style.top = ($chatBotDialog.scrollHeight + 50) + "px";
    $spinner.classList.toggle("lds-ellipsis-hide");
}

function clearAllFormFields(exception){
    var i=0;
    var $fields = document.querySelectorAll(".txtContent");

    for (i=0;i<=$fields.length-1;i++){
        $fields[i].value="";
        $fields[i].classList.remove("requiredField");
    }

    $bodyContent.innerHTML="";
    $btnSaveContent.innerHTML="Incluir";
}

function disableAllFormFields(exception){
    var i=0;
    var n=0;
    var isExcep = false;
    var $fields = document.querySelectorAll(".txtContent");

    if (exception==null){exception=[]};

    for (i=0;i<=$fields.length-1;i++){
        isExcep=false;
        for(n=0;n<=exception.length-1;n++){
            if($fields[i].id == exception[n].id){
                isExcep=true;
                break;
            }else{
                isExcep=false;
            }
        }
        if (isExcep == false){
            $fields[i].setAttribute("disabled", true);
        }else{
            $fields[i].removeAttribute("disabled");
        };
    }

}

function enableAllFormFields(exception){
    // debugger;
    var i=0;
    var n=0;
    var isExcep = false;
    var $fields = document.querySelectorAll(".txtContent");

    if (exception==null){exception=[]};

    for (i=0;i<=$fields.length-1;i++){
        isExcep=false;
        for(n=0;n<=exception.length-1;n++){
            if($fields[i].id == exception[n].id){
                isExcep=true;
                break;
            }else{
                isExcep=false;
            }
        }
        if (isExcep == false){
            $fields[i].removeAttribute("disabled");
        }else{
            $fields[i].setAttribute("disabled", true);
        };
    }
}

function findRegisterWiki(){
    var i = 0;
    var str="";
    var selItemInDB = wikiContents.filter(function(el){
        return el.Id == $txtID.value;
    })
    
    if (selItemInDB.length==0){
        $contentNotFound.innerHTML = "Nenhum conteúdo localizado com a ID " + $txtID.value;
        $contentNotFound.classList.add("contentNotFound-show");
    }else{
        enableAllFormFields([$txtID, $txtIndex]);
        $contentNotFound.classList.remove("contentNotFound-show");
        $txtIndex.value = selItemInDB[0].Index;
        $selSegment.value = selItemInDB[0].Segment;
        $txtTitle.value = selItemInDB[0].Title;
        $txtDescription.value = selItemInDB[0].Description;
        $txtLinks.value = selItemInDB[0].Link.join(" ");
        $txtHashtags.value = selItemInDB[0].Hashtags.join(" ");
        $chkActive.checked = selItemInDB[0].Active;
        $txtDateUpdate.value = selItemInDB[0].DateUpload;
        $txtAuthor.value = selItemInDB[0].Author;
        $bodyContent.innerHTML = selItemInDB[0].Body;
    }
    $selSegment.focus();
}

function exportDataBase(){
    botCurrentStatus = changeBotStatus("idle");
    // botCurrentStatus = botStatus.get("idle");
    saveJSONDataBase();
}

function showMsgScreen(){
    $confirmationMsg.classList.add("confirmationMsg-show");
    $msgScreen.classList.add("msgScreen-show");
}

function changeBotStatus(newStatus){
    // debugger;
    $chatBotAvatarStatus.innerHTML = botStatus.get(newStatus);
    return botStatus.get(newStatus);
}

function clearLocalStorage(){
    localStorage.setItem("rptName", "reportName");
    localStorage.setItem("description", "descrição do relatório");
    localStorage.setItem("unidMov","");
    localStorage.setItem("agConta","");
    localStorage.setItem("operProd","");
    localStorage.setItem("conta","");
    localStorage.setItem("contaDV","");
    localStorage.setItem("cotrato","");
    localStorage.setItem("NCPD","");
    localStorage.setItem("numPrest","");
    localStorage.setItem("TD","");
    localStorage.setItem("TDDV","");
    localStorage.setItem("CL","");
    localStorage.setItem("CLDV","");
    localStorage.setItem("TP-SIDEC","");
    localStorage.setItem("TP-SIACI","");
    localStorage.setItem("valorQtd","");
    localStorage.setItem("dataVenc","");
    localStorage.setItem("CPF","");
    localStorage.setItem("RGTipo","");
    localStorage.setItem("RGNumero","");
    localStorage.setItem("RGEmissor","");
    localStorage.setItem("RGDataEmissao","");
    localStorage.setItem("fone","");
    localStorage.setItem("CEP","");
    localStorage.setItem("email","");
    localStorage.setItem("titular","");
    localStorage.setItem("texto","");
    localStorage.setItem("local","");
    localStorage.setItem("dia","");
    localStorage.setItem("mes","");
    localStorage.setItem("ano","");
    localStorage.setItem("dataPgto","");
}

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================
// ================================IMPLEMENTAÇÃO DE INTERAÇÃO===================================================================================
// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

$chatBotPrompt.addEventListener("keyup", function(evt){
    if(evt.keyCode==38){
        $chatBotPrompt.value=prevMsg;
    }

    if(evt.keyCode==13){
        startInteraction();
    }
});

$chatbotSendMsgIcon.addEventListener("click", function(evt){
    // debugger;
        startInteraction();
});

function startInteraction(){
    toggleSpinner();
    readytoAnswer=false;
    msgSent = $chatBotPrompt.value;
    msgSent = msgSent.replace("\n", "");
    botResponseSuccess=false;
    $chatBotDialog.innerHTML += USERLABEL + msgSent +"</div>";
    $chatBotDialog.scroll(0,scrollPos);
    $chatBotPrompt.value="";
    prevMsg=msgSent;

    window.setTimeout(function(){
        activateBot(sanitizeMsg(msgSent));
    },TIMELAGRESPONSE);
}

function activateBot(msgSent){
    var i;
    var strAux="";
    var botRequest="";

    botResponseSuccess=false;
    responseBot="";

    // debugger;

    
    if (hasCommand(msgSent)){
        toggleSpinner();
        return;
    }

    if(botCurrentStatus == botStatus.get("idle")){
        // debugger;
        if (isHashTag(msgSent)){
            //fluxo de hashstag
            responseBot=searchByHashatg(msgSent);
            botResponseSuccess=true;

            if(responseBot[1].length<=1){
                toggleSpinner();
                $chatBotDialog.innerHTML += BOTLABEL + responseBot[0]; //"Quantidade:  " + responseBot[1].length + "</div>";
            }else if (responseBot[1].length>1 && responseBot[1].length<=10){
                toggleSpinner();
                $chatBotDialog.innerHTML += BOTLABEL + "<p>Encontei algumas informações que podem responder a sua questão. São elas:</p></div>"
                appendTableResultToBotLabel(responseBot[1]);
            }else if (responseBot[1].length>10){
                toggleSpinner();
                $chatBotDialog.innerHTML += BOTLABEL + "<p>Encontrei mais de 10 resultados e estou exibindo os conteúdos adicionados mais recentemente. Para uma resposta mais precisa, por favor faça uma questão mais específica e objetiva.</p></div>";
                appendTableResultToBotLabel(responseBot[1]);
            }else{
                toggleSpinner();
                $chatBotDialog.innerHTML += BOTLABEL + responseBot[0];
            }
        }else{
                responseBot = hasThanks(msgSent); //Verifica se encontrou agradecimento. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    finishBotBehaviourResponse(responseBot);
                    return;
                }
                responseBot = hasFarewell(msgSent); //Verifica se encontrou despedida. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    finishBotBehaviourResponse(responseBot);
                    return;
                }
                responseBot = hasMissUnderstand(msgSent); //Verifica se encontrou despedida. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    finishBotBehaviourResponse(responseBot);
                    return;
                }
                responseBot = hasGreetings(msgSent); //Verifica se encontrou cumprimento. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    finishBotBehaviourResponse(responseBot);
                    return;
                }

                // if (botResponseSuccess == true){
                //     $chatBotDialog.scroll(0,scrollPos);
                //     return;
                // }

            // } else { //Não é cumprimento, agradecimento ou despedida (ações de comportamento). Inicia busca de conteúdo.
                responseBot=startSearching(sanitizeMsgFull(msgSent));
                botResponseSuccess=true;
                if (responseBot[0]<=1){ //exibe mensagens singulares, vindas como retorno (se for encontrado 0 ou 1 itens)
                    // debugger;
                    if (responseBot[0]==0){botResponseSuccess=false};
                    toggleSpinner();
                    $chatBotDialog.innerHTML += BOTLABEL + responseBot[1] + "</div>";
                }else{ //exibe itens encontrados, se quantidade maior que 1
                    responseBot[0]<=5 ? strAux = "<p>Encontei algumas informações que podem responder a sua questão. São elas:</p></div>" : strAux = "<p>Encontei muitas informações que podem responder a sua questão. Segue as 5 que considerei mais relevantes:</p></div>"
                    toggleSpinner();
                    $chatBotDialog.innerHTML += BOTLABEL + strAux;
                    appendTableResultToBotLabel(responseBot[1]);
                }
            // }
        }
    }else if (botCurrentStatus == botStatus.get("await")){
        botResponseSuccess=true;
        // $chatBotDialog.innerHTML += BOTLABEL + "Estou em estado de espera.</div>"
        toggleSpinner();
        currentAwaitDemandItem.checkResponse(msgSent);
    }

    if (botResponseSuccess==false){
        // toggleSpinner();
        // $chatBotDialog.innerHTML += BOTLABEL + "Desculpa, não entendi.</div>";
        if (SETALLEATORY==true){
            // debugger;
            currentAwaitDemandItem = setAwaitMode("startAlleatoryChat");
            $chatBotDialog.innerHTML += BOTLABEL + currentAwaitDemandItem.botsentRequest + "</div>";
        }
    }

    $chatBotDialog.scroll(0,scrollPos);
    
}

// =============================================================================================================================================
// =============================================================================================================================================
// =============================FIM DE IMPLEMENTAÇÃO DE INTERAÇÃO===============================================================================
// =============================================================================================================================================
// =============================================================================================================================================


function searchContentBot(request){
    var eachWord = request.split(" ");
}


//APENSANDO A TABELA DE RESULTADOS À UMA CAIXA DE DIÁLOGO DO BOT (CLASS DIV-BOTLABEL)
function appendTableResultToBotLabel(tablesToAppend){
    var i = 0;
    var minLimitTables=0;
    var $divBotLabel = document.querySelectorAll(".div-botLabel");

    var resultOnClick;

    tablesToAppend.length-10 <= 0 ? minLimitTables=0 : minLimitTables=minLimitTables;

    for (i=tablesToAppend.length-1;i>=minLimitTables;i--){
        $divBotLabel[$divBotLabel.length-1].appendChild(tablesToAppend[i]);
        $divBotLabel[$divBotLabel.length-1].innerHTML += "<hr>";
    }
    // for (i=0;i<=tablesToAppend.length-1;i++){
    //     $divBotLabel[$divBotLabel.length-1].appendChild(tablesToAppend[i]);
    //     $divBotLabel[$divBotLabel.length-1].innerHTML += "<hr>";
    // }

    //Adicionando eventos aos titulos
    $titles = document.querySelectorAll(".title-tabelResult");

    for(i=0;i<=$titles.length-1;i++){
        $titles[i].addEventListener("click",function(evt){
            // debugger;
            resultOnClick=document.createElement("div");
            resultOnClick.classList.add("resultOnClick");
            resultOnClick.innerHTML=buildAnswerResult(wikiContents[parseInt(evt.currentTarget.id)]) + "<hr>";
            $divBotLabel[$divBotLabel.length-1].appendChild(resultOnClick);
            $chatBotDialog.scroll(0,scrollPos);
        })
    }
}

function finishBotBehaviourResponse(response){
    botResponseSuccess=true;
    toggleSpinner();
    $chatBotDialog.innerHTML += response + "</div>";
    $chatBotDialog.scroll(0,scrollPos);
}