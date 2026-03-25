export function convertCurrency(amount,from,to,rates){
    const fromRate = rates[from]
    const toRate = rates[to]
    return (amount * fromRate) / toRate
}