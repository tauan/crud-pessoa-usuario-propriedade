const dataAtual = new Date()
const dataFormatada = `${dataAtual.getFullYear()}-${dataAtual.getMonth()+1}-${dataAtual.getDate()} ${dataAtual.getHours()}:${dataAtual.getMinutes()}:${dataAtual.getSeconds()}`

module.exports = dataFormatada