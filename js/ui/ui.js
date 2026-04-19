import { convertCurrency } from '../features/convert/convert.js';
import * as nodes from './domlists.js';
import { LoadData } from '../api/api.js';
import { renderHistoryItem } from '../features/history/historyLogic.js';

let datepickerInstance = null;

export function initDatePicker() {
  datepickerInstance = new window.AirDatepicker(nodes.dateInput, {
    autoClose: true,
    dateFormat: 'yyyy-MM-dd',
    isMobile: true,
  });
}

export function renderCurrencySelectsOptions(rates) {
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  if (!rates?.Valute) {
    console.error('Нет данных Valute в rates');
    return;
  }

  const rubOption = document.createElement('option');

  rubOption.value = 1;
  rubOption.textContent = `RUB Российский рубль`;
  fromSelect.appendChild(rubOption);
  toSelect.appendChild(rubOption.cloneNode(true));
  for (const [code, currency] of Object.entries(rates.Valute)) {
    const option = document.createElement('option');
    const realRate = currency.Value / currency.Nominal;
    option.textContent = `${currency.CharCode} ${currency.Name}`;
    option.value = realRate;
    fromSelect.size = 1;
    toSelect.size = 1;
    fromSelect.add(option);
    toSelect.add(option.cloneNode(true));
  }
}

export function swapSelectOptions() {
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  const tempValue = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempValue;
  const btn = nodes.swapButton;
  btn.classList.remove('magictime', 'puffIn');
  void btn.offsetWidth;
  setTimeout(() => {
    btn.classList.add('magictime', 'puffIn');
  }, 10);
}

export function currentresult() {
  // Подтягивание value из dom элементов и  вызов функции с формулой подсчета
  const amount = parseFloat(nodes.amount.value) || 0;
  const from = parseFloat(nodes.from.value);
  const to = parseFloat(nodes.to.value);
  let finalResult = 0;
  if (amount > 0 && from && to) {
    finalResult = convertCurrency(amount, from, to);
  }

  nodes.result.textContent = finalResult.toFixed(4);
}
export function loadDataInSpan() {
   let date = nodes.dateInput.value;
   nodes.DataCurrencyactually.textContent = `Курс данных на ${date}`
}
export async function loadRates(onLoaded = null) {
  let date = nodes.dateInput.value;
  if (!date) {
    alert('Выбери дату в календаре!');
    return;
  }
  const data = await LoadData(date);
  if (data) {
    renderCurrencySelectsOptions(data);
    if (onLoaded) onLoaded();
    alert('Курсы загружены');
  } else {
    alert(
      'Не удалось загрузить курсы на эту дату. Попробуй другую или проверь интернет.'
    );
  }
}

export function loadHistoryUI() {
  nodes.historyblock.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('history')) || [];
  history.forEach((item) => {
    renderHistoryItem(item.from, item.to, item.result);
  });
}
