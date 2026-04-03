
export function historylist(from,to,result){
    let historyCounter = 0
    historyCounter++
    let conteiner = document.createElement('div')
        conteiner.classList.add('conteiner-history')
    let fromHistory = document.createElement('p')
    let toHistory = document.createElement('p')
    let resultHistory = document.createElement('p')
    fromHistory.textContent = from
    toHistory.textContent = to
    resultHistory.textContent = result
    conteiner.appendChild(fromHistory)
    conteiner.appendChild(toHistory)
    conteiner.appendChild(resultHistory)    

}
