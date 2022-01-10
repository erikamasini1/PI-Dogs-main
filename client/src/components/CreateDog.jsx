
import { useDispatch, useSelector } from 'react-redux';
import React, { Component, useEffect } from 'react';
import { createDog, getTemperaments } from '../actions';
import Select from 'react-select';

export default function CreateDog() {

    let [input, setInput] = React.useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        temperaments: ''
    })

    let handleChange = e => {
        e.preventDefault();
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    let dispatch = useDispatch(1);

    

    const optionsFromBack = useSelector(state => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments())
      }, [])

    const MyComponent = () => (
        <Select options={optionsFromBack}  isMulti={'true'} name={'temperament'}/>
    )

//    const options = temperaments.map((temperament) => return {value: temperament.id, label: temperament.name})

    //  const MyComponent = () => (
    //      <Select options={options} />
    //    )

    

    let handleChangeTest = e => {
        setInput(prev => ({ ...prev, temperaments: e.map(el =>  el.value )}))
        console.log(e.map(el =>  el.value ))
        console.log(e)
        console.log(input)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createDog(input))
        console.log(e)
        setInput({
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            temperaments: ''
        })

    }


    return (
        <div>
            <div>CREATE DOG</div>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>NAME</label>
                    <input type={'text'} name={'name'} value={input.name} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MIN HEIGHT</label>
                    <input type={'text'} name={'minHeight'} value={input.minHeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MAX HEIGHT</label>
                    <input type={'text'} name={'maxHeight'} value={input.maxHeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MIN WEIGHT</label>
                    <input type={'text'} name={'minWeight'} value={input.minWeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MAX WEIGHT</label>
                    <input type={'text'} name={'maxWeight'} value={input.maxWeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>TEMPERAMENTS</label>
                   
                    <Select options={optionsFromBack}  isMulti={'true'} name={'temperaments'} onChange={e => handleChangeTest(e)} />
                    {/* <MyComponent name={'temperaments'} value={input.temperaments} onChange={e => handleChange(e)}/>   */}
                </div>
               
                <br />
                <button type={'submit'} onSubmit={e => handleSubmit(e)}>SUMBIT DOG</button>
            </form>
        </div>
    )
}

