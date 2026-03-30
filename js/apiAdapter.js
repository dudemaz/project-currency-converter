import { loadData,LoadDataFullOptions } from './api.js'

export async function FullKeyCurrency(){
    const rates  = await loadData()
    const fullData  = await LoadDataFullOptions()
    if (!rates || !fullData) return null;
    const result = {}
    for (const [code, name] of fullData) {
        if (rates[code]) {
            result[name] = rates[code] 
        }
    }
    return result
}
