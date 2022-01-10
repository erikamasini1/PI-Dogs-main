import { CREATE_DOG, GET_DOGS, GET_TEMPERAMENTS, FILTERED_TEMPERAMENT, FILTERED_SOURCE } from "../actions/types"



const initialState ={
    dogs: [],
    allDogs: [],
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
                dogs: action.payload,
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
        // case FILTERED_TEMPERAMENT:
        //     const allDogs = state.dogs
        //     const filteredDogs = action.payload === 'all' ? allDogs : allDogs.filter(dog => dog.temperaments.includes(action.payload)) --> falta ponerlo por name
        //     return{
        //         ...state,
        //        // dogs : filteredDogs
        //     }
        // case FILTERED_SOURCE:
        //     const allDogs = state.allDogs

        //     const filteredDogs = action.payload === 'all' ? allDogs : allDogs.filter(dog => dog.source === action.payload)

        //     return{
        //         ...state,
        //         dogs: filteredDogs
        //     }
        default: return {...state}
    }

}