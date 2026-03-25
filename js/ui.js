export function renderCurrencySelects(rates) {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    fromSelect.value = 'USD'
    toSelect.value = 'EUR'
    for (const currency in rates) {

    }}