function buildMainScreen(indexContent, defineMethods){
    var $mainScreen = document.querySelector(".main-content-screen");
    

    var Body = wikiContents[indexContent].Body;
    $mainScreen.innerHTML=Body;
    
    // debugger;

    if (defineMethods==true){
        setMethods.call();
    };
}

function setMethods(){
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