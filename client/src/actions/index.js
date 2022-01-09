import { CREATE_DOG, GET_DOGS, GET_TEMPERAMENTS } from "./types"
import axios from 'axios'

export function createDog(dog){
    
    let dogToBack = ({name, minHeight, maxHeight, minWeight, maxWeight, temperaments}) => {
        return {
            name,
            height: `${minHeight} - ${maxHeight}`,
            weight: `${minWeight} - ${maxWeight}`,
            temperament: temperaments
        } 
    }

    let dogFormated = dogToBack(dog)

    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/dog', dogFormated)
        var dog = json.data
         return dispatch( {
         type: CREATE_DOG,
         payload: dog
     })    
    }

}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/temperament')
        var temperaments = json.data.map(function(temperament){
            return {
                ...temperament,
                value: temperament.id, 
                label: temperament.name,
            }
        })

        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments
        })
    }

}

    


export function getDogs(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/dogs')
        var dogs = json.data
        return dispatch({
            type: GET_DOGS,
            payload: dogs
        })
    }
}


// return function(dispatch){
//     return axios('http://localhost:3001/dogs')
//         .then(response => response.data.json())
//         .then(info => dispatch({ type:GET_DOGS, payload: info}))

// }