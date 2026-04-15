export function saveToLocalStorage(rates) {
  // функция для сохранения данных в localStorage
  try {
    // сохраняем данные от апишки в localStorage
    const data = {
      rates: rates,
      time: Date.now(),
    };
    localStorage.setItem('rates_all', JSON.stringify(data));
  } catch (error) {
    console.error('Не удалось сохранить в localStorage:', error);
  }
}

export function loadFromLocalStorage() {
  try {
    const raw_rate = localStorage.getItem('rates_all');
    if (!raw_rate) return null;
    const parsed = JSON.parse(raw_rate);
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.time > maxAge) {
      return null;
    }
    return parsed.rates;
  } catch (error) {
    console.error('Ошибка парсинга JSON:', error);
    return null;
  }
}

export function saveHistoryItem(from, to, result) {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.unshift({ from, to, result });
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  localStorage.setItem('history', JSON.stringify(history));
}
