const currencyConvertReducer = (id=0, action)=>{
    switch(action.type){
        case "CHANGE_CURRENCY":
            return action.payload

        default:
            return id
    }
    
}           
export default currencyConvertReducer