import { LoadData } from './api/api.js'
import { renderCurrencySelectsOptions , currentresult } from './ui/ui.js'
import { saveToLocalStorage,loadFromLocalStorage } from './storage/storage.js'
import * as nodes from './ui/domlists.js'
import {historylist} from './features/history/historyLogic.js'
let allRates = null;
export async function init(){
    try {
        const cachedRates = loadFromLocalStorage();
        if (cachedRates) {
            allRates = cachedRates;
        } else {
            allRates = await LoadData();
            saveToLocalStorage(allRates);
        }
        renderCurrencySelectsOptions(allRates);
        const fromChoices = new Choices('#from', { searchEnabled: true, itemSelectText: '' });
        const toChoices = new Choices('#to', { searchEnabled: true, itemSelectText: '' });
        nodes.amount.addEventListener('change',()=>{
            currentresult()
        })
       nodes.button.addEventListener('click', (e) => {
        currentresult();
        historylist(nodes.from.selectedOptions[0].text,
                    nodes.to.selectedOptions[0].text, 
                    nodes.result.textContent)
                                    });
        nodes.buttonToOpenWindow.addEventListener('click',()=>{
            nodes.modalWindow.show()
        })
        nodes.buttonToCloweWindow.addEventListener('click',()=>{
            nodes.modalWindow.close()
        })
                    
    } catch (error) {
        console.error('нету данных')
        return null
    }
}
init()

