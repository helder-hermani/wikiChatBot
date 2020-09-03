Attribute VB_Name = "Módulo2"
Sub formatExcelReport()
Dim i As String
Dim str As String

Open "C:\Users\helde\Documents\projetos_dev\wikiepitacio\dev-ferramentas\textoinput.txt" For Input As #1
Open "C:\Users\helde\Documents\projetos_dev\wikiepitacio\dev-ferramentas\textooutput.txt" For Output As #2

While EOF(1) = False
    Line Input #1, str
    Write #2, str & "+"
Wend

Close #1
Close #2


End Sub
