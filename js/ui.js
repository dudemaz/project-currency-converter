export function renderCurrencySelectsOptions(rates) {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    fromSelect.value = 'USD'
    toSelect.value = 'EUR'
    if (!rates?.Valute) {
        console.error('Нет данных Valute в rates');
        return;
    }
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