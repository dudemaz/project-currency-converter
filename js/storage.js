export function saveToLocalStorage(rates){ // функция для сохранения данных в localStorage
    try{
        localStorage.setItem('rates_all',JSON.stringify(rates)) // сохраняем данные от апишки в localStorage
    }
    catch(error){
        console.error('Не удалось сохранить в localStorage:', error);
    }
}
export function loadFromLocalStorage(){
    try {
        const raw_rate = localStorage.getItem('rates_all');
        if (!raw_rate) return null; 
        return JSON.parse(raw_rate)
    } catch (error) {
        console.error('Ошибка парсинга JSON:', error);
        return null;
    }
}