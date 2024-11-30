
var agrupamentoValores = document.querySelector(".agrupamentoValores")
var cabecalho = document.querySelector(".cabecalho")
var btnagrupamentoValores = document.querySelector(".desconhecidaBtn");

mostrarCamposConhecido()
mostrarCamposDesconhecido()
function mostrarCamposConhecido() {
    var selection = document.querySelector(".selectConhecido")
    var val1 = document.querySelector(".v1Conhecido")
    var val1Label = document.querySelector(".v1LabelConhecido")
    var val2 = document.querySelector(".v2Conhecido")
    var btn = document.querySelector(".conhecidaBtn");
    if (selection.value == "maior" || selection.value == "menor") {
        val1Label.innerHTML = "Valor"
        val1.classList.remove("invisivel")
        val2.classList.add("invisivel")
        btn.classList.remove("invisivel")


    } else if (selection.value == "doisVal" || selection.value == "doisValFora") {
        val1Label.innerHTML = "Valor A"
        val1.classList.remove("invisivel")
        val2.classList.remove("invisivel")
        btn.classList.remove("invisivel")
    } else {
        val1.classList.add("invisivel")
        val2.classList.add("invisivel")
        btn.classList.add("invisivel")
    }

}
function mostrarCamposDesconhecido() {
    var selection = document.querySelector(".selectDesconhecido")
    var val1 = document.querySelector(".v1Desconhecido")
    var val1Label = document.querySelector(".v1LabelDesconhecido")
    var val2 = document.querySelector(".v2Desconhecido")
    var btn = document.querySelector(".desconhecidaBtn");
    if (selection.value == "maior" || selection.value == "menor") {
        val1Label.innerHTML = "Valor"
        val1.classList.remove("invisivel")
        val2.classList.add("invisivel")
        btn.classList.remove("invisivel")


    } else if (selection.value == "doisVal" || selection.value == "doisValFora") {
        val1Label.innerHTML = "Valor A"
        val1.classList.remove("invisivel")
        val2.classList.remove("invisivel")
        btn.classList.remove("invisivel")
    } else {
        val1.classList.add("invisivel")
        val2.classList.add("invisivel")
        btn.classList.add("invisivel")
    }

}

function addCampo() {
    var agrupamento = document.querySelector(".Agrupamento").value

    if (agrupamento == "discreto") {
        agrupamentoValores.innerHTML += "<div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div >"

    } else {
        agrupamentoValores.innerHTML += "<div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div >"

    }
}
function delCampo() {
    agrupamentoValores.removeChild(agrupamentoValores.lastElementChild)
}


function checarValor() {
    // var variancia = document.querySelector(".variancia")
    // if (variancia.value && variancia.value < 0) {
    //     variancia.value = 0
    // }

    var dp = document.querySelector(".dp")
    var agrupamento = document.querySelector(".Agrupamento").value
    var i = 1
    if (agrupamento == "classes") {
        i = 2
    }
    if (parseFloat(dp.value) < 0) {
        alert("O desvio padrão não pode ser negativo")
        dp.value = ""
        dp.focus()
    }
    var pares = document.querySelectorAll(".par")
    pares.forEach(par => {

        var fi = parseFloat(par.children[i].value)
        if (fi < 0) {
            par.children[i].value = ""
            alert("A frequência não pode ser negativa")
            par.children[i].focus()

        }
    })
}

function checarTipo() {
    var agrupamento = document.querySelector(".Agrupamento").value

    if (agrupamento == "discreto") {
        cabecalho.innerHTML = "<div class='xi'><p>Xi</p></div><div class='frequencia'><label for='tabelaSelect'>Tipo de frequência</label><select name='tabelaSelect' class='tabelaSelect'><option selected='true' value='Fi'>Absoluta</option><option value='Fac'>Acumulada</option></select></div>"
        agrupamentoValores.innerHTML = "<div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div ><div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div >"
    } else {
        cabecalho.innerHTML = "<div class='xi'><p>Li</p></div><div class='xi'><p>Ls</p></div><div class='frequencia'><label for='tabelaSelect'>Tipo de frequência</label><select name='tabelaSelect' class='tabelaSelect'><option selected='true' value='Fi'>Absoluta</option><option value='Fac'>Acumulada</option></select></div>"
        agrupamentoValores.innerHTML = "<div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div ><div class='par'><input type = 'text'onchange=validarNumero()></input><input type='text'onchange=validarNumero()></input><input type='text' onchange = checarValor(),validarNumero()></input></div >"
    }
}

function validarNumero() {
    var valor = event.target
    if ((isNaN(parseFloat(valor.value)) || valor.value.includes("+", 1)) && valor.value != "") {
        alert("O valor deve ser um número válido")
        valor.value = ""
    }
}
