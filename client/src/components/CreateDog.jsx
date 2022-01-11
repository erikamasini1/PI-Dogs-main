
import { useDispatch, useSelector } from 'react-redux';
import React, { Component, useEffect } from 'react';
import { createDog, getTemperaments } from '../actions';
import Select from 'react-select';



export function validate(input){
    let erros = {}
    
    // if(!input.name){
    //     errors.name = `Dog's name required`
    // } else if()
}

export default function CreateDog() {

    let [input, setInput] = React.useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperaments: ''
    })

    let handleChange = e => {
        const value = e.target.value.replace(/\+|-/ig, '');

        e.preventDefault();
        setInput(prev => ({ ...prev, [e.target.name]: value }))
    }

    let dispatch = useDispatch(1);



    const optionsFromBack = useSelector(state => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    const MyComponent = () => (
        <Select options={optionsFromBack} isMulti={'true'} name={'temperament'} />
    )

    //    const options = temperaments.map((temperament) => return {value: temperament.id, label: temperament.name})

    //  const MyComponent = () => (
    //      <Select options={options} />
    //    )



    let handleTemperament = e => {
        setInput(prev => ({ ...prev, temperaments: e.map(el => el.value) }))
        console.log(e.map(el => el.value))
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
            life_span: '',
            temperaments: ''
        })
    }

    let onlyNumbers = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
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
                    <input type={'text'} name={'minHeight'} onKeyPress={onlyNumbers} value={input.minHeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MAX HEIGHT</label>
                    <input type={'text'} name={'maxHeight'} onKeyPress={onlyNumbers} value={input.maxHeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MIN WEIGHT</label>
                    <input type={'text'} name={'minWeight'} onKeyPress={onlyNumbers} value={input.minWeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>MAX WEIGHT</label>
                    <input type={'text'} name={'maxWeight'} onKeyPress={onlyNumbers} value={input.maxWeight} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>LIFE SPAN</label>
                    <input type={'text'} name={'life_span'} onKeyPress={onlyNumbers} value={input.life_span}  onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>TEMPERAMENTS</label>

                    <Select options={optionsFromBack} isMulti={'true'} name={'temperaments'} onChange={e => handleTemperament(e)} />
                    {/* <MyComponent name={'temperaments'} value={input.temperaments} onChange={e => handleChange(e)}/>   */}
                </div>

                <br />
                <button type={'submit'} onSubmit={e => handleSubmit(e)}>SUMBIT DOG</button>
            </form>
        </div>
    )
}

