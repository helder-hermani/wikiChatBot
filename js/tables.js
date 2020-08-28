const SEGMENTOS = [
    {
        "index" : 1,
        "description" : "Habitação",
        "value":"Habitação",
    },
    {
        "index" : 2,
        "description" : "PF",
        "value":"PF"
    },
    {
        "index" : 3,
        "description" : "PJ",
        "value":"PJ"
    },
    {
        "index" : 4,
        "description" : "Atendimento/Social",
        "value":"Atendimento/Social"
    }
];

const ROBOTWIKIACTIONS = [
    {
        "index" : 1,
        "description" : "Incluir conteúdo",
        "value":"include",
        "onChange" : ()=>{
            $btnSaveContent.innerHTML="Incluir";
            $formContent.classList.add("setting-div-form-content-show");
            $serchIcon.classList.add("icon-content-search-hide");
            $txtID.classList.remove("txtReduced");
            enableAllFormFields([$txtID, $txtIndex]);
            $txtID.value=generateId();
            $txtIndex.value=parseInt(wikiContents[wikiContents.length-1].Index)+1;
            $selSegment.focus();
        },
        "onClick":()=>{
            if (validateReqFields()==true){
                botCurrentStatus = changeBotStatus("edit");
                var currentDate = new Date();
                var newItem = {
                    "Index": $txtIndex.value,
                    "Id": $txtID.value,
                    "Parent" : "Uncategorized",
                    "Category" : "Uncategorized",
                    "Segment": $selSegment.value,
                    "Title" : $txtTitle.value,
                    "Description": $txtDescription.value,
                    "Keys" : [],
                    "Link" : $txtLinks.value.trim() == "" ? [] : $txtLinks.value.split(" "),
                    "Hashtags" : $txtHashtags.value.trim() == "" ? [] : $txtHashtags.value.split(" "),
                    "DateUpload": $txtDateUpdate.value.trim() == "" ? formatDate(currentDate.getDate(), currentDate.getMonth()+1, currentDate.getFullYear()) : $txtDateUpdate.value,
                    "Body" : formatBodyContent($bodyContent.innerHTML),
                    "Active":$chkActive.checked,
                    "IsDBContent":true,
                    "Author": $txtAuthor.value
                }

                wikiContents.push(newItem);
                $divPreSavedContent.textContent="var wikiContents = " + JSON.stringify(wikiContents);
                $confirmationMsg.innerHTML = "Informações armazenadas" + MSGINCLUDEDSUCESS;
                showMsgScreen();
            }
        }
    },
    {
        "index" : 2,
        "description" : "Editar/desativar conteúdo",
        "value":"edit",
        "onChange" : ()=>{
            $btnSaveContent.innerHTML="Alterar";
            $formContent.classList.add("setting-div-form-content-show");
            $txtID.removeAttribute("disabled");
            $txtID.focus();
        },
        "onClick":()=>{
            var i;
            if (validateReqFields()==true){
                botCurrentStatus = changeBotStatus("edit");
                var currentDate = new Date();
                i = parseInt($txtIndex.value);
                wikiContents[i].Index = $txtIndex.value,
                wikiContents[i].Id = $txtID.value,
                wikiContents[i].Parent = "Uncategorized",
                wikiContents[i].Category = "Uncategorized",
                wikiContents[i].Segment = $selSegment.value,
                wikiContents[i].Title = $txtTitle.value,
                wikiContents[i].Description = $txtDescription.value,
                wikiContents[i].Keys = [],
                wikiContents[i].Link = $txtLinks.value.trim() == "" ? [] : $txtLinks.value.split(" "),
                wikiContents[i].Hashtags = $txtHashtags.value.trim() == "" ? [] : $txtHashtags.value.split(" "),
                wikiContents[i].DateUpload = $txtDateUpdate.value.trim() == "" ? formatDate(currentDate.getDate(), currentDate.getMonth()+1, currentDate.getFullYear()) : $txtDateUpdate.value,
                wikiContents[i].Body = formatBodyContent($bodyContent.innerHTML),
                wikiContents[i].Active = $chkActive.checked,
                wikiContents[i].IsDBContent = true,
                wikiContents[i].Author = $txtAuthor.value

                $divPreSavedContent.textContent="var wikiContents = " + JSON.stringify(wikiContents);
                $confirmationMsg.innerHTML = "Informações armazenadas" + MSGINCLUDEDSUCESS;
                showMsgScreen();
            }
        }
    },
    {
        "index" : 3,
        "description" : "Excluir conteúdo",
        "value":"exclude",
        "onChange" : ()=>{
            $btnSaveContent.innerHTML="Excluir";
            $formContent.classList.add("setting-div-form-content-show");
            $txtID.removeAttribute("disabled");
            $txtID.focus();
        },
        "onClick":()=>{
            botCurrentStatus = changeBotStatus("edit");
            var removedItem = wikiContents.splice(parseInt($txtIndex.value), 1);
            var i=0;

            for (i=0;i<=wikiContents.length-1;i++){
                wikiContents[i].Index = i;
            }

            $divPreSavedContent.textContent="var wikiContents = " + JSON.stringify(wikiContents);
            $confirmationMsg.innerHTML = "Informações excluídas" + MSGINCLUDEDSUCESS;
            showMsgScreen();
        }
    }
];