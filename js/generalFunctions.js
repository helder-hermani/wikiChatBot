//NENHUMA FUNÇÃO DEVE FAZER REFERÊNCIA DIRETA A OBJETOS DA INTERFACE
//TODOS OS PARÂMETROS DEVEM SER RECEBIDOS DE OUTRAS CHAMADAS, A PARTIR DA INTERFACE

function sanitizeMsg(request){
    var formatedStr = request.toLowerCase();

    formatedStr = formatedStr.replace(",","");
    // formatedStr = formatedStr.replace("?","");
    // formatedStr = formatedStr.replace("#","");
    // formatedStr = formatedStr.replace("*","");
    // formatedStr = formatedStr.replace("\"","");
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
    return str.indexOf(  "#") == 0;
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

    if(typeof(arrElements)=="string"){
        return arrElements;
    }else if(typeof(arrElements)=="object"){
        qtdItems=arrElements.length;
        var delta = (1/qtdItems)*100;
        var drawn = parseInt((Math.random() * 100)/delta);
        return arrElements[drawn];
    }
}

function getQuoteInStr(str){
    var i;
    var searchContent;

    str = str.replace("\"","*[]*$");
    str=str.split("*[]*");

    if (str[0]==null){
        return (str[0]);
    }else{
        for (i=0;i<=str.length-1;i++){
            if(str[i].indexOf("$")>=0){
                searchContent=str[i].replace("$","");
                searchContent = searchContent.replace("\"","");
                return searchContent;
            }
        }
    }

    
}

function searchValuesInMsg(userMsg, objeto, keySearchEntity, onlyIfKey, onlyIfKeyValue, returnOnlyFirst){
    var i=0;
    var n=0;
    var x=0;
    var propertiesOfObject;
    var foundKey=false;
    var filterArray=[];

    //Filtra o objeto se quiser redimensionar apenas para algum critério
    if (onlyIfKey!=null && onlyIfKeyValue!=null){
        for(i=0;i<=objeto.length-1;i++){
            propertiesOfObject = Object.entries(objeto[i]);

            for (n=0;n<=propertiesOfObject.length-1;n++){
                if(propertiesOfObject[n][0]==onlyIfKey && propertiesOfObject[n][1]==onlyIfKeyValue){
                    filterArray.push(objeto[i]);
                }
            }
        }
    }else if((onlyIfKey!=null ^ onlyIfKeyValue!=null)){
        return [false,-1];
    }

    if (filterArray.length>0){
        objeto=filterArray
        filterArray=[];
    };
    i=0;
    n=0;
    


    for(i=0;i<=objeto.length-1;i++){
        propertiesOfObject = Object.entries(objeto[i]);   //retorna array com todas as propriedades de cada objeto do objBlocoComandos

        for(n=0; n<=propertiesOfObject.length-1; n++){ //propertiesOfObject[n][0] é sempre a chave e propertiesOfObject[n][1] é sempre o valor correspondente
            if(propertiesOfObject[n][0]==keySearchEntity){
               if(typeof (propertiesOfObject[n][1]) == "string") {
                   if(userMsg.indexOf(propertiesOfObject[n][1])>=0){return true};
               }else if(typeof (propertiesOfObject[n][1]) == "object") {
                   for(x=0;x<=propertiesOfObject[n][1].length-1;x++){
                        if(userMsg.indexOf(propertiesOfObject[n][1][x])>=0){
                            foundKey=true;
                            // return [true,objeto[i]];
                            filterArray.push(objeto[i]);
                            if(returnOnlyFirst==true){break;}
                        }
                   }
               }
            }
        }
    }

    return [foundKey, filterArray]; 
    //retorna 2 parâmetros:
    //o primeiro booleano indica se encontrou elemento
    //o segundo um array de objetos, contendo todos os objetos onde as condições foram satsfeitas
}

function buildTableResult(linkObjName, linkObjIndex, headCont, mainCont, footCont){    //constroi tabela. Retorna o elemento tabela
// function buildTableResult(headCont, mainCont, footCont){    //constroi tabela. Retorna um OBJETO tabela
    var tblTable = document.createElement("table");
    var createdItemId;
    var $createdItem;
    var tblHead = document.createElement("thead");
    var tblHeadTd = document.createElement("td");
    var tblRow1 = document.createElement("tr");
    var tblRow1Td = document.createElement("td");
    var tblRow2 = document.createElement("tr");
    var tblRow2Td = document.createElement("td");

    var pHead = document.createElement("p");
    var pRow1 = document.createElement("p");
    var pRow2 = document.createElement("p");

    pHead.innerHTML=headCont;
    pRow1.innerHTML=mainCont;
    pRow2.innerHTML=footCont;

    pHead.classList.add("title-tabelResult");
    pHead.id=linkObjIndex;

    tblRow2Td.appendChild(pRow2);
    tblRow2.appendChild(tblRow2Td);

    tblRow1Td.appendChild(pRow1);
    tblRow1.appendChild(tblRow1Td);

    tblHeadTd.appendChild(pHead);
    tblHead.appendChild(tblHeadTd);

    tblTable.appendChild(tblHead);
    tblTable.appendChild(tblRow1);
    tblTable.appendChild(tblRow2);

    tblTable.classList.add("tableShowResult");


    return tblTable;

    // createdItemId = linkObjIndex;

    // tblTable = "<table class='tableShowResult'>"+
    //                 "<thead>"+
    //                     "<td>"+
    //                         "<p id='" + createdItemId + "' class='itemTableResul'>" + headCont + "</p>"+
    //                     "</td>"+
    //                 "</thead>"+
    //                 "<tr class='tblResultMainLine'>"+
    //                     "<td>"+ 
    //                         "<p>" + mainCont + "<p>"+
    //                     "</td>"+
    //                 "</tr>"+
    //                 "<tfoot>"+
    //                     "<td>"+
    //                         "<p>" + footCont + "</p>"+
    //                     "</td>"+
    //                 "</tfoot>"+
    //             "</table>"
    
    
    
    // return tblTable;

}