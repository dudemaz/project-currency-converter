import * as nodes from '../../ui/domlists.js'
export function historylist(from,to,result){
    let historyCounter = 0
    historyCounter++
    let conteiner = document.createElement('div')
        conteiner.classList.add('conteiner-history')
    let fromHistory = document.createElement('p')
        fromHistory.textContent = `${from} → ${to} | ${result}`
    conteiner.appendChild(fromHistory)
    nodes.historyblock.appendChild(conteiner)
}//доделываю 
