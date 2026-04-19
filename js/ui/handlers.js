import * as nodes from './domlists.js';
import {
  currentresult,
  swapSelectOptions,
  loadRates,
  renderCurrencySelectsOptions,
  loadDataInSpan
} from './ui.js';
import { historylist } from '../features/history/historyLogic.js';
import { LoadData } from '../api/api.js';

let fromChoices = null;
let toChoices = null;

export function initSelectChoices() {
  if (fromChoices) fromChoices.destroy();
  if (toChoices) toChoices.destroy();

  fromChoices = new Choices('#from', {
    searchEnabled: true,
    itemSelectText: '',
  });
  toChoices = new Choices('#to', {
    searchEnabled: true,
    itemSelectText: '',
  });
}

function onConvertClick() {
  if (nodes.amount.value.trim() === '' || nodes.amount.value.trim() < 0) {
    return alert('Введите сумму');
  }

  currentresult();
  historylist(
    nodes.from.selectedOptions[0].text,
    nodes.to.selectedOptions[0].text,
    nodes.result.textContent
  );
}

function onSwapClick() {
  const fromValue = nodes.from.value;
  const toValue = nodes.to.value;

  swapSelectOptions();
  fromChoices.setChoiceByValue(toValue);
  toChoices.setChoiceByValue(fromValue);

  if (nodes.amount.value.trim() !== '') {
    currentresult();
  }
}

function onOpenHistoryClick() {
  nodes.modalWindow.show();
}

function onCloseHistoryClick() {
  nodes.modalWindow.close();
}

function onLoadHistoryDataClick() {
  loadRates(() => {
    initSelectChoices();
  });
}
async function returnActual() {
  let data = await LoadData();
  renderCurrencySelectsOptions(data);
  initSelectChoices();
  alert('Курсы обновлены');
}
export function textDataReturn(){
  let data = new Date()
  nodes.DataCurrencyactually.textContent = `Курс данных на ${data.toLocaleDateString('ru-RU')}`
}
export function bindUiHandlers() {
  nodes.returnActualDates.addEventListener('click', returnActual);
  nodes.returnActualDates.addEventListener('click', textDataReturn);
  nodes.button.addEventListener('click', onConvertClick);
  nodes.swapButton.addEventListener('click', onSwapClick);
  nodes.buttonToOpenWindow.addEventListener('click', onOpenHistoryClick);
  nodes.buttonToCloweWindow.addEventListener('click', onCloseHistoryClick);
  nodes.buttonLoadHistoryData.addEventListener('click', onLoadHistoryDataClick);
  nodes.buttonLoadHistoryData.addEventListener('click', loadDataInSpan);

}
