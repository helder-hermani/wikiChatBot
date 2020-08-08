var wikiLastReview = [
    {
        "index": 0,
        "Parent" : "wikiLastReview",
        "Category" : "Wiki",
        "Title" : "Pedra do Reino - Prestações pagas pela fiadora/Construtora",
        "Description": "Pedra do Reino - Como entender as prestações pegas pela fiadora/Construtora.",
        "DateUpload": "08/0/2020",
        "indexContent" : 1
    },
    {
        "index": 1,
        "Parent" : "wikiLastReview",
        "Category" : "Wiki",
        "Title": "FIES - Encerramento",
        "Description": "Como solicitar encerramento do FIES e as opções de pagamento do saldo devedor.",
        "DateUpload":"07/07/2020",
        "indexContent" : 2
    },
    {
        "index": 2,
        "Parent" : "wikiLastReview",
        "Category" : "Chamado",
        "Title": "Alteração na pausa FIES - indaimplência em 20/03/2020",
        "Description": "Chamado sobre alteração nas condições de pausa do FIES por calamidade pública, permitindo para inadimplência em 20/03/2020.",
        "DateUpload":"07/07/2020",
        "indexContent" : 3
    },
    {
        "index": 3,
        "Parent" : "wikiLastReview",
        "Category" : "Arquivo",
        "Title": "Calendário Auxílio Emergencial",
        "Description": "Tabela mais recente completa, considerando novos aprovados.",
        "DateUpload":"06/07/2020",
        "indexContent" : 4
    },
    {
        "index": 4,
        "Parent" : "wikiLastReview",
        "Category" : "Arquivo",
        "Title": "Orientações sobre antecipação do FGTS - Saque Aniversário",
        "Description": "Orientações sobre as condições e como solicitar a antecipação do saque-aniversário do FGTS.",
        "DateUpload":"07/07/2020",
        "indexContent" : 5
    }
]

function getLastReviews(){
    var i;
    var bodyLi="";
    var contractTitle="";

    for(i=0; i<=wikiLastReview.length-1;i++){
        wikiLastReview[i].Title.length > 45 ? contractTitle = wikiLastReview[i].Title.substring(0,45) + "..." : contractTitle = wikiLastReview[i].Title;
        bodyLi=bodyLi + "<li style='font-family: Roboto; list-style: none;' class='documentIsLink' id='"+ wikiLastReview[i].indexContent + "'>"+
                "        <p style='display: inline-block; width: 15%;'>" + wikiLastReview[i].Category +"</p>"+
                "        <p style='border-right: solid 1px black; display: inline-block; width: 65%;'>" + contractTitle + "</p>"+
                "        <p style='display: inline-block; width: 15%;'>" + wikiLastReview[i].DateUpload + "</p>"+
                "    </li>"
    }
    return bodyLi;
}
