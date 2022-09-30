const getSum = (products,currencyState)=>{
    let sum = 0 
    let {items} = products
    items.forEach(item => {
        sum+= item.prices[currencyState].amount * item.count

    });

    return sum
}

export default getSum