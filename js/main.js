import { LoadData } from './api.js'
import { renderCurrencySelectsOptions , currentresult } from './ui.js'
import { saveToLocalStorage,loadFromLocalStorage } from './storage.js'
import * as nodes from './domlists.js'
let allRates = null;
async function init(){
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
        e.preventDefault();
        currentresult();
});
                    
    } catch (error) {
        console.error('нету данных')
        return null
    }
}
init()