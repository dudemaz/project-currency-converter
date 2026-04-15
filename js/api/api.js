export async function LoadData(date = null) {
  try {
    let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    if (date) {
      const [year, month, day] = date.split('-');
      url = `https://www.cbr-xml-daily.ru/archive/${year}/${month}/${day}/daily_json.js`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      if (date) {
        console.warn(`Нет данных на ${date}, загружаем последние доступные`);
      }
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.Valute) {
      throw new Error('API вернул некорректные данные');
    }
    return data;
  } catch (error) {
    console.error('Не получилось загрузить данные:', error);
    return null;
  }
}
