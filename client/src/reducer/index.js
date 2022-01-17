import { CREATE_DOG, GET_DOGS, GET_TEMPERAMENTS, GET_DOG, GET_DOG_BY_ID, CLEAN_DETAIL} from "../actions/types"



const initialState ={
    dogs: [],
    detail: {},
    temperaments: []
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case CREATE_DOG:
            return{
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
        case GET_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_DOG_BY_ID:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        default: return {...state}
    }

}