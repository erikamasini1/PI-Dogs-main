import { CREATE_DOG, GET_DOGS, GET_TEMPERAMENTS, GET_DOG, GET_DOG_BY_ID, CLEAN_DETAIL, LOADING } from "./types"
import axios from 'axios'

export function createDog(dog){

    let dogToBack = ({name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperaments}) => {
        return {
            name,
            min_height: parseInt(minHeight),
            max_height: parseInt(maxHeight),
            min_weight: parseInt(minWeight),
            max_weight: parseInt(maxWeight),
            life_span: parseInt(life_span),
            image,
            temperament: temperaments.map(el => el.value)
        } 
    }

    let dogFormated = dogToBack(dog)

    return async function(dispatch){
        dispatch({
            type: LOADING
        })
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
        dispatch({
            type: LOADING
        })
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
        dispatch({
            type: LOADING
        })
        var json = await axios('http://localhost:3001/dogs')
        var dogs = json.data
        return dispatch({
            type: GET_DOGS,
            payload: dogs
        })
    }
}

// export function getDogByName(name){
//     return async function(dispatch){
    // dispatch({
    //     type: LOADING
    // })
//         try{
//         var json = await axios(`http://localhost:3001/dogs?name=${name}`)
//         var dog = json.data
//         return dispatch({
//             type: GET_DOG,
//             payload: dog
//         })
//       } catch(e){
//         console.log(e)
//       }
//     } 
// }

export function getDogByName(name){
    return function(dispatch){
        dispatch({
            type: LOADING
        })
        return fetch(`http://localhost:3001/dogs?name=${name}`)
        .then (response => response.json())
        .then (post => dispatch({type: GET_DOG, payload: post}))
    }
}




// export function getDogById(id){
//     return async function(dispatch){
    // dispatch({
    //     type: LOADING
    // })
//         var json = await axios(`http://localhost:3001/dogs/${id}`)
//         var dog = json.data
//         return dispatch({
//             type: GET_DOG_BY_ID,
//             payload: dog
//         })
//     }
// }

export function getDogById(id){
    return function(dispatch){
        dispatch({
            type: LOADING
        })
        return axios(`http://localhost:3001/dogs/${id}`)
        .then(response => response.data)
        .then(post => dispatch({type: GET_DOG_BY_ID, payload: post}))      
    }
}

export function cleanDogDetail(){
    return function(dispatch){
        dispatch({
            type: LOADING
        })
    var detail = {}
    return dispatch({
        type: CLEAN_DETAIL,
        payload: detail
    })
  }
}
