const initialState = {
    items:[], 

}
const cartReducer = (state=initialState, action)=>{

    switch(action.type){
        case "ADD_TO_CART": 
            return {...state, items: [...state.items,action.payload]};

        case "REMOVE_FROM_CART":
            return {...state, items: [...state.items.filter(item => item.id !== action.payload)]};

        case "UPDATE_CART":
            return {...state, items: [...state.items.filter(item => item.id !== action.payload.id).splice(action.payload.index,0,action.payload.product), ...state.items]}
        
        case "CHECK_OUT":
            return { ...state , items:[]}

        default:
            return state;
    }

}
export default cartReducer;