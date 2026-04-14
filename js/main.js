import { LoadData } from './api/api.js'
import { renderCurrencySelectsOptions, loadHistoryUI, initDatePicker } from './ui/ui.js'
import { initSelectChoices, bindUiHandlers } from './ui/handlers.js'
import { saveToLocalStorage, loadFromLocalStorage } from './storage/storage.js'
import * as nodes from './ui/domlists.js'
import { initParticles } from './animation/background.js'

let allRates = null;

export async function init(){
    try {
        // скрытие приложение loadercreen только доступен
        nodes.loaderScreen.style.display = 'flex';
        nodes.mainApp.classList.add('hidden');
        initParticles()
        const cachedRates = loadFromLocalStorage();
        if (cachedRates) {
            allRates = cachedRates;
        } else {
            allRates = await LoadData();
            saveToLocalStorage(allRates);
        }
        renderCurrencySelectsOptions(allRates);
        initSelectChoices();
        initDatePicker();
        bindUiHandlers();
        loadHistoryUI()
    
        nodes.loaderScreen.style.display = 'none';
        nodes.mainApp.classList.remove('hidden');
        
        } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        nodes.loaderScreen.innerHTML = `
            <div style="text-align: center; color: #f87171;">
                <p>Не удалось загрузить курсы валют 😕</p>
                <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px;">
                    Попробовать снова
                </button>
            </div>
        `;
        return;
    } 
    finally {
        nodes.loaderScreen.style.display = 'none';
        nodes.mainApp.classList.remove('hidden');
    }
}
init()

