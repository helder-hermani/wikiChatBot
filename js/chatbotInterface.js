// ================================INICIALIZADORES DE INTERFACE=================================

var $chatBotDialog = document.querySelector("#aside-chatbot-dialog");
var $chatBotPrompt = document.querySelector("#textChatbotPrompt");
var scrollPos = 100000;
var msgSent = "";
var prevMsg = "";
var botResponseSuccess = false;
const USERLABEL = "<p style='font-weight: bold; color: #FF720C; margin: 3% 0 0 0; padding:0;'>Você:</p>";
const BOTLABEL = "<p style='font-weight: bold; color: #040242; margin: 3% 0 0 0; padding:0;'>Helper:</p>";



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
        $chatBotDialog.innerHTML += USERLABEL + msgSent;
        $chatBotDialog.scroll(0,scrollPos);
        $chatBotPrompt.value="";
        prevMsg=msgSent;
        activateBot(sanitizeMsg(msgSent));
    }
});

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
                    $chatBotDialog.innerHTML += BOTLABEL + responseBot;
                }
                responseBot = hasFarewell(msgSent); //Verifica se encontrou cumprimento. Se true, obtém uma das mensagens de resposta
                if (responseBot){
                    botResponseSuccess=true;
                    $chatBotDialog.innerHTML += BOTLABEL + responseBot;
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