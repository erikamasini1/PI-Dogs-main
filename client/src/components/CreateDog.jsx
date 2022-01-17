
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { createDog, getTemperaments } from '../actions';
import Select from 'react-select';
import './CreateDog.css';

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

    function validate(input) {
        let errors = { hasErrors: false }
        console.log("input", input)
    
        if (!input.name) {
            errors.name = `Dog's name required`;
            errors.hasErrors = true;
        }
    
        if (!input.minWeight) {
            errors.minWeight = `Dog's minimum weight required`
            errors.hasErrors = true;
        } else if (!/^[0-9]*$/.test(input.minWeight)) {
            errors.minWeight = 'Weight must be a number'
            errors.hasErrors = true;
        }
    
        if (!input.maxWeight) {
            errors.maxWeight = `Dog's maximum weight required`
            errors.hasErrors = true;
        } else if (!/^[0-9]*$/.test(input.minWeight)) {
            errors.maxWeight = 'Weight must be a number'
            errors.hasErrors = true;
        }
    
        if (!input.minHeight) {
            errors.minHeight = `Dog's minimum height required`
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
            errors.minHeight = `Dog's maximum height must be equal or greater than minimum height`
            errors.hasErrors = true;
        }
    
        return errors;
    
    }

    let [errors, setErrors] = React.useState({hasErrors: true});

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

            window.alert('Dog created successfully')
        } else {
            window.alert('Dog not created')
        }
    }

    let onlyNumbers = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <div className={'imageCreateDog'}>
            <div className={'createBox'}>
            <div className={'title'}>CREATE YOUR OWN DOG</div>
            <br />
            <form onSubmit={handleSubmit}>
                <div className='inputContainer'>
                    <label className='inputText'>NAME</label>
                    <input type={'text'} name={'name'} value={input.name} onChange={e => handleChange(e)} />
                    {errors.name && (<p className='errors'>{errors.name}</p>)}
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>MIN HEIGHT</label>
                    <input type={'text'} name={'minHeight'} onKeyPress={onlyNumbers} value={input.minHeight} onChange={e => handleChange(e)} />
                    {errors.minHeight && (<p className='errors'>{errors.minHeight}</p>)}
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>MAX HEIGHT</label>
                    <input type={'text'} name={'maxHeight'} onKeyPress={onlyNumbers} value={input.maxHeight} onChange={e => handleChange(e)} />
                    {errors.maxHeight && (<p className='errors'>{errors.maxHeight}</p>)}
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>MIN WEIGHT</label>
                    <input type={'text'} name={'minWeight'} onKeyPress={onlyNumbers} value={input.minWeight} onChange={e => handleChange(e)} />
                    {errors.minWeight && (<p className='errors'>{errors.minWeight}</p>)}
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>MAX WEIGHT</label>
                    <input type={'text'} name={'maxWeight'} onKeyPress={onlyNumbers} value={input.maxWeight} onChange={e => handleChange(e)} />
                    {errors.maxWeight && (<p className='errors'>{errors.maxWeight}</p>)}
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>LIFE SPAN</label>
                    <input type={'text'} name={'life_span'} onKeyPress={onlyNumbers} value={input.life_span} onChange={e => handleChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>IMAGE</label>
                    <input type={'text'} name={'image'} value={input.image} onChange={e => handleChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label className='inputText'>TEMPERAMENTS</label>

                    <Select className='temperamentsSelect' options={optionsFromBack} isMulti={'true'} value={input.temperaments} name={'temperaments'} onChange={e => handleTemperament(e)} />
                </div>

                <br />
                <button type={'submit'} disabled={errors.hasErrors} onSubmit={e => handleSubmit(e)}>SUMBIT DOG</button>
            </form>
            </div>
        </div>
    )
}

