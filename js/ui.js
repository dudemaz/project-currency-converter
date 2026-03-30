export function renderCurrencySelectsOptions(rates) {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    fromSelect.value = 'USD'
    toSelect.value = 'EUR'
    for (const [key, value] of Object.entries(rates)) {
        const option = document.createElement('option') 
        option.text = key
        option.value = value
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