import { CREATE_DOG, GET_DOGS, GET_TEMPERAMENTS } from "../actions/types"



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
        default: return {...state}
    }

}