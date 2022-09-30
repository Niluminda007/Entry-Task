
const initialState = {
   array: [],
}

const productReducer = (state=initialState,action)=>{
    switch(action.type){
        case "INIT_PRODUCTS" :
            return { 
                ...state,
                array: [...state.array, ...action.payload],
            };
        default:
            return state;
    }

}

export default productReducer;