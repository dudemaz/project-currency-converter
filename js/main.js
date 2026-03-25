import { loadData } from './api.js'
let allRates = null;
async function init(){
    try {
        allRates = await loadData();
        console.log('данные есть')
        console.log(allRates)
    } catch (error) {
        console.error('нету данных')
    }
}
init()