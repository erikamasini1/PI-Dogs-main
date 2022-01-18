import React from 'react';
import {connect, useSelector} from 'react-redux';

import Dog from './Dog'


export default function Dogs(){

    const dogs = useSelector(state => state.dogs)


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

// function mapStateToProps(state){
//     return{
//         dogs: state.dogs
//     }
//}

//export default connect(mapStateToProps, null)(Dogs)