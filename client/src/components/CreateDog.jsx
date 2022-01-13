
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { createDog, getTemperaments } from '../actions';
import Select from 'react-select';




export function validate(input) {
    let errors = { hasErrors: false }
    console.log("input", input)

    if (!input.name) {
        errors.name = `Dog's name required`;
        errors.hasErrors = true;
    }

    if (!input.minWeight) {
        errors.minWeight = `Dog's minimum weight is required`
        errors.hasErrors = true;
    } else if (!/^[0-9]*$/.test(input.minWeight)) {
        errors.minWeight = 'Weight must be a number'
        errors.hasErrors = true;
    }

    if (!input.maxWeight) {
        errors.maxWeight = `Dog's maximum weight is required`
        errors.hasErrors = true;
    } else if (!/^[0-9]*$/.test(input.minWeight)) {
        errors.maxWeight = 'Weight must be a number'
        errors.hasErrors = true;
    }

    if (!input.minHeight) {
        errors.minHeight = `Dog's minimum height is required`
        errors.hasErrors = true;
    } else if (!/^[0-9]*$/.test(input.minHeight)) {
        errors.minHeight = 'Height must be a number'
        errors.hasErrors = true;
    }

    if (!input.maxHeight) {
        errors.maxHeight = `Dog's maximum height is required`
        errors.hasErrors = true;
    } else if (!/^[0-9]*$/.test(input.maxHeight)) {
        errors.maxHeight = 'Height must be a number'
        errors.hasErrors = true;
    }

    if(parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.minWeight = `Dog's maximum weight must be equal or greater than minimum weight`
        errors.hasErrors = true;
    }

    if(parseInt(input.minHeight) > parseInt(input.maxHeight)){
        errors.minHeight = `Dog's maximum weight must be equal or greater than minimum weight`
        errors.hasErrors = true;
    }

    return errors;

}

export default function CreateDog() {

    let [input, setInput] = React.useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        image:'',
        temperaments: ''
    })

    let [errors, setErrors] = React.useState({});

    let handleChange = e => {
        // const value = e.target.value.replace(/\+|-/ig, '');

        e.preventDefault();
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    }

    let dispatch = useDispatch();



    const optionsFromBack = useSelector(state => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    let handleTemperament = e => {
        setInput(prev => ({ ...prev, temperaments: e }))
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if (!validate(input).hasErrors) {
            dispatch(createDog(input))
            console.log(e)
            setInput({
                name: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                life_span: '',
                image:'',
                temperaments: ''
            })
        }
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
                    {errors.name && (<p style={{ color: 'red' }}>{errors.name}</p>)}
                </div>
                <div>
                    <label>MIN HEIGHT</label>
                    <input type={'text'} name={'minHeight'} onKeyPress={onlyNumbers} value={input.minHeight} onChange={e => handleChange(e)} />
                    {errors.minHeight && (<p style={{ color: 'red' }}>{errors.minHeight}</p>)}
                </div>
                <div>
                    <label>MAX HEIGHT</label>
                    <input type={'text'} name={'maxHeight'} onKeyPress={onlyNumbers} value={input.maxHeight} onChange={e => handleChange(e)} />
                    {errors.maxHeight && (<p style={{ color: 'red' }}>{errors.maxHeight}</p>)}
                </div>
                <div>
                    <label>MIN WEIGHT</label>
                    <input type={'text'} name={'minWeight'} onKeyPress={onlyNumbers} value={input.minWeight} onChange={e => handleChange(e)} />
                    {errors.minWeight && (<p style={{ color: 'red' }}>{errors.minWeight}</p>)}
                </div>
                <div>
                    <label>MAX WEIGHT</label>
                    <input type={'text'} name={'maxWeight'} onKeyPress={onlyNumbers} value={input.maxWeight} onChange={e => handleChange(e)} />
                    {errors.maxWeight && (<p style={{ color: 'red' }}>{errors.maxWeight}</p>)}
                </div>
                <div>
                    <label>LIFE SPAN</label>
                    <input type={'text'} name={'life_span'} onKeyPress={onlyNumbers} value={input.life_span} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>IMAGE</label>
                    <input type={'text'} name={'image'} value={input.image} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>TEMPERAMENTS</label>

                    <Select options={optionsFromBack} isMulti={'true'} value={input.temperaments} name={'temperaments'} onChange={e => handleTemperament(e)} />
                </div>

                <br />
                <button type={'submit'} onSubmit={e => handleSubmit(e)}>SUMBIT DOG</button>
            </form>
        </div>
    )
}

