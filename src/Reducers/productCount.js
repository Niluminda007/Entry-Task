const productCountReducer = (count=0 , action)=>{
    switch(action.type){
        case "INCREASE_ITEM":
            return count + action.payload

        case "CLEAR_ITEM_COUNT":
            return 0
        default:
            return count
    }
}

export default productCountReducer;