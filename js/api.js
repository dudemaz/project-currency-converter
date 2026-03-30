
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
        return null
    }
}
export async function LoadDataFullOptions() {
    try {
        let API_KEY = 'YourApiKey:> my key hide:))'
        const url = `https://v6.exchangerate-api.com/v6/API_KEY/codes`;
        const response = await fetch(url)
        if(!response.ok){throw new Error(`http Ошибка ${response.status}`)}
        const data = await response.json()
        if(data.result !== 'success'){throw new Error('API вернул ошибку')}
        return data.supported_codes
        
    } catch (error) {
        console.error('Не получилось загрузить данные:', error);
        return null
    }
}

