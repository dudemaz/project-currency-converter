import { LoadData } from './api.js'
import { convertCurrency } from './convert.js'
import { renderCurrencySelectsOptions } from './ui.js'
import { saveToLocalStorage,loadFromLocalStorage } from './storage.js'
let allRates = null;
async function init(){
    try {
        console.log('данные есть')
        const cachedRates = loadFromLocalStorage();
        if (cachedRates) {
            allRates = cachedRates;
        } else {
            allRates = await LoadData();
            saveToLocalStorage(allRates);
        }
        renderCurrencySelectsOptions(allRates);
    } catch (error) {
        console.error('нету данных')
        return null
    }
}
init()