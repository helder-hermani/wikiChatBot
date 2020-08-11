function sanitizeMsg(request){
    var formatedStr = request.toLowerCase();

    formatedStr = formatedStr.replace(",","");
    // formatedStr = formatedStr.replace("?","");
    // formatedStr = formatedStr.replace("#","");
    // formatedStr = formatedStr.replace("*","");
    formatedStr = formatedStr.replace("!","");
    formatedStr = formatedStr.replace(".","");
    formatedStr = formatedStr.replace(";","");
    formatedStr = formatedStr.replace("\\","");
    formatedStr = formatedStr.replace("|","");
    formatedStr = formatedStr.replace(":","");
    formatedStr = formatedStr.replace("~","");
    formatedStr = formatedStr.replace("^","");
    formatedStr = formatedStr.replace("]","");
    formatedStr = formatedStr.replace("}","");
    formatedStr = formatedStr.replace("[","");
    formatedStr = formatedStr.replace("{","");
    formatedStr = formatedStr.replace("´","");
    formatedStr = formatedStr.replace("`","");
    formatedStr = formatedStr.replace("''","");
    formatedStr = formatedStr.replace("\"","");
    formatedStr = formatedStr.replace("@","");
    formatedStr = formatedStr.replace("$","");
    formatedStr = formatedStr.replace("%","");
    formatedStr = formatedStr.replace("¨","");
    formatedStr = formatedStr.replace("&","");
    formatedStr = formatedStr.replace("(","");
    formatedStr = formatedStr.replace(")","");
    formatedStr = formatedStr.replace("-","");
    formatedStr = formatedStr.replace("_","");
    formatedStr = formatedStr.replace("+","");
    formatedStr = formatedStr.replace("=","");
    formatedStr = formatedStr.replace("á","a");
    formatedStr = formatedStr.replace("à","a");
    formatedStr = formatedStr.replace("õ","o");
    formatedStr = formatedStr.replace("ô","o");
    formatedStr = formatedStr.replace("ç","c");
    formatedStr = formatedStr.replace("í","i");
    formatedStr = formatedStr.replace("é","e");
    formatedStr = formatedStr.replace("è","e");
    formatedStr = formatedStr.replace("ê","e");
    formatedStr = formatedStr.replace("ú","u");
    return formatedStr;
}

function isHashTag(str){
    return str.indexOf("#") == 0;
}

function counterWords(str){
    str = str.split(" ");
    return str.length;
}

function selectEntityInObj(objBlocoComandos, keySearchEntity, valueSearchEntity){ //SELECT * FROM objBlocoCommandos WHERE entityToFind=keySearchEntity
    //Retorna um OBJETO específico, dentro de um bloco de comportamento, conforme critério
    var i=0;
    var n=0;
    var propertiesOfObject;
    var foundKey=false;

    for(i=0;i<=objBlocoComandos.length-1;i++){
        propertiesOfObject = Object.entries(objBlocoComandos[i]);   //retorna array com todas as propriedades de cada objeto do objBlocoComandos

        for(n=0; n<=propertiesOfObject.length-1; n++){ //propertiesOfObject[n][0] é sempre a chave e propertiesOfObject[n][1] é sempre o valor correspondente
            if (propertiesOfObject[n][0]==keySearchEntity && propertiesOfObject[n][1]==valueSearchEntity){
                return objBlocoComandos[i];
            }
        }
    }
}

function getRandomItem(arrElements){
    qtdItems=arrElements.length;
    var delta = (1/qtdItems)*100;
    var drawn = parseInt((Math.random() * 100)/delta);
    return arrElements[drawn];
}