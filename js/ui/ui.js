import {convertCurrency} from '../features/convert/convert.js'
import * as nodes from './domlists.js'



export function renderCurrencySelectsOptions(rates) {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    fromSelect.value = 'USD'
    toSelect.value = 'EUR'
    if (!rates?.Valute) {
        console.error('Нет данных Valute в rates');
        return;
    }
    const rubOption = document.createElement('option');
    rubOption.value = 1;
    rubOption.textContent = `RUB Российский рубль (1 ₽)`;
    fromSelect.appendChild(rubOption);
    toSelect.appendChild(rubOption.cloneNode(true));
    for (const [code, currency] of Object.entries(rates.Valute)) {
        const option = document.createElement('option') 
        const realRate = currency.Value / currency.Nominal;
        option.textContent = `${currency.CharCode} ${currency.Name}`;
        option.value = realRate
        fromSelect.size = 1
        toSelect.size = 1
        fromSelect.add(option)
        toSelect.add(option.cloneNode(true));
    }}

export function swapSelectOptions() {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const tempValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempValue;
}

export function currentresult() { // Подтягивание value из dom элементов и  вызов функции с формулой подсчета 
    const amount = parseFloat(nodes.amount.value) || 0;
    const from   = parseFloat(nodes.from.value);
    const to     = parseFloat(nodes.to.value);
    let finalResult = 0;
    if (amount > 0 && from && to) {
        finalResult = convertCurrency(amount, from, to);
    }

    nodes.result.textContent = finalResult.toFixed(4);
}
