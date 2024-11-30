import Statistics from "./statistics.js-master/statistics.js-master/statistics.js";

const estatistica = new Statistics()
var btn = document.querySelector(".conhecidaBtn");
var btnTabela = document.querySelector(".desconhecidaBtn");
var resultadoP = document.querySelector(".resultado");
var mostrarResultado = document.querySelector(".mostrarResultado");
btn.addEventListener("click", adquirirValores)
btnTabela.addEventListener("click", adquirirValoresTabela)


function adquirirValores() {
    var media = document.querySelector(".media").value
    // var variancia = document.querySelector(".variancia").value
    var dp = document.querySelector(".dp").value
    var qtde = document.querySelector(".qtde").value

    var val1 = document.querySelector(".val1Conhecido").value
    var val2 = document.querySelector(".val2Conhecido").value
    var op = document.querySelector(".selectConhecido").value

    if (qtde == "" || dp == "" || media == "") {
        alert("Os valores da função estão incompletos, por favor insira os valores faltantes")
        return;
    }

    selecionarFuncao(media, dp, qtde, val1, val2, op)
}

function adquirirValoresTabela() {
    var agrupamento = document.querySelector(".Agrupamento").value
    var dados = []
    var xiArray = []
    var fiArray = []
    var facArray = []
    var pares = document.querySelectorAll(".par")
    var selectionTabela = document.querySelector(".tabelaSelect").value
    var incompleto = false
    var index = 0
    pares.forEach(par => {
        index += 1
        if (agrupamento == "discreto") {
            var xiBruto = par.children[0].value
            var xi = parseFloat(xiBruto.replace(",", "."))

            var fi = parseFloat(par.children[1].value.replace(",", "."))
            if (isNaN(xi) || isNaN(fi)) {
                alert(`Há campos na linha ${index} que estão incompletos.`)
                incompleto = true
                return
            }
            xiArray.push(xi)
        } else {
            var xi = (parseFloat(par.children[0].value.replace(",", ".")) + parseFloat(par.children[1].value.replace(",", "."))) / 2
            var fi = parseFloat(par.children[2].value.replace(",", "."))
            if (isNaN(xi) || isNaN(fi)) {
                alert(`Há campos na linha ${index} que estão incompletos.`)
                incompleto = true
                return
            }

            xiArray.push(xi)
        }
        if (selectionTabela == "Fi") {
            fiArray.push(fi)
        } else {
            facArray.push(fi)
        }
    })
    if (incompleto) {
        return
    }
    if (selectionTabela == "Fac") {
        fiArray.push(facArray[0])
        for (var i = 1; i < facArray.length; i++) {
            fiArray.push(facArray[i] - facArray[i - 1])
        }
    }
    for (var i = 0; i < xiArray.length; i++) {
        for (var j = 0; j < fiArray[i]; j++) {
            dados.push(xiArray[i])
        }
    }
    CalcularValoresTabela(dados, xiArray, fiArray)
}

function CalcularValoresTabela(dados, xi, fi) {
    var soma = 0;
    var media = 0;
    var variancia = 0;
    for (var i = 0; i < dados.length; i++) {
        soma += dados[i]
    }
    media = soma / dados.length
    for (var i = 0; i < xi.length; i++) {
        variancia += (fi[i] * ((xi[i] - media) ** 2)) / (dados.length)
    }
    var dp = Math.sqrt(variancia)


    var val1 = parseFloat(document.querySelector(".val1Desconhecido").value.replace(",", "."))
    var val2 = parseFloat(document.querySelector(".val2Desconhecido").value.replace(",", "."))
    var op = document.querySelector(".selectDesconhecido").value
    selecionarFuncao(media, dp, dados.length, val1, val2, op)
}

function selecionarFuncao(media, dp, qtde, val1, val2, selection) {

    if (isNaN(val1)) {
        if (selection == "doisVal" || selection == "doisValFora") {
            alert("O valor A de comparação não pode ser vazio, por favor insira um valor")

        } else {
            alert("O valor de comparação não pode ser vazio, por favor insira um valor")
        }
        return
    }
    if ((isNaN(val2)) && (selection == "doisVal" || selection == "doisValFora")) {
        alert("O valor B de comparação não pode ser vazio, por favor insira um valor")
        return
    }
    dp = parseFloat(dp.replace(",", "."))
    val1 = parseFloat(val1.replace(",", "."))
    val2 = parseFloat(val2.replace(",", "."))
    media = parseFloat(media.replace(",", "."))

    if (selection == "maior" || selection == "menor") {
        CalcularZ(media, dp, qtde, val1, selection, estatistica)
    } else {
        CalcularZDois(media, dp, qtde, val1, val2, selection, estatistica)
    }
}




function CalcularProbabilidadePadronizada(a, op, estatistica) {
    var invertido = false
    var resultado = 0
    var media = 0
    if (a < media) {
        invertido = true
        a *= -1
    }
    if ((a > 4 || a < 0)) {
        if (invertido) {
            if (op == "maior") {
                resultado = 1

            } else {
                resultado = 0
            }
        } else {
            if (op == "maior") {
                resultado = 0

            } else {
                resultado = 100
            }
        }
        resultado = (resultado * 100).toFixed(2)
        resultadoP.innerHTML = `Resultado: ${resultado}%`
        mostrarResultado.classList.remove("invisivel")
        mostrarResultado.scrollIntoView()
        return
    }
    if (op == "maior") {
        if (invertido == true) {
            resultado = estatistica.normalCumulativeValue(a)
        }
        else {
            resultado = 1 - estatistica.normalCumulativeValue(a)
        }
    }
    else {
        if (invertido == true) {
            resultado = 1 - estatistica.normalCumulativeValue(a)
        }
        else {
            resultado = estatistica.normalCumulativeValue(a)
        }
    }
    resultado = (resultado * 100).toFixed(2)
    resultadoP.innerHTML = `Resultado: ${resultado}%`
    mostrarResultado.classList.remove("invisivel")
    mostrarResultado.scrollIntoView()

}

function CalcularProbabilidadePadronizadaDois(a, b, op, estatistica) {

    var aInvertido = false
    var bInvertido = false
    var resultado = 0
    var media = 0

    if (a < media) {
        aInvertido = true
        a *= -1
    }
    if (b < media) {
        bInvertido = true
        b *= -1
    }
    if ((a > 4 || a < 0) && !(b > 4 || b < 0)) {
        if (op == "doisVal") {
            if (aInvertido && !bInvertido) {
                resultado = estatistica.normalCumulativeValue(b)
            } else if (bInvertido && !aInvertido) {
                resultado = estatistica.normalCumulativeValue(b)
            } else {
                resultado = 1 - estatistica.normalCumulativeValue(b)
            }
        }
        else if (op == "doisValFora") {
            if (aInvertido && !bInvertido) {
                resultado = 1 - estatistica.normalCumulativeValue(b)
            } else if (bInvertido && !aInvertido) {
                resultado = 1 - estatistica.normalCumulativeValue(b)
            } else {
                resultado = estatistica.normalCumulativeValue(b)
            }
        }
        resultado = (resultado * 100).toFixed(2)
        resultadoP.innerHTML = `Resultado: ${resultado}%`
        mostrarResultado.classList.remove("invisivel")
        mostrarResultado.scrollIntoView()
        return
    } else if ((b > 4 || b < 0) && !(a > 4 || a < 0)) {
        if (op == "doisVal") {
            if (aInvertido && !bInvertido) {
                resultado = estatistica.normalCumulativeValue(a)
            } else if (bInvertido && !aInvertido) {
                resultado = estatistica.normalCumulativeValue(a)
            } else {
                resultado = 1 - estatistica.normalCumulativeValue(a)
            }
        }
        else if (op == "doisValFora") {
            if (aInvertido && !bInvertido) {
                resultado = 1 - estatistica.normalCumulativeValue(a)
            } else if (bInvertido && !aInvertido) {
                resultado = 1 - estatistica.normalCumulativeValue(a)
            } else {
                resultado = estatistica.normalCumulativeValue(a)
            }
        }
        resultado = (resultado * 100).toFixed(2)
        resultadoP.innerHTML = `Resultado: ${resultado}%`
        mostrarResultado.classList.remove("invisivel")
        mostrarResultado.scrollIntoView()
        return
    } else if ((a > 4 || a < 0) && (b > 4 || b < 0)) {
        if (aInvertido && !bInvertido) {
            resultado = 1
        } else if (bInvertido && !aInvertido) {
            resultado = 1
        } else {
            resultado = 0
        }
        resultado = (resultado * 100).toFixed(2)
        resultadoP.innerHTML = `Resultado: ${resultado}%`
        mostrarResultado.classList.remove("invisivel")
        mostrarResultado.scrollIntoView()
        return
    }

    if (op == 'doisVal') {
        if (a < b) {
            if (aInvertido && !bInvertido) {
                resultado = estatistica.normalCumulativeValue(b) - (1 - estatistica.normalCumulativeValue(a))
            } else if (bInvertido && !aInvertido) {
                resultado = estatistica.normalCumulativeValue(a) - (1 - estatistica.normalCumulativeValue(b))
            } else {
                resultado = estatistica.normalCumulativeValue(b) - estatistica.normalCumulativeValue(a)
            }
        } else if (a > b) {
            if (aInvertido && !bInvertido) {
                resultado = estatistica.normalCumulativeValue(a) - (1 - estatistica.normalCumulativeValue(b))
            } else if (bInvertido && !aInvertido) {
                resultado = estatistica.normalCumulativeValue(b) - (1 - estatistica.normalCumulativeValue(a))
            } else {
                resultado = estatistica.normalCumulativeValue(a) - estatistica.normalCumulativeValue(b)
            }
        } else {
            if (aInvertido || bInvertido) {
                resultado = estatistica.normalCumulativeValue(a) - (1 - estatistica.normalCumulativeValue(a))
            } else {
                resultado = 0
            }
        }

    } else if (op == "doisValFora") {
        if (a < b) {
            if (aInvertido && !bInvertido) {
                resultado = (1 - estatistica.normalCumulativeValue(b)) + (1 - estatistica.normalCumulativeValue(a))
            } else if (bInvertido && !aInvertido) {
                resultado = (1 - estatistica.normalCumulativeValue(a)) + (1 - estatistica.normalCumulativeValue(b))
            } else {
                resultado = (1 - estatistica.normalCumulativeValue(b)) + (estatistica.normalCumulativeValue(a))
            }
        } else if (a > b) {
            if (aInvertido && !bInvertido) {
                resultado = (1 - estatistica.normalCumulativeValue(a)) + (1 - estatistica.normalCumulativeValue(b))
            } else if (bInvertido && !aInvertido) {
                resultado = (1 - estatistica.normalCumulativeValue(b)) + (1 - estatistica.normalCumulativeValue(a))
            } else {
                resultado = (1 - estatistica.normalCumulativeValue(a)) + (estatistica.normalCumulativeValue(b))
            }
        } else {
            if (aInvertido || bInvertido) {
                resultado = (1 - estatistica.normalCumulativeValue(a)) * 2
            } else {
                resultado = 0
            }
        }

    }
    resultado = (resultado * 100).toFixed(2)
    resultadoP.innerHTML = `Resultado: ${resultado}%`
    mostrarResultado.classList.remove("invisivel")
    mostrarResultado.scrollIntoView()


}

function CalcularZ(media, dp, qtde, a, op, estatistica) {
    var zA = (a - media) / (dp / Math.sqrt(qtde))
    CalcularProbabilidadePadronizada(zA, op, estatistica)
}

function CalcularZDois(media, dp, qtde, a, b, op, estatistica) {
    var zA = (a - media) / (dp / Math.sqrt(qtde))
    var zB = (b - media) / (dp / Math.sqrt(qtde))
    CalcularProbabilidadePadronizadaDois(zA, zB, op, estatistica)
}