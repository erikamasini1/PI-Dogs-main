import React from 'react';
import {connect, useDispatch} from 'react-redux';
import { deleteDog } from '../actions';
import Dog from './Dog'

export function Dogs({dogs}){

    // let dispatch = useDispatch()

    // let handleClick = (e, id) => {
    //     e.preventDefalult();
    //     dispatch(deleteDog(id))
        
    // }

    return(
        <div>
            {
            dogs && dogs.map(dog =><div> <div>
                <Dog key={dog.id} id={dog.id} minHeight={dog.minHeight} maxHeight={dog.maxHeight} minWeight={dog.minWeight} name={dog.name} maxWeight={dog.maxWeight} temperaments={dog.temperaments}/>
            </div>
               {/* <div> HOLA <button onClick={(e) => handleClick(e, dog.id)}>DELETE DOG</button> </div> */}
               </div>
                )
            }
            <div> HOLA </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        dogs: state.dogs
    }
}

export default connect(mapStateToProps, null)(Dogs)