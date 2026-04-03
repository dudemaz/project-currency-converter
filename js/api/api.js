export async function LoadData() {
    try {
    let url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    const response = await fetch(url)
    if(!response.ok){throw new Error(`HTTP ошибка! статус: ${response.status}`)}
    const data = await response.json()
    if (!data || !data.Valute) {
    throw new Error('API вернул некорректные данные');
        }
        console.log(data.Valute)
        return data
    } catch (error) {
        console.error('Не получилось загрузить данные:', error)
        return null
    }
}
LoadData()