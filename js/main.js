import { LoadData } from './api/api.js'
import { renderCurrencySelectsOptions , currentresult, swapSelectOptions } from './ui/ui.js'
import { saveToLocalStorage,loadFromLocalStorage } from './storage/storage.js'
import * as nodes from './ui/domlists.js'
import {historylist} from './features/history/historyLogic.js'
let allRates = null;
export async function init(){
    try {
        // скрытие приложение loadercreen только доступен
        nodes.loaderScreen.style.display = 'flex';
        nodes.mainApp.classList.add('hidden');

        const cachedRates = loadFromLocalStorage();
        if (cachedRates) {
            allRates = cachedRates;
        } else {
            allRates = await LoadData();
            saveToLocalStorage(allRates);
        }
        renderCurrencySelectsOptions(allRates);
        //инициальзацитя select
        const fromChoices = new Choices('#from', { 
            searchEnabled: true, 
            itemSelectText: '' 
        });
        const toChoices = new Choices('#to', { 
            searchEnabled: true, 
            itemSelectText: '' 
        });      

        //обработчики событий
       nodes.button.addEventListener('click', (e) => {
        if(nodes.amount.value.trim() === '' || nodes.amount.value.trim() < 0){
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
            const btn = nodes.swapButton;
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
        //cкрытие загрузочного экрана
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

