import { loadData } from './api.js'
import { convertCurrency } from './convert.js'
import { renderCurrencySelects } from './ui.js'
import { saveToLocalStorage,loadFromLocalStorage } from './storage.js'
let allRates = null;
async function init(){
    try {
        const cachedRates = loadFromLocalStorage();
        if (cachedRates) {
            allRates = cachedRates;
        } else {
            allRates = await loadData();
            saveToLocalStorage(allRates);
        }
        console.log(allRates)
        // renderCurrencySelects(allRates);
    } catch (error) {
        console.error('нету данных')
        return null
    }
}
init()