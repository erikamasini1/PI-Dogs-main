import React from 'react';
import {connect, useDispatch} from 'react-redux';
import Dog from './Dog'

export function Dogs({dogs}){


    return(
        <div>
            {
            dogs && dogs.map(dog =><div>
                <Dog key={dog.id} id={dog.id} minHeight={dog.minHeight} maxHeight={dog.maxHeight} minWeight={dog.minWeight} name={dog.name} maxWeight={dog.maxWeight} temperaments={dog.temperaments}/>
               </div>
                )
            }
        </div>
    )
}

function mapStateToProps(state){
    return{
        dogs: state.dogs
    }
}

export default connect(mapStateToProps, null)(Dogs)