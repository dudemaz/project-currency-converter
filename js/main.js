import { LoadData } from './api/api.js'
import { renderCurrencySelectsOptions , currentresult, swapSelectOptions } from './ui/ui.js'
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
       nodes.button.addEventListener('click', (e) => {
        if(nodes.amount.value.trim() === ''){
            return alert('Введите сумму')
        }
        currentresult();
        historylist(nodes.from.selectedOptions[0].text,
                    nodes.to.selectedOptions[0].text, 
                    nodes.result.textContent)
                                    });
        //обработчик события
        nodes.swapButton.addEventListener('click', () => {
            const fromValue = nodes.from.value;
            const toValue = nodes.to.value;
            swapSelectOptions();
            fromChoices.setChoiceByValue(toValue);
            toChoices.setChoiceByValue(fromValue);
            if (nodes.amount.value.trim() !== '') {
                currentresult();
            }
        });
        //обработчик события
        nodes.buttonToOpenWindow.addEventListener('click',()=>{
            nodes.modalWindow.show()
        })
        //обработчик события
        nodes.buttonToCloweWindow.addEventListener('click',()=>{
            nodes.modalWindow.close()
        })
        //обработчик события
                    
    } catch (error) {
        console.error('нету данных')
        return null
    }
}
init()

