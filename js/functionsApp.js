function getLastReviews(){
    var i;
    var contractTitle="";
    var bodyLi="";

    for (i=wikiContents.length-1;i>=1;i--){
        wikiContents[i].Title.length > 45 ? contractTitle = wikiContents[i].Title.substring(0,45) + "..." : contractTitle = wikiContents[i].Title;
        bodyLi=bodyLi + "<li style='font-family: Roboto; list-style: none;' class='documentIsLink' id='"+ wikiContents[i].Index + "'>"+
                "        <p style='display: inline-block; width: 15%;'>" + wikiContents[i].Category +"</p>"+
                "        <p style='border-right: solid 1px black; display: inline-block; width: 65%;'>" + contractTitle + "</p>"+
                "        <p style='display: inline-block; width: 15%;'>" + wikiContents[i].DateUpload + "</p>"+
                "    </li>"
    }

    for(i=0;i<=wikiContents.length-1;i++){
        if (wikiContents[i].Category=="lastReviews"){
            wikiContents[i].Body="<div style='width: 80%;height: auto;margin-left: auto; margin-top: 5%; margin-right: 10%; border: 0px solid black'>"+
                                    "<p style='font-family: Roboto; font-weight: bold; text-decoration: underline;margin-bottom: 5%;'>Atualizações Recentes</p>"+
                                    "<ul>"+
                                    "<li style='font-family: Roboto; list-style: none;'>"+
                                    "<p style='display: inline-block; width: 15%;font-weight: bold;border-bottom: solid 1px black'>Categoria</p>"+
                                    "<p style='border-right: solid 1px black; display: inline-block; width: 65%;font-weight: bold;border-bottom: solid 1px black'>Título</p>"+
                                    "<p style='display: inline-block; width: 15%;font-weight: bold;border-bottom: solid 1px black'>Data</p>"+
                                    "</li>"+
                                    bodyLi +
                                    "</ul>"+
                                    "</div>"+
                                    "<img src='/assets/img/cef.png' style='position: absolute; bottom: 30px; right: 30px; opacity: .5;z-index: -1;'>";
            return
        }
    }
}

function buildMainScreen(indexContent, defineMethods){
    var $mainScreen = document.querySelector(".main-content-screen");
    

    var Body = wikiContents[indexContent].Body;
    $mainScreen.innerHTML=Body;

    if (defineMethods==true){
        setMethods.call();
    };
}

function setMethods(){  //Recursiva à função buildMainScreen
    console.log("implementar os métodos");
    var i;
    var iLink=0;
    var $elementLink = document.querySelectorAll(".documentIsLink");

    for(i=0;i<=$elementLink.length-1;i++){
        iLink=$elementLink[i].id;
        $elementLink[i].addEventListener("click",function(evt){
            buildMainScreen(evt.currentTarget.id);
        });
    }
}




