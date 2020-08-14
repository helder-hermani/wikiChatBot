// ================================INICIALIZADORES DE INTERFACE=================================
var botSex = "m";
var $chatBotDialog = document.querySelector("#chatbot-dialog");
var $chatBotPrompt = document.querySelector("#textChatbotPrompt");
var $chatBotAvatar = document.querySelector(".chatbot-header-avatar");
var $chatBotFrameChangeAvatar = document.querySelector(".frame-changeAvatar");

var scrollPos = 100000;
var msgSent = "";
var prevMsg = "";
var botResponseSuccess = false;
const USERLABEL = "<div style='border: solid 1px rgba(0,0,0,.2); width:75%; height: auto; margin: 3% 0 0 auto;border-radius: 10px; padding: 1% 2%;'><p style='font-weight: bold; color: #FF720C; margin: 0; padding:0;'>Você:</p>";
const BOTLABEL = "<div style='border: solid 1px rgba(0,0,0,.2); width:75%; height: auto; margin: 3% auto 0 0;border-radius: 10px; padding: 1% 2%;'><p style='font-weight: bold; color: #040242; margin: 3% 0 0 0; padding:0;'>Helper:</p>";



// ================================CRIAÇÃO DOS ATENDENTES - FLOATING MENU=================================
var botAtendentes = [
    {
        "index": 0,
        "name": "Helper Main",
        "Alias": "Helper",
        "headColor" : "var(--bot-helper01-primary)",
        "borderColor":"#000000",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url(/assets/img/avatar-man-tie.jpg)",
        "especialidade":"Habitação",
        "initial":false
    },
    {
        "index": 2,
        "name": "Helper Female1",
        "Alias": "Helper",
        "headColor" : "var(--bot-helper02-primary)",
        "borderColor":"var(--bot-helper02-primary)",
        "fontcolor": "#000000",
        "opacity": 0.7,
        "avatarUrl" : "url(/assets/img/avatar-woman.png)",
        "especialidade":"Pessoas Física",
        "initial":false
    },
    {
        "index": 3,
        "name": "Helper Guy",
        "Alias": "Helper",
        "headColor" : "var(--bot-helper03-primary)",
        "borderColor":"var(--bot-helper03-primary)",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url(/assets/img/avatar-guy.png)",
        "especialidade":"Pessoa Jurídica",
        "initial":false
    },
    {
        "index": 4,
        "name": "Helper Robot",
        "Alias": "Helper Girl",
        "headColor" : "var(--bot-helper04-primary)",
        "borderColor":"var(--bot-helper04-primary)",
        "fontcolor": "#FFFFFF",
        "opacity": 0.7,
        "avatarUrl" : "url(/assets/img/black-woman-avatar.jpg)",
        "especialidade":"Atendimento/Social",
        "initial":false
    },
    {
        "index": 5,
        "name": "Helper Robot",
        "Alias": "Helper Robot",
        "headColor" : "var(--bot-helper05-primary)",
        "borderColor":"var(--bot-helper05-primary)",
        "fontcolor": "#000000",
        "opacity": 0.7,
        "avatarUrl" : "url(/assets/img/avatar-robot.jpg)",
        "especialidade":"Todos Segmentos",
        "initial":true
    }
];

initAtendentes();

function initAtendentes(){
    var i=0;
    var n=0;
    var x=0;
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
    var $chatBotHeader = document.querySelector(".chatbot-header");
    var $chatBotAvatarPic = document.querySelector(".robot-avatar-pic");
    var $chatBotAvatarName = document.querySelector(".robot-name");
    var $chatBotAvatarStatus = document.querySelector(".robot-activeStatus");
    var $chatBotAtendentesFrame = document.querySelector(".frame-changeAvatar");
    var $chatbotSettingsHelpIcon = document.querySelectorAll(".chatbot-icon-botSettingsHelp");

    //Constroi o bot inicial
    var inicialBot = botAtendentes.filter(function(el){
        return el.initial==true;
    })

    

    debugger;

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
        atendimentoNameDivPEsp.textContent = "(" + botAtendentes[i].especialidade +")";

        atendimentoNameDiv.appendChild(atendimentoNameDivPName);
        atendimentoNameDiv.appendChild(atendimentoNameDivPEsp);

        atendimentoNameDiv.classList.add("divAtendente-Name");

        atendimentoCheck = document.createElement("img");
        atendimentoCheck.setAttribute("src","/assets/icons/check-circle-regular.svg");
        atendimentoCheck.classList.add("divAtendente-check");
        // if (i==0){atendimentoCheck.classList.toggle("divAtendente-check-enabled")};

        atendimentoDiv.appendChild(atendimentoAvatar);
        atendimentoDiv.appendChild(atendimentoColorPattern);
        atendimentoDiv.appendChild(atendimentoNameDiv);
        atendimentoDiv.appendChild(atendimentoCheck);
        $chatBotFrameChangeAvatar.appendChild(atendimentoDiv);
    }
    
    //adicionando os eventos de seleção
    $checkIcons = document.querySelectorAll(".divAtendente-check")
    $linesAtendentes = document.querySelectorAll(".divAtendente-line")

    for(i=0;i<=$linesAtendentes.length-1;i++){
        $linesAtendentes[i].addEventListener("click", function(evt){
            for (n=0;n<=$linesAtendentes.length-1;n++){
                $linesAtendentes[n].children[3].classList.remove("divAtendente-check-enabled");
                // debugger;
                $chatBotAvatarPic.style.backgroundImage = botAtendentes[parseInt(evt.currentTarget.id)].avatarUrl;
                $chatBotHeader.style.backgroundColor = botAtendentes[parseInt(evt.currentTarget.id)].headColor;
                $chatBotHeader.style.border = "solid 1px " + botAtendentes[parseInt(evt.currentTarget.id)].borderColor;
                $chatBotAvatarName.children[0].style.color = botAtendentes[parseInt(evt.currentTarget.id)].fontcolor;
                $chatBotAvatarName.children[1].style.color = botAtendentes[parseInt(evt.currentTarget.id)].fontcolor;
                $chatBotAvatarName.children[1].textContent = "(" + botAtendentes[parseInt(evt.currentTarget.id)].especialidade +")";
                $chatBotAvatarStatus.children[0].style.color = botAtendentes[parseInt(evt.currentTarget.id)].fontcolor;
                $chatBotAtendentesFrame.style.border = "solid 1px " + botAtendentes[parseInt(evt.currentTarget.id)].headColor;
                $chatBotAtendentesFrame.classList.remove("frame-changeAvatar-show");

                for (x=0;x<=$chatbotSettingsHelpIcon.length-1;x++){
                    debugger;
                    $chatbotSettingsHelpIcon[x].style.fill=botAtendentes[parseInt(evt.currentTarget.id)].fontcolor;
                    $chatbotSettingsHelpIcon[x].style.opacity=botAtendentes[parseInt(evt.currentTarget.id)].opacity;
                }
            }
            evt.currentTarget.children[3].classList.add("divAtendente-check-enabled");
        })
    }

    $chatBotDialog.addEventListener("click", function(){
        $chatBotAtendentesFrame.classList.remove("frame-changeAvatar-show");
    })
}



// ================================IMPLEMENTAÇÃO DE INTERAÇÃO=================================

$chatBotPrompt.addEventListener("keyup", function(evt){
    msgSent = $chatBotPrompt.value;
    msgSent = msgSent.slice(0, msgSent.length-1);   //retira o caracter "enter"
    // alert(evt.keyCode);
    if(evt.keyCode==38){
        $chatBotPrompt.value=prevMsg;
    }

    if(evt.keyCode==13){
        botResponseSuccess=false;
        $chatBotDialog.innerHTML += USERLABEL + msgSent +"</div>";
        $chatBotDialog.scroll(0,scrollPos);
        $chatBotPrompt.value="";
        prevMsg=msgSent;
        activateBot(sanitizeMsg(msgSent));
    }
});

$chatBotAvatar.addEventListener("click", function(){
    console.log($chatBotFrameChangeAvatar.className);
    if($chatBotFrameChangeAvatar.className=="frame-changeAvatar"){
        $chatBotFrameChangeAvatar.classList.add("frame-changeAvatar-show");
    }else{
        $chatBotFrameChangeAvatar.classList.remove("frame-changeAvatar-show");
    }
})

function activateBot(msgSent){
    var i;
    var botRequest="";
    var responseBot="";
    botResponseSuccess=false;

    if (hasCommand(msgSent)==true){return};

    if(botCurrentStatus == botStatus.get("idle")){
        
        if (isHashTag(msgSent)){
            //fluxo de hashstag
            botResponseSuccess=true;
            $chatBotDialog.innerHTML += BOTLABEL + "Ei, você digitou uma hashtag! Espere uns dias que estarei capacitado a te atender.";
        }else{
            if (counterWords(msgSent) <= 3){
                responseBot = hasGreetings(msgSent); //Verifica se encontrou cumprimento. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    botResponseSuccess=true;
                    $chatBotDialog.innerHTML += responseBot + "</div>";
                }
                responseBot = hasFarewell(msgSent); //Verifica se encontrou despedida. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    botResponseSuccess=true;
                    $chatBotDialog.innerHTML += responseBot + "</div>";
                }
                responseBot = hasThanks(msgSent); //Verifica se encontrou agradecimento. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    botResponseSuccess=true;
                    $chatBotDialog.innerHTML += responseBot + "</div>";
                }
                
            } else {
                //fluxo de consulta mais elaborada (níveis 1 a 4)
                botResponseSuccess=true;
                $chatBotDialog.innerHTML += BOTLABEL + "Calma, campeão! Você tá indo rápido demais. Daqui a uns dias eu chegarei lá!";
            }
        }
    }

    if (botResponseSuccess==false){$chatBotDialog.innerHTML += BOTLABEL + "Desculpa, não entendi.";}

    debugger;
    $chatBotDialog.scroll(0,scrollPos);
}

function searchContentBot(request){
    var eachWord = request.split(" ");
    debugger;
}

