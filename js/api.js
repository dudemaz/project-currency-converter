export async function loadData(){
    try{
        const url = 'https://open.er-api.com/v6/latest/EUR'; 
        const response = await fetch(url);
        if(!response.ok){throw new Error(`http Ошибка ${response.status}`)}
        const data = await response.json(); 
        if (data.result !== "success") {throw new Error('API вернул ошибку')}
        console.log('Курсы успешно загружены')
        return data.rates 
    }
    catch(error){
        console.error('Не получилось загрузить данные:', error);
    }
}